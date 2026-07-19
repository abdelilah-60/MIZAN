import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { db } from "../lib/db";
import type { Farm, Field, ActiveTab } from "../lib/types";
import { getHeaders, handleAuthError } from "../lib/api";
import { useDebounce } from "./useDebounce";

interface UseFieldDataProps {
  token: string | null;
  userId?: string;
  logout: () => void;
  confirm: (message: string) => Promise<boolean>;
  toast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
}

export function useFieldData({ token, userId, logout, confirm, toast }: UseFieldDataProps) {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("fields");
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [newFarm, setNewFarm] = useState({ name: "" });
  const [newField, setNewField] = useState({
    name: "",
    farmId: "",
    cropType: "Picholine Marocaine",
    plantingDate: "",
    geoPolygon: null as unknown,
    area: 0,
    agronomicData: {} as Record<string, string>,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSyncingRef = useRef(false);

  const headers = useMemo(() => getHeaders(token), [token]);

  const authedFetch = useCallback(
    (url: string, init?: RequestInit) =>
      fetch(url, { ...init, headers: { ...headers, ...init?.headers } }),
    [headers]
  );

  const fetchLocalData = useCallback(async () => {
    let localFarms = await db.farms.orderBy("createdAt").reverse().toArray();
    let localFields = await db.fields.orderBy("createdAt").reverse().toArray();

    if (debouncedSearchQuery) {
      const q = debouncedSearchQuery.toLowerCase();
      localFarms = localFarms.filter((f) => f.name.toLowerCase().includes(q));
      localFields = localFields.filter((f) => f.name.toLowerCase().includes(q));
    }

    setFarms(localFarms.slice((currentPage - 1) * 10, currentPage * 10));
    setFields(localFields.slice((currentPage - 1) * 10, currentPage * 10));

    if (activeTab === "farms") setTotalPages(Math.ceil(localFarms.length / 10) || 1);
    if (activeTab === "fields") setTotalPages(Math.ceil(localFields.length / 10) || 1);
  }, [debouncedSearchQuery, currentPage, activeTab]);

  const fetchData = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    await fetchLocalData();

    try {
      // Background sync for offline-created pending data (prevent parallel race duplicate creations)
      if (!isSyncingRef.current) {
        isSyncingRef.current = true;
        try {
          const pendingFarms = await db.farms.where("syncStatus").equals("pending").toArray();
          for (const pf of pendingFarms) {
            const res = await fetch("/api/farms", {
              method: "POST",
              headers,
              body: JSON.stringify({ name: pf.name, userId }),
            }).catch(() => null);
            if (res && res.ok) {
              const savedF = await res.json();
              await db.farms.delete(pf.id);
              await db.farms.put({ ...savedF, syncStatus: "synced" as const });
              
              // Update any fields using the local farm UUID to use the server ID
              const associatedFields = await db.fields.where("farmId").equals(pf.id).toArray();
              for (const f of associatedFields) {
                await db.fields.update(f.id, { farmId: savedF.id });
              }
            }
          }

          const pendingFields = await db.fields.where("syncStatus").equals("pending").toArray();
          for (const pf of pendingFields) {
            const res = await fetch("/api/fields", {
              method: "POST",
              headers,
              body: JSON.stringify({
                name: pf.name,
                farmId: pf.farmId,
                cropType: pf.cropType,
                geoPolygon: pf.geoPolygon,
                area: pf.area,
                plantingDate: pf.plantingDate ? new Date(pf.plantingDate).toISOString() : null,
                agronomicData: pf.agronomicData,
              }),
            }).catch(() => null);
            if (res && res.ok) {
              const savedField = await res.json();
              await db.fields.delete(pf.id);
              await db.fields.put({ ...savedField, syncStatus: "synced" as const });
            }
          }
        } catch (e) {
          console.error("Background sync failed:", e);
        } finally {
          isSyncingRef.current = false;
        }
      }

      const query = `?page=${currentPage}&limit=10${debouncedSearchQuery ? `&search=${encodeURIComponent(debouncedSearchQuery)}` : ""}`;

      const [, farmsRes, fieldsRes] = await Promise.all([
        fetch("/api/health").catch(() => null),
        fetch(`/api/farms${query}`, { headers }).catch(() => null),
        fetch(`/api/fields${query}`, { headers }).catch(() => null),
      ]);

      if (farmsRes) {
        if (!farmsRes.ok) handleAuthError(farmsRes.status, logout);
        else {
          const farmsData = await farmsRes.json();
          const farmsDataArray = Array.isArray(farmsData) ? farmsData : farmsData.data || farmsData.value || [];
          if (farmsDataArray.length === 0 && userId) {
            try {
              const createRes = await fetch("/api/farms", {
                method: "POST",
                headers,
                body: JSON.stringify({ name: "Ferme Mizan (ضيعتي)", userId }),
              });
              if (createRes.ok) {
                const newF = await createRes.json();
                await db.farms.put({ ...newF, syncStatus: "synced" as const });
              }
            } catch (e) {
              console.error("Auto-create farm failed:", e);
            }
          } else {
            await db.farms.where("syncStatus").equals("synced").delete();
            const farmsToDexie = farmsDataArray.map((f: Farm & { syncStatus?: string }) => ({ ...f, syncStatus: "synced" as const }));
            await db.farms.bulkPut(farmsToDexie);
          }
          if (activeTab === "farms" && farmsData.meta) {
            setTotalPages(farmsData.meta.totalPages || 1);
          }
        }
      }

      if (fieldsRes) {
        if (!fieldsRes.ok) handleAuthError(fieldsRes.status, logout);
        else {
          const fieldsData = await fieldsRes.json();
          const fieldsDataArray = Array.isArray(fieldsData) ? fieldsData : fieldsData.data || fieldsData.value || [];
          
          // Clear synced fields to prevent ghost fields from re-appearing
          await db.fields.where("syncStatus").equals("synced").delete();
          
          const fieldsToDexie = fieldsDataArray.map((f: Field & { syncStatus?: string }) => ({ ...f, syncStatus: "synced" as const }));
          await db.fields.bulkPut(fieldsToDexie);
          if (activeTab === "fields" && fieldsData.meta) {
            setTotalPages(fieldsData.meta.totalPages || 1);
          }
        }
      }

      await fetchLocalData();
    } catch {
      // operating offline
    } finally {
      setLoading(false);
    }
  }, [token, userId, currentPage, debouncedSearchQuery, activeTab, fetchLocalData, headers, logout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-poll server for updates every 15 seconds to sync data in real-time
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      fetchData();
    }, 15000);
    return () => clearInterval(interval);
  }, [token, fetchData]);

  // Reset pagination on tab/search change
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
    setSelectedFieldId(null);
  }, [activeTab]);

  const handleCreateFarm = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarm.name) return;
    setIsSubmitting(true);

    const localId = crypto.randomUUID();
    const localFarm = {
      id: localId,
      name: newFarm.name,
      userId: "",
      createdAt: new Date().toISOString(),
      syncStatus: "pending" as const,
      user: { fullName: "" },
    };

    await db.farms.put(localFarm);
    setNewFarm({ name: "" });
    await fetchLocalData();

    try {
      const res = await authedFetch("/api/farms", {
        method: "POST",
        body: JSON.stringify({ name: localFarm.name, userId: localFarm.userId }),
      });
      if (res.ok) {
        const savedFarm = await res.json();
        await db.farms.delete(localId);
        await db.farms.put({ ...savedFarm, syncStatus: "synced" as const });
        await fetchData();
      } else {
        handleAuthError(res.status, logout);
      }
    } catch {
      // remains pending in Dexie
    } finally {
      setIsSubmitting(false);
    }
  }, [newFarm, authedFetch, fetchLocalData, fetchData, logout]);

  const handleCreateField = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newField.name || !newField.farmId || !newField.geoPolygon) return;
    setIsSubmitting(true);

    const localId = crypto.randomUUID();
    const localField = {
      id: localId,
      name: newField.name,
      farmId: newField.farmId,
      cropType: newField.cropType,
      geoPolygon: newField.geoPolygon,
      area: newField.area,
      plantingDate: newField.plantingDate,
      agronomicData: newField.agronomicData,
      createdAt: new Date().toISOString(),
      syncStatus: "pending" as const,
      farm: { name: farms.find((f) => f.id === newField.farmId)?.name || "Local Farm" },
    };

    await db.fields.put(localField);
    setNewField({
      name: "",
      farmId: "",
      cropType: "Picholine Marocaine",
      geoPolygon: null,
      area: 0,
      plantingDate: "",
      agronomicData: {},
    });
    await fetchLocalData();

    try {
      const res = await authedFetch("/api/fields", {
        method: "POST",
        body: JSON.stringify({
          name: localField.name,
          farmId: localField.farmId,
          cropType: localField.cropType,
          geoPolygon: localField.geoPolygon,
          area: localField.area,
          plantingDate: localField.plantingDate
            ? new Date(localField.plantingDate).toISOString()
            : null,
          agronomicData: localField.agronomicData,
        }),
      });
      if (res.ok) {
        const savedField = await res.json();
        await db.fields.delete(localId);
        await db.fields.put({ ...savedField, syncStatus: "synced" as const });
        await fetchData();
      } else {
        const errJson = await res.json().catch(() => ({ error: "Unknown error" }));
        toast(`Failed to save field: ${errJson.error || "Bad Request"}`, "error");
        handleAuthError(res.status, logout);
      }
    } catch {
      // remains pending in Dexie
    } finally {
      setIsSubmitting(false);
    }
  }, [newField, farms, authedFetch, fetchLocalData, fetchData, logout]);

  const handleDeleteField = useCallback(async (id: string) => {
    const confirmed = await confirm("Are you sure you want to delete this field? All associated operations will be removed.");
    if (!confirmed) return;

    // Check if the field is pending local sync
    const localField = await db.fields.get(id);
    if (localField && localField.syncStatus === "pending") {
      setFields((prev) => prev.filter((f) => f.id !== id));
      await db.fields.delete(id);
      toast("Field deleted successfully", "success");
      if (selectedFieldId === id) {
        setSelectedFieldId(null);
      }
      return;
    }

    try {
      const res = await authedFetch(`/api/fields/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFields((prev) => prev.filter((f) => f.id !== id));
        await db.fields.delete(id);
        toast("Field deleted successfully", "success");
        if (selectedFieldId === id) {
          setSelectedFieldId(null);
        }
      } else {
        handleAuthError(res.status, logout);
        toast("Failed to delete field: Server returned error", "error");
      }
    } catch {
      toast("Failed to delete field", "error");
    }
  }, [authedFetch, logout, confirm, toast, selectedFieldId]);

  const handleMapDraw = useCallback((geoJson: unknown, areaHa: number) => {
    setNewField((prev) => ({ ...prev, geoPolygon: geoJson, area: areaHa }));
  }, []);

  return {
    farms,
    fields,
    setFields,
    loading,
    activeTab,
    setActiveTab,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    newFarm,
    setNewFarm,
    newField,
    setNewField,
    isSubmitting,
    selectedFieldId,
    setSelectedFieldId,
    handleCreateFarm,
    handleCreateField,
    handleDeleteField,
    handleMapDraw,
    refetchData: fetchData,
  };
}
