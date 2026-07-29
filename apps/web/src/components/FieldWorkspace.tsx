import { useState, useEffect, useMemo } from "react";
import type {
  Field,
  WeatherData,
  InsightData,
  OperationData,
  AgronomyData,
  AgronomyForm,
} from "../lib/types";
import { WeatherPanel } from "./WeatherPanel";
import { InsightsPanel } from "./InsightsPanel";
import { OperationsPanel } from "./OperationsPanel";
import { AgronomyPanel } from "./AgronomyPanel";
import { formatDate, cleanParenthesesName } from "../lib/utils";
import { SatelliteMapCanvas } from "./SatelliteMapCanvas";
import { SpectralLayerSwitcher } from "./SpectralLayerSwitcher";
import { DigitalTwinKPIs } from "./DigitalTwinKPIs";
import { SmartRecommendationCard } from "./SmartRecommendationCard";
import { SpectralIndexGuide } from "./SpectralIndexGuide";
import { ReportViewer } from "./ReportViewer";

interface FieldWorkspaceProps {
  field: Field;
  farms: any[];
  weatherData?: WeatherData;
  insightsData?: InsightData;
  operationsData?: OperationData[];
  agronomyData?: AgronomyData;
  agronomyForm: AgronomyForm;
  onAgronomyFormChange: (form: AgronomyForm) => void;
  loadingWeather: boolean;
  loadingInsights: boolean;
  loadingOperations: boolean;
  loadingAgronomy: boolean;
  onFetchWeather: (field: Field) => void;
  onFetchInsights: (field: Field) => void;
  onFetchOperations: (field: Field) => void;
  onFetchAgronomy: (field: Field) => void;
  onLogOperation: (field: Field, defaultType?: string, prefillMetadata?: Record<string, any>) => void;
  onDeleteOperation: (fieldId: string, opId: string) => void;
  onSaveAgronomy: (fieldId: string, section: "irrigation" | "soil" | "yield") => void;
  onLogOperationDirectly?: (payload: { type: string; fieldId: string; metadata: Record<string, any> }) => Promise<void>;
  onClose: () => void;
}

type WorkspaceTab = "agronomy" | "insights" | "operations";

export function FieldWorkspace({
  field,
  farms,
  weatherData,
  insightsData,
  operationsData,
  agronomyData,
  agronomyForm,
  onAgronomyFormChange,
  loadingWeather,
  loadingInsights,
  loadingOperations,
  loadingAgronomy,
  onFetchWeather,
  onFetchInsights,
  onFetchOperations,
  onFetchAgronomy,
  onLogOperation,
  onDeleteOperation,
  onSaveAgronomy,
  onLogOperationDirectly,
  onClose,
}: FieldWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("agronomy");
  const [satelliteMode, setSatelliteMode] = useState<"SATELLITE" | "CANOPY" | "SAVI" | "NDVI" | "NDWI">("CANOPY");
  const [satelliteData, setSatelliteData] = useState<any>(null);
  const [loadingSatellite, setLoadingSatellite] = useState<boolean>(false);

  // Auto-fetch satellite spectral data for field
  useEffect(() => {
    if (field?.geoPolygon) {
      setLoadingSatellite(true);
      const token = localStorage.getItem("token");
      fetch("/api/satellite/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          geoPolygon: field.geoPolygon,
          cropType: field.cropType,
          areaHa: field.area
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" || data.ndvi) {
            setSatelliteData(data);
          }
        })
        .catch((err) => console.error("Satellite fetch error:", err))
        .finally(() => setLoadingSatellite(false));
    }
  }, [field]);

  const farm = farms.find((f) => f.id === field.farmId);
  const summary = field.seasonSummary?.[0];

  // Stage label
  const stageLabels: Record<string, string> = {
    DORMANCE: "❄️ السكون",
    DEBOURREMENT: "🌱 خروج البراعم",
    FLORAISON: "🌸 الإزهار",
    NOUAISON: "👶 عقد الثمار",
    CROISSANCE: "📈 نمو الثمرة",
    VERAISON: "🎨 تلوين الثمرة",
    RECOLTE: "🫒 الجني",
  };

  const [isDismissed, setIsDismissed] = useState(false);
  const [isAutoLogging, setIsAutoLogging] = useState(false);
  const [showIndexGuide, setShowIndexGuide] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const recommendedMinutes = agronomyData?.recommendations?.water?.durationMinutes || 0;
  const recommendedLiters = agronomyData?.recommendations?.water?.litersPerTree || 0;

  const smartRec = useMemo(() => {
    if (!summary?.currentStage) return null;
    const stage = summary.currentStage;
    const npk = agronomyData?.recommendations?.npk;
    const cropName = field.cropType || "Picholine Marocaine";

    switch (stage) {
      case "DORMANCE":
        return {
          title: "❄️ Dormance (السكون الشتوي)",
          desc: `يُنصح ببدء التسميد العضوي (Amendement Organique) لتغذية التربة وتحسين بنية الحقل وإمداد أشجار (${cropName}) بالمادة العضوية المجهزة قبل خروج العين.`,
          type: "ORGANIC_AMENDMENT",
          icon: "🍂",
          btnText: "Appliquer l'amendement (تطبيق التسميد العضوي)",
          prefill: {
            fertilizerType: "BOVINE",
            state: "DECOMPOSED",
            quantity: "20",
            unit: "Kg/arbre"
          }
        };
      case "DEBOURREMENT":
        return {
          title: "🌱 Débourrement (خروج البراعم)",
          desc: `هذه هي بداية النمو الخضري النشط للصنف (${cropName}). يُنصح بإضافة الدفعة الربيعية الأولى: ${npk?.n || 31} كجم/هكتار من الآزوت لدعم النموات الجديدة وتجهيز الأغصان الفتية.`,
          type: "FERTILIZER",
          icon: "🧪",
          btnText: "Appliquer l'Azote (تطبيق الآزوت)",
          prefill: {
            fertilizerType: "NPK",
            quantity: String(npk?.n || 31),
            unit: "kg",
            n_percent: "46",
            p_percent: "0",
            k_percent: "0"
          }
        };
      case "FLORAISON":
        return {
          title: "🌸 Floraison (الإزهار)",
          desc: `لتجنب تساقط الأزهار والحفاظ على الحمل للصنف (${cropName})، يجب خفض الري الزائد والامتناع عن التسميد النيتروجيني المفرط. التوصية الحالية هي رش الفوسفات والبورون الورقي لدعم التلقيح.`,
          type: "FERTILIZER",
          icon: "🌸",
          btnText: "Appliquer le Phosphate (تطبيق الفوسفات)",
          prefill: {
            fertilizerType: "NPK",
            quantity: String(npk?.p || 10),
            unit: "kg",
            n_percent: "0",
            p_percent: "30",
            k_percent: "0"
          }
        };
      case "NOUAISON":
        return {
          title: "👶 Nouaison (عقد الثمار)",
          desc: `الثمار الفتية للصنف (${cropName}) تبدأ في النمو وتتطلب الآزوت المتوازن. يوصى بإضافة الجرعة الصافية الثانية: ${Math.round((npk?.n || 30) * 0.35)} كجم/هكتار لدعم العقد وتخفيف تساقط الثمار الفتية.`,
          type: "FERTILIZER",
          icon: "👶",
          btnText: "Appliquer la dose de nouaison (تطبيق دفعة العقد)",
          prefill: {
            fertilizerType: "NPK",
            quantity: String(Math.round((npk?.n || 30) * 0.35)),
            unit: "kg",
            n_percent: "21",
            p_percent: "0",
            k_percent: "0"
          }
        };
      case "CROISSANCE":
        return {
          title: "📈 Croissance & Durcissement (نمو وتصلب النواة)",
          desc: `هذه هي أهم فترة لتراكم الزيت وامتلاء الثمار في الزيتون (${cropName}). يُنصح بإضافة الدفعة الربيعية/الصيفية الأساسية للبوتاسيوم: ${npk?.k || 40} كجم/هكتار لدعم حجم وجودة الحبة.`,
          type: "FERTILIZER",
          icon: "📈",
          btnText: "Appliquer le Potassium (تطبيق البوتاسيوم)",
          prefill: {
            fertilizerType: "NPK",
            quantity: String(npk?.k || 40),
            unit: "kg",
            n_percent: "0",
            p_percent: "0",
            k_percent: "50"
          }
        };
      case "VERAISON":
        return {
          title: "🎨 Véraison (تلوين الثمرة والنضج)",
          desc: `ثمار الصنف (${cropName}) تبدأ بتغيير اللون. يُنصح بمراقبة ذبابة الزيتون لحماية المحصول، والتوقف التام عن التسميد الكيميائي تمهيداً للجني.`,
          type: "PESTICIDE",
          icon: "🛡️",
          btnText: "Traitement de protection (تسجيل حماية الثمار)",
          prefill: {
            activeIngredient: "DELTAMETHRINE",
            targetPest: "FLY",
            quantity: "1.5",
            unit: "L",
            darDays: "14"
          }
        };
      case "RECOLTE":
        return {
          title: "🫒 Récolte (الجني والحصاد)",
          desc: `حان موعد قطف حبات الصنف (${cropName}) للوجهة الموصى بها. يوصى بالجني اليدوي أو الهزازات اللطيفة لتجنب كسر وجرح الأغصان المنتجة للعام القادم.`,
          type: "HARVEST",
          icon: "🫒",
          btnText: "Enregistrer la récolte (تسجيل الجني)",
          prefill: {
            method: "MANUAL",
            quantity: "2500",
            destination: "OIL",
            maturityIndex: "TURNING"
          }
        };
      default:
        return null;
    }
  }, [summary?.currentStage, agronomyData, field.cropType, field.id]);

  // Check if there is any irrigation logged today
  const hasIrrigationToday = useMemo(() => {
    return operationsData?.some(
      (op) =>
        op.type === "IRRIGATION" &&
        new Date(op.date).toDateString() === new Date().toDateString()
    );
  }, [operationsData]);

  const showComplianceBanner =
    recommendedMinutes > 0 && !hasIrrigationToday && !isDismissed && !loadingAgronomy && !!onLogOperationDirectly;

  const handleAutoLog = async () => {
    if (!onLogOperationDirectly) return;
    setIsAutoLogging(true);
    try {
      await onLogOperationDirectly({
        type: "IRRIGATION",
        fieldId: field.id,
        metadata: {
          volume: recommendedLiters,
          duration: recommendedMinutes,
          unit: "Liters"
        }
      });
      // Operations reload will automatically trigger hasIrrigationToday to become true
    } catch (e) {
      console.error("Auto-logging failed:", e);
    } finally {
      setIsAutoLogging(false);
    }
  };

  // Auto-fetch data for the active tab when tab changes or field changes
  useEffect(() => {
    if (activeTab === "agronomy" && !agronomyData && !loadingAgronomy) {
      onFetchAgronomy(field);
    } else if (activeTab === "insights" && !insightsData && !loadingInsights) {
      onFetchInsights(field);
    } else if (activeTab === "operations") {
      if (!operationsData && !loadingOperations) {
        onFetchOperations(field);
      }
      if (!weatherData && !loadingWeather) {
        onFetchWeather(field);
      }
    }
  }, [
    activeTab,
    field,
    onFetchAgronomy,
    onFetchInsights,
    onFetchOperations,
    onFetchWeather,
    agronomyData,
    insightsData,
    operationsData,
    weatherData,
    loadingAgronomy,
    loadingInsights,
    loadingOperations,
    loadingWeather,
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Header Card with Ultra-Premium Glassmorphism & Digital Twin UX */}
      <div className="rounded-[32px] overflow-hidden border border-emerald-500/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-slate-950 relative">

        {/* Live Full-Bleed Satellite Map Canvas */}
        <div className="relative w-full h-[260px] md:h-[340px]">
          <SatelliteMapCanvas
            geoPolygon={field.geoPolygon}
            satelliteMode={satelliteMode}
            satelliteData={satelliteData}
          />

          {/* Bottom Vignette Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none z-10" />

          <SpectralLayerSwitcher
            satelliteMode={satelliteMode}
            setSatelliteMode={setSatelliteMode}
            satelliteData={satelliteData}
            loadingSatellite={loadingSatellite}
            onClose={onClose}
            onShowGuide={() => setShowIndexGuide(true)}
          />

          {/* Floating Stage Stats Badge on Map Canvas */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-20">
            {summary && (
              <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-amber-500/30 text-[11px] font-bold text-amber-400 shadow-xl flex items-center gap-1.5">
                <span>{stageLabels[summary.currentStage]?.split(" ")[0] || "🌱"}</span>
                <span>{stageLabels[summary.currentStage] || summary.currentStage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Digital Twin KPI Grid & Profile Info Area */}
        <div className="relative p-6 bg-slate-950 space-y-5">
          
          {/* Main Title Header with Crop Avatar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 to-teal-900/40 backdrop-blur-md flex items-center justify-center text-3xl shadow-xl flex-shrink-0">
                🫒
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-3 flex-wrap">
                  <span>{field.name}</span>
                  <span className="text-[10px] font-black px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-lg uppercase tracking-widest shadow-inner">
                    {field.cropType || "Picholine Marocaine"}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-2 flex-wrap">
                  <span>🏡 {cleanParenthesesName(farm?.name, true) || "ضيعة ميزان"}</span>
                  <span>&bull;</span>
                  <span>📐 {field.area} ha</span>
                  {field.plantingDate && (
                    <>
                      <span>&bull;</span>
                      <span>🌱 غرس: {formatDate(field.plantingDate, "fr-FR", { month: "short", year: "numeric" })}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowReport(true)}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg active:scale-95"
              >
                <span>📄</span>
                <span>Rapport PDF (التقرير الموسمية)</span>
              </button>
              <button
                onClick={() => setShowIndexGuide(true)}
                className="bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg active:scale-95"
              >
                <span>📖</span>
                <span>دليل المؤشرات</span>
              </button>
            </div>
          </div>

          <DigitalTwinKPIs
            satelliteData={satelliteData}
            summary={summary}
            stageLabels={stageLabels}
          />

          {/* Tab Switcher */}
          <div className="flex gap-1.5 mt-4 pt-3 border-t border-white/5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("agronomy")}
              className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                activeTab === "agronomy"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-md"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/5"
              }`}
            >
              <span>💧</span>
              <span>Recommandations (التوصيات)</span>
            </button>

            <button
              onClick={() => setActiveTab("insights")}
              className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                activeTab === "insights"
                  ? "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-md"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/5"
              }`}
            >
              <span>🧠</span>
              <span>Santé & Risques (الأمراض)</span>
            </button>

            <button
              onClick={() => setActiveTab("operations")}
              className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                activeTab === "operations"
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-md"
                  : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent hover:bg-white/5"
              }`}
            >
              <span>📋</span>
              <span>Activité & Logs (السجل)</span>
            </button>
          </div>
        </div>
      </div>

      <SmartRecommendationCard
        smartRec={smartRec}
        showComplianceBanner={showComplianceBanner}
        recommendedMinutes={recommendedMinutes}
        recommendedLiters={recommendedLiters}
        isAutoLogging={isAutoLogging}
        handleAutoLog={handleAutoLog}
        onLogOperation={onLogOperation}
        onSetIsDismissed={setIsDismissed}
        field={field}
      />

      {/* Tab Panels */}
      <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-sm min-h-[300px] shadow-xl">
        {activeTab === "agronomy" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {loadingAgronomy ? (
              <div className="text-center py-16 text-slate-500 animate-pulse">
                Chargement des recommandations agronomiques...
              </div>
            ) : agronomyData ? (
              <AgronomyPanel
                data={agronomyData}
                form={agronomyForm}
                onFormChange={onAgronomyFormChange}
                onSave={onSaveAgronomy}
                fieldId={field.id}
                operationsData={operationsData}
                field={field}
              />
            ) : (
              <div className="text-center py-16 text-slate-500">
                Impossible de charger les données agronomiques.
              </div>
            )}
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {loadingInsights ? (
              <div className="text-center py-16 text-slate-500 animate-pulse">
                Chargement de l'analyse AI et prévisions maladies...
              </div>
            ) : insightsData ? (
              <InsightsPanel data={insightsData} cropType={field.cropType} />
            ) : (
              <div className="text-center py-16 text-slate-500">
                L'analyse des risques n'a pas encore été générée. Veuillez vérifier la santé du حقل.
              </div>
            )}
          </div>
        )}

        {activeTab === "operations" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weather Panel */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <span>⛅</span>
                  <span>Conditions Météo en Direct (الطقس الحقيقي)</span>
                </h4>
                {loadingWeather ? (
                  <div className="text-center py-8 text-slate-500 animate-pulse">
                    Mise à jour des données météo...
                  </div>
                ) : weatherData ? (
                  <WeatherPanel data={weatherData} />
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    Météo non chargée.
                  </div>
                )}
              </div>

              {/* Timeline Operations Panel */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <span>📋</span>
                    <span>Sujet d'Activité & Logs (العمليات)</span>
                  </h4>
                  <button
                    onClick={() => onLogOperation(field)}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded-lg shadow-md transition-all active:scale-[0.98]"
                  >
                    + Log Action (إضافة عملية)
                  </button>
                </div>
                {loadingOperations ? (
                  <div className="text-center py-8 text-slate-500 animate-pulse">
                    Chargement du journal...
                  </div>
                ) : operationsData ? (
                  <OperationsPanel
                    data={operationsData}
                    onDelete={onDeleteOperation}
                    fieldId={field.id}
                  />
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    Aucune opération récente loggée.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <SpectralIndexGuide isOpen={showIndexGuide} onClose={() => setShowIndexGuide(false)} />
      {showReport && <ReportViewer field={field} onClose={() => setShowReport(false)} />}
    </div>
  );
}
