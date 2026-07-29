import { useState, useEffect } from "react";
import type { Field } from "../lib/types";

interface ReportViewerProps {
  field: Field;
  onClose: () => void;
  token?: string;
}

export function ReportViewer({ field, onClose, token }: ReportViewerProps) {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authToken = token || localStorage.getItem("token");
    fetch(`/api/reports/${field.id}/seasonal`, {
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.report) {
          setReport(data.report);
        }
      })
      .catch(() => setReport(null))
      .finally(() => setLoading(false));
  }, [field.id, token]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 text-slate-200 relative my-8 print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Top Action Bar (hidden when printing) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <div>
              <h3 className="text-lg font-bold text-white">
                التقرير الفلاحي الرسمي للموسم
              </h3>
              <p className="text-xs text-slate-400">
                Rapport Agronomique Officiel • {field.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl transition-all shadow-lg flex items-center gap-1.5 active:scale-95"
            >
              <span>🖨️</span>
              <span>طباعة / حفظ PDF</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-xl transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 animate-pulse font-bold">
            جاري استخراج بيانات التقرير الموسمي الفلاحي...
          </div>
        ) : report ? (
          <div className="space-y-6 print:space-y-4">
            {/* Header Document Brand */}
            <div className="flex items-center justify-between border-b-2 border-emerald-500/40 pb-4">
              <div>
                <h1 className="text-2xl font-black text-emerald-400 tracking-tight flex items-center gap-2">
                  <span>🌾 MIZAN AGTECH PLATFORM</span>
                </h1>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  منصة ميزان للاستشعار عن بعد وإدارة المزارع والذكاء الاصطناعي
                </p>
              </div>

              <div className="text-left font-mono text-[10px] text-slate-400">
                <div>تاريخ التقرير: {new Date(report.generatedAt).toLocaleDateString("fr-FR")}</div>
                <div>المعرف: #{report.field.id.slice(-8).toUpperCase()}</div>
              </div>
            </div>

            {/* Field Specification Grid */}
            <div className="bg-slate-955 border border-white/10 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block font-bold text-[10px]">اسم الضيعة/المستغلة</span>
                <span className="font-bold text-white text-sm">{report.field.farmName}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-bold text-[10px]">اسم القطعة/الحقل</span>
                <span className="font-bold text-emerald-400 text-sm">{report.field.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-bold text-[10px]">نوع المحصول / الصنف</span>
                <span className="font-bold text-amber-400 text-sm">{report.field.cropType}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-bold text-[10px]">المساحة الإجمالية</span>
                <span className="font-bold text-white text-sm">{report.field.areaHa} Hectares</span>
              </div>
            </div>

            {/* Phenology & GDD Status Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white border-r-4 border-emerald-500 pr-2 flex items-center justify-between">
                <span>1. الحالة الفينولوجية والساعات الحرارية (GDD Status)</span>
                <span className="text-xs text-emerald-400 font-mono">
                  {report.phenology.accumulatedGdd} GDD
                </span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[10px]">المرحلة الفينولوجية الحالية</span>
                  <div className="font-black text-amber-400 text-sm">
                    {report.phenology.currentStage}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[10px]">الساعات الحرارية التراكمية</span>
                  <div className="font-black text-emerald-400 text-sm">
                    {report.phenology.accumulatedGdd} °C/يوم
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-slate-400 text-[10px]">كسر السكون الشتوي (BioFix)</span>
                  <div className="font-black text-sky-400 text-sm">
                    {report.phenology.bioFixReached ? "متحقق ✓" : "قيد التراكم ⏳"}
                  </div>
                </div>
              </div>
            </div>

            {/* Satellite Analysis Summary Section */}
            {report.satelliteSummary && (
              <div className="space-y-3">
                <h4 className="text-sm font-black text-white border-r-4 border-teal-500 pr-2 flex items-center justify-between">
                  <span>2. ملخص قياسات الأقمار الصناعية (Sentinel-2A Spectral Index)</span>
                  <span className="text-xs text-sky-400 font-mono">
                    {new Date(report.satelliteSummary.lastPassDate).toLocaleDateString("fr-FR")}
                  </span>
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[10px] block">كثافة العرش (% Cover)</span>
                    <span className="font-black text-emerald-400 text-base">
                      {report.satelliteSummary.canopyCoverPct}%
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[10px] block">مؤشر الصحة (SAVI)</span>
                    <span className="font-black text-teal-400 text-base">
                      {report.satelliteSummary.meanSavi}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[10px] block">الغطاء النباتي (NDVI)</span>
                    <span className="font-black text-cyan-400 text-base">
                      {report.satelliteSummary.meanNdvi}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[10px] block">الإجهاد المائي (NDWI)</span>
                    <span className="font-black text-blue-400 text-base">
                      {report.satelliteSummary.meanNdwi}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Operations Summary */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white border-r-4 border-purple-500 pr-2">
                3. سجل التدخلات الميدانية والعمليات المسجلة ({report.operationsSummary.totalLogged})
              </h4>

              {report.operationsSummary.recent.length > 0 ? (
                <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-right">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-white/10">
                      <tr>
                        <th className="p-2.5">التاريخ</th>
                        <th className="p-2.5">نوع العملية</th>
                        <th className="p-2.5">التفاصيل والتفاصيل الفنية</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {report.operationsSummary.recent.map((op: any) => (
                        <tr key={op.id} className="hover:bg-white/5">
                          <td className="p-2.5 font-mono text-slate-300">
                            {new Date(op.date).toLocaleDateString("fr-FR")}
                          </td>
                          <td className="p-2.5 font-bold text-emerald-400">
                            {op.type}
                          </td>
                          <td className="p-2.5 text-slate-300">
                            {op.metadata?.volume
                              ? `${op.metadata.volume} L`
                              : op.metadata?.quantity
                              ? `${op.metadata.quantity} ${op.metadata.unit || "kg"}`
                              : "عملية منفذة"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-slate-950/60 p-4 rounded-xl text-center text-xs text-slate-500">
                  لا توجد عمليات زراعية حديثة مسجلة في هذا الموسم.
                </div>
              )}
            </div>

            {/* Official Signature Footer */}
            <div className="pt-6 border-t border-white/10 flex justify-between items-end text-[10px] text-slate-500 print:text-black">
              <div>
                <div>توقيع وتأكيد المهندس الزراعي المسؤول:</div>
                <div className="h-12 border-b border-dashed border-slate-700 w-48 mt-2" />
              </div>
              <div className="text-left font-mono">
                <div>Mizan AgTech Engine v5.0</div>
                <div>Document généré automatiquement</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-rose-400 font-bold">
            تعذر استخراج بيانات التقرير الموسمي.
          </div>
        )}
      </div>
    </div>
  );
}
