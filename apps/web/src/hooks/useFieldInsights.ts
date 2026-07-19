import { useState, useCallback } from "react";
import type { Field, InsightData } from "../lib/types";
import { getHeaders } from "../lib/api";

interface UseFieldInsightsProps {
  token: string | null;
}

export function useFieldInsights({ token }: UseFieldInsightsProps) {
  const [insightsData, setInsightsData] = useState<Record<string, InsightData>>({});
  const [loadingInsights, setLoadingInsights] = useState<Record<string, boolean>>({});

  const fetchInsights = useCallback(
    async (field: Field) => {
      if (insightsData[field.id]) {
        const copy = { ...insightsData };
        delete copy[field.id];
        setInsightsData(copy);
        return;
      }

      setLoadingInsights((prev) => ({ ...prev, [field.id]: true }));
      try {
        const res = await fetch(`/api/insights/${field.id}`, {
          headers: getHeaders(token),
        });

        if (res.ok) {
          const data = (await res.json()) as InsightData;
          setInsightsData((prev) => ({ ...prev, [field.id]: data }));
        }
      } catch {
        // silent
      } finally {
        setLoadingInsights((prev) => ({ ...prev, [field.id]: false }));
      }
    },
    [token, insightsData]
  );

  return { insightsData, loadingInsights, fetchInsights };
}
