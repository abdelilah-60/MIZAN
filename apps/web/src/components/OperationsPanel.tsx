import React from "react";
import type { OperationData } from "../lib/types";
import { formatDateFr } from "../lib/utils";

interface OperationsPanelProps {
  data: OperationData[];
  onDelete: (fieldId: string, opId: string) => void;
  fieldId: string;
}

export const OperationsPanel = React.memo(function OperationsPanel({
  data,
  onDelete,
  fieldId,
}: OperationsPanelProps) {
  return (
    <div className="max-w-3xl mx-auto">
          <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
            <span>📋</span> Recent Operations
          </h4>
          {data.length === 0 ? (
            <div className="p-4 bg-slate-800/50 rounded-xl text-center text-slate-500 text-sm">
              No operations logged yet.
            </div>
          ) : (
            <div className="space-y-3">
              {data.slice(0, 3).map((op) => {
                const meta = (op.metadata || {}) as any;
                return (
                  <div
                    key={op.id}
                    className="bg-slate-800/40 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-700/50 flex items-center justify-center text-lg">
                        {op.type === "IRRIGATION"
                          ? "💧"
                          : op.type === "FERTILIZER"
                          ? "🧪"
                          : op.type === "ORGANIC_AMENDMENT"
                          ? "🍂"
                          : op.type === "PESTICIDE"
                          ? "🛡️"
                          : op.type === "FUNGICIDE"
                          ? "🔬"
                          : op.type === "PRUNING"
                          ? "✂️"
                          : op.type === "TILLAGE"
                          ? "🚜"
                          : op.type === "WEEDING"
                          ? "🌿"
                          : "🫒"}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200">{op.type}</p>
                        <p className="text-xs text-slate-400">{formatDateFr(op.date)}</p>
                      </div>
                    </div>
                    <div className="flex-1 ml-0 sm:ml-4 flex items-center justify-between gap-4">
                      <div className="text-sm text-slate-300 bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5 flex-1">
                        {op.type === "IRRIGATION" ? (
                          <>
                            💧 Irrigation:{" "}
                            <span className="text-emerald-400 font-mono">
                              {meta.volume} {meta.unit || "L"}
                            </span>
                          </>
                        ) : op.type === "FERTILIZER" ? (
                          <>
                            🧪 Engrais ({meta.fertilizerType || "NPK"}):{" "}
                            <span className="text-emerald-400 font-mono">{meta.quantity} kg</span>
                            {meta.net_n_per_tree_g && (
                              <span className="text-slate-400 text-xs ml-1 font-mono">
                                (Net N/Arbre: {meta.net_n_per_tree_g}g)
                              </span>
                            )}
                          </>
                        ) : op.type === "ORGANIC_AMENDMENT" ? (
                          <>
                            🍂 تسميد عضوي ({meta.fertilizerType}):{" "}
                            <span className="text-amber-400">{meta.state === "DECOMPOSED" ? "متحلل متخمر" : "طازج خام"}</span> —{" "}
                            <span className="text-emerald-400 font-mono">{meta.quantity} {meta.unit}</span>
                          </>
                        ) : (op.type === "PESTICIDE" || op.type === "FUNGICIDE") ? (
                          <>
                            {op.type === "PESTICIDE" ? "🛡️" : "🔬"} معالجة وقائية ({meta.activeIngredient}):{" "}
                            <span className="text-amber-400">{meta.targetPest}</span> —{" "}
                            <span className="text-emerald-400 font-mono">{meta.quantity} {meta.unit}</span>
                          </>
                        ) : op.type === "PRUNING" ? (
                          <>
                            ✂️ تقليم الأشجار ({meta.technique}):{" "}
                            <span className="text-purple-400">{meta.intensityLevel}</span>
                          </>
                        ) : op.type === "TILLAGE" ? (
                          <>
                            🚜 حرث وتهوية التربة:{" "}
                            <span className="text-blue-400">{meta.technique}</span> —{" "}
                            <span className="text-slate-400">{meta.depth}</span>
                          </>
                        ) : op.type === "WEEDING" ? (
                          <>
                            🌿 إزالة الأعشاب ({meta.method === "CHEMICAL" ? "كيميائي" : "ميكانيكي"}):{" "}
                            {meta.method === "CHEMICAL" ? (
                              <>
                                <span className="text-amber-400">{meta.activeIngredient}</span> —{" "}
                                <span className="text-emerald-400 font-mono">{meta.quantity} {meta.unit}</span>
                              </>
                            ) : (
                              <span className="text-slate-400">قطع بالآلة (Girobroyeur)</span>
                            )}
                          </>
                        ) : op.type === "HARVEST" ? (
                          <>
                            🫒 جني المحصول ({meta.method}):{" "}
                            <span className="text-emerald-400 font-mono">{meta.quantity} كجم</span>{" "}
                            <span className="text-slate-400 text-xs font-mono ml-1">
                              ({meta.yield_per_tree_kg || 0} كجم/شجرة - {((meta.yield_per_hectare_kg || 0)/1000).toFixed(2)} طن/هكتار)
                            </span>
                          </>
                        ) : (
                          meta.note || "لا توجد تفاصيل إضافية"
                        )}
                      </div>
                      <button
                        onClick={() => onDelete(fieldId, op.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Log"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
              {data.length > 3 && (
                <p className="text-xs text-center text-slate-500 mt-2">
                  + {data.length - 3} older operations
                </p>
              )}
            </div>
          )}
        </div>
  );
}
);
