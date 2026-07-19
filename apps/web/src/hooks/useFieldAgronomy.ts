import { useState, useCallback, useMemo } from "react";
import type { Field, AgronomyData, AgronomyForm } from "../lib/types";
import { getHeaders } from "../lib/api";

interface UseFieldAgronomyProps {
  token: string | null;
  toast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
}

const defaultAgronomyForm: AgronomyForm = {
  dripperFlowRate: "",
  drippersPerTree: "",
  treeDensity: "",
  efficiency: "0.85",
  ph: "",
  organicMatter: "",
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  analysisDate: "",
  targetYield: "5.0",
  bearingStatus: "NORMAL",
};

export function useFieldAgronomy({ token, toast }: UseFieldAgronomyProps) {
  const [agronomyData, setAgronomyData] = useState<Record<string, AgronomyData>>({});
  const [loadingAgronomy, setLoadingAgronomy] = useState<Record<string, boolean>>({});
  const [agronomyForm, setAgronomyForm] = useState<AgronomyForm>(defaultAgronomyForm);
  const [showOptionalSoilInput, setShowOptionalSoilInput] = useState(false);

  const headers = useMemo(() => getHeaders(token), [token]);

  const fetchAgronomy = useCallback(
    async (field: Field) => {
      if (agronomyData[field.id]) {
        const copy = { ...agronomyData };
        delete copy[field.id];
        setAgronomyData(copy);
        return;
      }

      setLoadingAgronomy((prev) => ({ ...prev, [field.id]: true }));
      try {
        const [configRes, recRes] = await Promise.all([
          fetch(`/api/agronomy/${field.id}/config`, { headers }),
          fetch(`/api/agronomy/${field.id}/recommendations`, { headers }),
        ]);

        if (configRes.ok && recRes.ok) {
          const config = (await configRes.json()) as AgronomyData;
          const rec = await recRes.json();
          setAgronomyData((prev) => ({
            ...prev,
            [field.id]: { ...config, recommendations: rec },
          }));

          setAgronomyForm({
            dripperFlowRate: config.irrigationConfig?.dripperFlowRate?.toString() || "",
            drippersPerTree: config.irrigationConfig?.drippersPerTree?.toString() || "",
            treeDensity: config.irrigationConfig?.treeDensity?.toString() || "",
            efficiency: config.irrigationConfig?.efficiency?.toString() || "0.85",
            ph: config.soilAnalysis?.[0]?.ph?.toString() || "",
            organicMatter: config.soilAnalysis?.[0]?.organicMatter?.toString() || "",
            nitrogen: config.soilAnalysis?.[0]?.nitrogen?.toString() || "",
            phosphorus: config.soilAnalysis?.[0]?.phosphorus?.toString() || "",
            potassium: config.soilAnalysis?.[0]?.potassium?.toString() || "",
            analysisDate: config.soilAnalysis?.[0]?.analysisDate
              ? new Date(config.soilAnalysis[0].analysisDate).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],
            targetYield: config.yieldConfig?.targetYield?.toString() || "5.0",
            bearingStatus: config.yieldConfig?.bearingStatus || "NORMAL",
          });
        }
      } catch {
        // silent
      } finally {
        setLoadingAgronomy((prev) => ({ ...prev, [field.id]: false }));
      }
    },
    [token, agronomyData]
  );

  const saveAgronomySection = useCallback(
    async (fieldId: string, sectionType: "irrigation" | "soil" | "yield") => {
      let url = `/api/agronomy/${fieldId}/${sectionType}`;
      let body: Record<string, unknown> = {};

      if (sectionType === "irrigation") {
        body = {
          dripperFlowRate: agronomyForm.dripperFlowRate,
          drippersPerTree: agronomyForm.drippersPerTree,
          treeDensity: agronomyForm.treeDensity,
          efficiency: agronomyForm.efficiency,
        };
      } else if (sectionType === "soil") {
        body = {
          analysisDate: agronomyForm.analysisDate || new Date().toISOString().split("T")[0],
          ph: agronomyForm.ph || null,
          organicMatter: agronomyForm.organicMatter || null,
          nitrogen: agronomyForm.nitrogen || null,
          phosphorus: agronomyForm.phosphorus || null,
          potassium: agronomyForm.potassium || null,
        };
      } else if (sectionType === "yield") {
        body = {
          targetYield: agronomyForm.targetYield,
          bearingStatus: agronomyForm.bearingStatus,
        };
      }

      try {
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
        if (res.ok) {
          const [configRes, recRes] = await Promise.all([
            fetch(`/api/agronomy/${fieldId}/config`, { headers }),
            fetch(`/api/agronomy/${fieldId}/recommendations`, { headers }),
          ]);
          if (configRes.ok && recRes.ok) {
            const config = (await configRes.json()) as AgronomyData;
            const rec = await recRes.json();
            setAgronomyData((prev) => ({
              ...prev,
              [fieldId]: { ...config, recommendations: rec },
            }));
            toast("Agronomie sauvegardée avec succès !", "success");
          }
        } else {
          toast("Erreur lors de la sauvegarde.", "error");
        }
      } catch {
        toast("Erreur de communication avec le serveur.", "error");
      }
    },
    [agronomyForm, headers, toast]
  );

  return {
    agronomyData,
    loadingAgronomy,
    agronomyForm,
    setAgronomyForm,
    showOptionalSoilInput,
    setShowOptionalSoilInput,
    fetchAgronomy,
    saveAgronomySection,
  };
}
