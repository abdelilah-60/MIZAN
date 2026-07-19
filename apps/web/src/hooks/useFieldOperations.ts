import { useState, useCallback, useEffect, useMemo } from "react";
import type { Field, OperationData, DynamicField } from "../lib/types";
import { getHeaders, handleAuthError } from "../lib/api";

interface UseFieldOperationsProps {
  token: string | null;
  logout: () => void;
  confirm: (message: string) => Promise<boolean>;
  toast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
}

export function useFieldOperations({ token, logout, confirm, toast }: UseFieldOperationsProps) {
  const [operationsData, setOperationsData] = useState<Record<string, OperationData[]>>({});
  const [loadingOperations, setLoadingOperations] = useState<Record<string, boolean>>({});
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedFieldForLog, setSelectedFieldForLog] = useState<Field | null>(null);
  const [logForm, setLogForm] = useState({ type: "IRRIGATION", date: "" });
  const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);
  const [isFetchingFields, setIsFetchingFields] = useState(false);
  const [metadataPayload, setMetadataPayload] = useState<Record<string, string>>({});
  const [isLogging, setIsLogging] = useState(false);

  const headers = useMemo(() => getHeaders(token), [token]);

  const fetchOperations = useCallback(
    async (field: Field) => {
      if (operationsData[field.id]) {
        const copy = { ...operationsData };
        delete copy[field.id];
        setOperationsData(copy);
        return;
      }

      setLoadingOperations((prev) => ({ ...prev, [field.id]: true }));
      try {
        const res = await fetch(`/api/operations/${field.id}`, { headers });
        if (res.ok) {
          const json = await res.json();
          setOperationsData((prev) => ({ ...prev, [field.id]: json.data || [] }));
        }
      } catch {
        // silent
      } finally {
        setLoadingOperations((prev) => ({ ...prev, [field.id]: false }));
      }
    },
    [token, operationsData]
  );

  // Fetch ontology requirements when modal opens
  useEffect(() => {
    if (!selectedFieldForLog || !logForm.type) return;

    let isMounted = true;
    const fetchRequirements = async () => {
      setIsFetchingFields(true);
      try {
        const crop = selectedFieldForLog.cropType || "Olive";
        const res = await fetch(
          `/api/ontology/operation-requirements?crop_name=${encodeURIComponent(crop)}&operation_type=${encodeURIComponent(logForm.type)}`,
          { headers }
        );
        if (res.ok) {
          const data = (await res.json()) as DynamicField[];
          if (isMounted) {
            setDynamicFields(data);
            const initialPayload: Record<string, string> = {};
            if (logForm.type === "FERTILIZER") {
              initialPayload.fertilizerType = "NPK";
              initialPayload.quantity = "";
              initialPayload.n_percent = "";
              initialPayload.p_percent = "";
              initialPayload.k_percent = "";
            } else if (logForm.type === "PRUNING") {
              initialPayload.technique = "FRUCTIFICATION";
              initialPayload.intensityLevel = "MODERATE";
            } else if (logForm.type === "PESTICIDE") {
              initialPayload.activeIngredient = "DELTAMETHRINE";
              initialPayload.targetPest = "FLY";
              initialPayload.quantity = "";
              initialPayload.unit = "L";
              initialPayload.darDays = "14";
            } else if (logForm.type === "FUNGICIDE") {
              initialPayload.activeIngredient = "CUIVRE";
              initialPayload.targetPest = "PEACOCK";
              initialPayload.quantity = "";
              initialPayload.unit = "Kg";
              initialPayload.darDays = "21";
            } else if (logForm.type === "HARVEST") {
              initialPayload.method = "MANUAL";
              initialPayload.quantity = "";
              initialPayload.destination = "OIL";
              initialPayload.maturityIndex = "TURNING";
            } else if (logForm.type === "TILLAGE") {
              initialPayload.technique = "CHISEL";
              initialPayload.depth = "DEEP";
            } else if (logForm.type === "ORGANIC_AMENDMENT") {
              initialPayload.fertilizerType = "BOVINE";
              initialPayload.state = "DECOMPOSED";
              initialPayload.quantity = "";
              initialPayload.unit = "Kg/arbre";
            } else if (logForm.type === "WEEDING") {
              initialPayload.method = "MECHANICAL";
              initialPayload.activeIngredient = "GLYPHOSATE";
              initialPayload.quantity = "";
              initialPayload.unit = "L";
            } else {
              data.forEach((f) => {
                const key = f.name.charAt(0).toLowerCase() + f.name.slice(1);
                initialPayload[key] = "";
              });
            }
            setMetadataPayload(initialPayload);
          }
        } else {
          if (isMounted) setDynamicFields([]);
        }
      } catch {
        if (isMounted) setDynamicFields([]);
      } finally {
        if (isMounted) setIsFetchingFields(false);
      }
    };

    fetchRequirements();
    return () => {
      isMounted = false;
    };
  }, [selectedFieldForLog, logForm.type, headers]);

  const handleLogOperation = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedFieldForLog) return;

      setIsLogging(true);
      try {
        let payloadObj: Record<string, unknown> = {};

        if (logForm.type === "FERTILIZER") {
          const typeVal = metadataPayload.fertilizerType || "NPK";
          const qty = Number(metadataPayload.quantity || 0);
          payloadObj = {
            fertilizerType: typeVal,
            quantity: qty,
            unit: "kg",
          };

          if (typeVal === "NPK") {
            const nPct = Number(metadataPayload.n_percent || 0);
            const pPct = Number(metadataPayload.p_percent || 0);
            const kPct = Number(metadataPayload.k_percent || 0);
            payloadObj.n_percent = nPct;
            payloadObj.p_percent = pPct;
            payloadObj.k_percent = kPct;

            const agro = typeof selectedFieldForLog.agronomicData === "string"
              ? JSON.parse(selectedFieldForLog.agronomicData as string)
              : (selectedFieldForLog.agronomicData || {}) as Record<string, any>;
            const density = parseInt(agro.treeDensity || agro["treeDensity"] || agro["Densité de Plantation"] || "200", 10);
            const area = selectedFieldForLog.area || 1.0;
            const totalTrees = Math.round(density * area) || 200;

            payloadObj.net_n_per_tree_g = Number(((qty * (nPct / 100)) / totalTrees * 1000).toFixed(1));
            payloadObj.net_p_per_tree_g = Number(((qty * (pPct / 100)) / totalTrees * 1000).toFixed(1));
            payloadObj.net_k_per_tree_g = Number(((qty * (kPct / 100)) / totalTrees * 1000).toFixed(1));
          }
        } else if (logForm.type === "PESTICIDE" || logForm.type === "FUNGICIDE") {
          const qty = Number(metadataPayload.quantity || 0);
          const unit = metadataPayload.unit || (logForm.type === "PESTICIDE" ? "L" : "Kg");
          const activeIng = metadataPayload.activeIngredient || (logForm.type === "PESTICIDE" ? "DELTAMETHRINE" : "CUIVRE");
          const target = metadataPayload.targetPest || (logForm.type === "PESTICIDE" ? "FLY" : "PEACOCK");
          const dar = Number(metadataPayload.darDays || (logForm.type === "PESTICIDE" ? 14 : 21));

          const baseDate = logForm.date ? new Date(logForm.date) : new Date();
          const blockUntilDate = new Date(baseDate.getTime() + dar * 24 * 60 * 60 * 1000);

          payloadObj = {
            productName: activeIng,
            activeIngredient: activeIng,
            targetPest: target,
            quantity: qty,
            unit: unit,
            darDays: dar,
            harvestBlockedUntil: blockUntilDate.toISOString()
          };
        } else if (logForm.type === "HARVEST") {
          const qty = Number(metadataPayload.quantity || 0);
          const methodVal = metadataPayload.method || "MANUAL";
          const destVal = metadataPayload.destination || "OIL";
          const matIndex = metadataPayload.maturityIndex || "TURNING";

          const agro = typeof selectedFieldForLog.agronomicData === "string"
            ? JSON.parse(selectedFieldForLog.agronomicData as string)
            : (selectedFieldForLog.agronomicData || {}) as Record<string, any>;
          const density = parseInt(agro.treeDensity || agro["treeDensity"] || agro["Densité de Plantation"] || "200", 10);
          const area = selectedFieldForLog.area || 1.0;
          const totalTrees = Math.round(density * area) || 200;

          const yieldPerTree = totalTrees > 0 ? qty / totalTrees : 0;
          const yieldPerHectare = area > 0 ? qty / area : 0;

          payloadObj = {
            quantity: qty,
            unit: "Kg",
            method: methodVal,
            destination: destVal,
            maturityIndex: matIndex,
            yield_per_tree_kg: Number(yieldPerTree.toFixed(2)),
            yield_per_hectare_kg: Number(yieldPerHectare.toFixed(1))
          };
        } else if (logForm.type === "TILLAGE") {
          payloadObj = {
            technique: metadataPayload.technique || "CHISEL",
            depth: metadataPayload.depth || "DEEP"
          };
        } else if (logForm.type === "ORGANIC_AMENDMENT") {
          payloadObj = {
            fertilizerType: metadataPayload.fertilizerType || "BOVINE",
            state: metadataPayload.state || "DECOMPOSED",
            quantity: Number(metadataPayload.quantity || 0),
            unit: metadataPayload.unit || "Kg/arbre"
          };
        } else if (logForm.type === "WEEDING") {
          const methodVal = metadataPayload.method || "MECHANICAL";
          payloadObj = {
            method: methodVal
          };
          if (methodVal === "CHEMICAL") {
            payloadObj.activeIngredient = metadataPayload.activeIngredient || "GLYPHOSATE";
            payloadObj.quantity = Number(metadataPayload.quantity || 0);
            payloadObj.unit = metadataPayload.unit || "L";
          }
        } else {
          dynamicFields.forEach((f) => {
            const key = f.name.charAt(0).toLowerCase() + f.name.slice(1);
            const val = metadataPayload[key];
            payloadObj[key] = f.inputType === "number" ? Number(val) : val;
            if (f.unit) {
              payloadObj["unit"] = f.unit;
            }
          });

          if (dynamicFields.length === 0) {
            payloadObj = { note: "Operation logged without specific dynamic parameters" };
          }
        }

        const payload = {
          type: logForm.type,
          fieldId: selectedFieldForLog.id,
          metadata: payloadObj,
          ...(logForm.date ? { date: new Date(logForm.date).toISOString() } : {}),
        };

        const res = await fetch("/api/operations", {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setIsLogModalOpen(false);
          setLogForm({ type: "IRRIGATION", date: "" });
          setMetadataPayload({});
          if (operationsData[selectedFieldForLog.id]) {
            const opsRes = await fetch(`/api/operations/${selectedFieldForLog.id}`, { headers });
            if (opsRes.ok) {
              const json = await opsRes.json();
              setOperationsData((prev) => ({
                ...prev,
                [selectedFieldForLog.id]: json.data || [],
              }));
            }
          }
        } else {
          const errorData = await res.json();
          toast(`Failed to log operation: ${errorData.error || "Bad Request"}`, "error");
        }
      } catch {
        toast("Network error occurred.", "error");
      } finally {
        setIsLogging(false);
      }
    },
    [selectedFieldForLog, logForm, dynamicFields, metadataPayload, operationsData, headers, toast]
  );

  const handleDeleteOperation = useCallback(
    async (fieldId: string, opId: string) => {
      const confirmed = await confirm("Delete this log entry?");
      if (!confirmed) return;
      try {
        const res = await fetch(`/api/operations/${opId}`, {
          method: "DELETE",
          headers,
        });
        if (res.ok) {
          setOperationsData((prev) => ({
            ...prev,
            [fieldId]: (prev[fieldId] || []).filter((op) => op.id !== opId),
          }));
        } else {
          handleAuthError(res.status, logout);
        }
      } catch {
        // silent
      }
    },
    [headers, logout, confirm]
  );

  const logOperationDirectly = useCallback(
    async (payload: { type: string; fieldId: string; metadata: Record<string, any> }) => {
      const res = await fetch("/api/operations", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const opsRes = await fetch(`/api/operations/${payload.fieldId}`, { headers });
        if (opsRes.ok) {
          const json = await opsRes.json();
          setOperationsData((prev) => ({
            ...prev,
            [payload.fieldId]: json.data || [],
          }));
        }
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Bad Request");
      }
    },
    [headers]
  );

  return {
    operationsData,
    loadingOperations,
    isLogModalOpen,
    setIsLogModalOpen,
    selectedFieldForLog,
    setSelectedFieldForLog,
    logForm,
    setLogForm,
    dynamicFields,
    isFetchingFields,
    metadataPayload,
    setMetadataPayload,
    isLogging,
    fetchOperations,
    handleLogOperation,
    handleDeleteOperation,
    logOperationDirectly,
    setOperationsData,
  };
}
