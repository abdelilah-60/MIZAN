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
import { formatDate } from "../lib/utils";
import { SatelliteMapCanvas } from "./SatelliteMapCanvas";
import { SpectralLayerSwitcher } from "./SpectralLayerSwitcher";
import { DigitalTwinKPIs } from "./DigitalTwinKPIs";
import { SmartRecommendationCard } from "./SmartRecommendationCard";
import { SpectralIndexGuide } from "./SpectralIndexGuide";
import { ReportViewer } from "./ReportViewer";
import { useTranslation } from "react-i18next";

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

export type WorkspaceTab = "agronomy" | "insights" | "weather" | "operations";

export function FieldWorkspace({
  field,
  farms: _farms,
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
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const [activeTab, setActiveTab] = useState<WorkspaceTab>("agronomy");
  const [satelliteMode, setSatelliteMode] = useState<"SATELLITE" | "CANOPY" | "SAVI" | "NDVI" | "NDWI">("CANOPY");
  const [satelliteData, setSatelliteData] = useState<any>(null);
  const [loadingSatellite, setLoadingSatellite] = useState<boolean>(false);
  const [isMapExpanded, setIsMapExpanded] = useState<boolean>(false);

  // Auto-fetch satellite spectral data for field
  useEffect(() => {
    if (field?.geoPolygon) {
      setLoadingSatellite(true);
      const token = localStorage.getItem("token");
      const safeGeoPolygon = typeof field.geoPolygon === "string" ? JSON.parse(field.geoPolygon) : field.geoPolygon;
      const resolvedCropType = field.cropType || (field as any).variety || "Olive";

      fetch("/api/satellite/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          fieldId: field.id,
          geoPolygon: safeGeoPolygon,
          cropType: resolvedCropType,
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

  const summary = field.seasonSummary?.[0];

  // Dynamic localized stage label
  const stageLabels: Record<string, string> = {
    DORMANCE: t("phenology.DORMANCE"),
    DEBOURREMENT: t("phenology.DEBOURREMENT"),
    FLORAISON: t("phenology.FLORAISON"),
    NOUAISON: t("phenology.NOUAISON"),
    CROISSANCE: t("phenology.CROISSANCE"),
    VERAISON: t("phenology.VERAISON"),
    RECOLTE: t("phenology.RECOLTE"),
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
    const cropName = field.cropType || (isAr ? "الزيتون المغربي" : "Olive Marocaine");

    switch (stage) {
      case "DORMANCE":
        return {
          title: t("phenology.DORMANCE"),
          desc: isAr
            ? `يُنصح ببدء التسميد العضوي لتغذية التربة وتحسين بنية الحقل وإمداد أشجار (${cropName}) بالمادة العضوية قبل انفتاح البراعم.`
            : `Il est recommandé d'appliquer un amendement organique pour nourrir le sol et préparer les arbres de (${cropName}) avant le débourrement.`,
          type: "ORGANIC_AMENDMENT",
          icon: "🍂",
          btnText: isAr ? "تطبيق التسميد العضوي" : "Appliquer l'amendement organique",
          prefill: {
            fertilizerType: "BOVINE",
            state: "DECOMPOSED",
            quantity: "20",
            unit: "Kg/arbre"
          }
        };
      case "DEBOURREMENT":
        return {
          title: t("phenology.DEBOURREMENT"),
          desc: isAr
            ? `هذه هي بداية النمو الخضري النشط لصنف (${cropName}). يُنصح بإضافة الدفعة الربيعية الأولى: ${npk?.n || 31} كجم/هكتار من النيتروجين لدعم الأغصان الفتية.`
            : `C'est le début de la croissance vegetative active pour la variété (${cropName}). Appliquez la 1ère dose d'azote: ${npk?.n || 31} kg/ha.`,
          type: "FERTILIZER",
          icon: "🧪",
          btnText: isAr ? "تطبيق النيتروجين" : "Appliquer l'azote",
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
          title: t("phenology.FLORAISON"),
          desc: isAr
            ? `لتجنب تساقط الأزهار والحفاظ على الحمل لصنف (${cropName})، يجب ضبط الري والامتناع عن التسميد النيتروجيني المفرط مع رش الفوسفات والبورون الورقي.`
            : `Pour éviter la chute des fleurs sur la variété (${cropName}), ajustez l'irrigation et privilégiez un apport foliaire en phosphore et bore.`,
          type: "FERTILIZER",
          icon: "🌸",
          btnText: isAr ? "تطبيق الفوسفات" : "Appliquer le phosphore",
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
          title: t("phenology.NOUAISON"),
          desc: isAr
            ? `الثمار الفتية لصنف (${cropName}) تبدأ في النمو وتتطلب التغذية المتوازنة. يوصى بإضافة الجرعة الثانية: ${Math.round((npk?.n || 30) * 0.35)} كجم/هكتار لدعم العقد.`
            : `Les jeunes fruits de la variété (${cropName}) entrent en phase de nouaison. Appliquez la 2ème dose d'azote: ${Math.round((npk?.n || 30) * 0.35)} kg/ha.`,
          type: "FERTILIZER",
          icon: "👶",
          btnText: isAr ? "تطبيق دفعة عقد الثمار" : "Appliquer la dose de nouaison",
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
          title: t("phenology.CROISSANCE"),
          desc: isAr
            ? `هذه هي أهم فترة لتراكم الزيت وامتلاء الثمار في الزيتون (${cropName}). يُنصح بإضافة الدفعة الأساسية للبوتاسيوم: ${npk?.k || 40} كجم/هكتار لدعم حجم وجودة الحبة.`
            : `Période cruciale pour l'accumulation d'huile et le grossissement des olives (${cropName}). Appliquez la dose de potassium: ${npk?.k || 40} kg/ha.`,
          type: "FERTILIZER",
          icon: "📈",
          btnText: isAr ? "تطبيق سماد البوتاسيوم" : "Appliquer le potassium",
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
          title: t("phenology.VERAISON"),
          desc: isAr
            ? `ثمار الصنف (${cropName}) تبدأ بتغيير اللون والنضج. يُنصح بمراقبة ذبابة الزيتون لحماية المحصول، والتوقف عن التسميد الكيميائي تمهيداً للجني.`
            : `Les olives de (${cropName}) commencent la véraison. Surveillez la mouche de l'olive et stoppez la fertilisation chimique avant récolte.`,
          type: "PESTICIDE",
          icon: "🛡️",
          btnText: isAr ? "تسجيل معالجة وقاية الثمار" : "Traitement de protection des fruits",
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
          title: t("phenology.RECOLTE"),
          desc: isAr
            ? `حان موعد قطف حبات الصنف (${cropName}). يوصى بالجني اليدوي أو الهزازات اللطيفة لتجنب جرح الأغصان المنتجة للموسم القادم.`
            : `La période de récolte des olives (${cropName}) a sonné. Privilégiez un peignage manuel ou un vibreur adapté pour préserver le rameau.`,
          type: "HARVEST",
          icon: "🫒",
          btnText: isAr ? "تسجيل عملية الجني والحصاد" : "Enregistrer la récolte",
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
  }, [summary?.currentStage, agronomyData, field.cropType, isAr, t]);

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
          volumeM3: String(Math.round((recommendedLiters * ((agronomyData?.recommendations?.water as any)?.treeDensity || 200) * field.area) / 1000)),
          durationMinutes: String(recommendedMinutes),
          waterSource: "WELL",
          notes: isAr ? "تسجيل أوتوماتيكي عبر توصية منصة ميزان" : "Enregistrement automatique via recommandation Mizan"
        }
      });
      setIsDismissed(true);
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
    } else if (activeTab === "weather" && !weatherData && !loadingWeather) {
      onFetchWeather(field);
    } else if (activeTab === "operations" && !operationsData && !loadingOperations) {
      onFetchOperations(field);
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
      {/* 1. Header Card with Ultra-Premium Glassmorphism & Digital Twin UX */}
      <div className="rounded-[32px] overflow-hidden border border-[#2e4052] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-[#16212b] relative">

        {/* Live Full-Bleed Satellite Map Canvas */}
        <div className={`relative w-full transition-all duration-300 ${isMapExpanded ? "h-[500px]" : "h-[280px] md:h-[360px]"}`}>
          <SatelliteMapCanvas
            geoPolygon={typeof field.geoPolygon === "string" ? JSON.parse(field.geoPolygon) : field.geoPolygon}
            satelliteMode={satelliteMode}
            satelliteData={satelliteData}
          />

          {/* Bottom Vignette Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#16212b] via-[#16212b]/60 to-transparent pointer-events-none z-10" />

          <SpectralLayerSwitcher
            satelliteMode={satelliteMode}
            setSatelliteMode={setSatelliteMode}
            satelliteData={satelliteData}
            loadingSatellite={loadingSatellite}
            onClose={onClose}
          />

          {/* Map Expand & Stage Badges on Map Canvas */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
            {summary && (
              <div className="bg-[#16212b]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-[#8D5B4C]/40 text-xs font-bold text-[#F9F8F6] shadow-xl flex items-center gap-2">
                <span>{stageLabels[summary.currentStage]?.split(" ")[0] || "🌱"}</span>
                <span>{stageLabels[summary.currentStage] || summary.currentStage}</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsMapExpanded(!isMapExpanded)}
              className="bg-[#16212b]/95 hover:bg-[#1f2d3a] border border-[#2e4052] text-[#D8D2C5] hover:text-[#F9F8F6] px-3 py-1.5 rounded-2xl text-xs font-bold shadow-xl transition-all flex items-center gap-1.5"
              title={isMapExpanded ? (isAr ? "تصغير الخريطة" : "Réduire la carte") : (isAr ? "تكبير الخريطة" : "Agrandir la carte")}
            >
              <span>{isMapExpanded ? "↙️" : "↗️"}</span>
              <span className="hidden sm:inline">
                {isMapExpanded ? (isAr ? "تصغير الخريطة" : "Réduire") : (isAr ? "تكبير الخريطة" : "Agrandir")}
              </span>
            </button>
          </div>
        </div>

        {/* Digital Twin KPI Grid & Profile Info Area */}
        <div className="relative p-6 bg-[#16212b] space-y-6">
          
          {/* Main Title Header with Crop Avatar & Metadata Badges */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2e4052] pb-5">
            <div className="flex items-start md:items-center gap-4">
              <div className="h-16 w-16 rounded-3xl border-2 border-[#8D5B4C]/40 bg-gradient-to-br from-[#8D5B4C]/20 to-[#2C3E50]/60 backdrop-blur-md flex items-center justify-center text-3xl shadow-xl flex-shrink-0">
                🫒
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl md:text-2xl font-black text-[#F9F8F6]">
                    {field.name}
                  </h2>
                  <span className="text-[11px] font-black px-3 py-1 bg-[#8D5B4C]/20 text-[#F9F8F6] border border-[#8D5B4C]/40 rounded-xl uppercase tracking-wider shadow-inner">
                    {field.cropType || (field as any).variety || "ARBEQUINA"}
                  </span>
                </div>
                
                {/* Rich Metadata Pills */}
                <div className="flex items-center gap-2 text-xs text-[#D8D2C5] font-medium flex-wrap">
                  <span className="bg-[#1f2d3a] px-2.5 py-0.5 rounded-lg border border-[#2e4052]">📐 {field.area} {t("common.ha")}</span>
                  {field.plantingDate && (
                    <span className="bg-[#1f2d3a] px-2.5 py-0.5 rounded-lg border border-[#2e4052]">
                      🌱 {isAr ? "تاريخ الغرس" : "Plantation"}: {formatDate(field.plantingDate, isAr ? "ar-MA" : "fr-FR", { month: "short", year: "numeric" })}
                    </span>
                  )}
                  <span className="bg-[#1f2d3a] px-2.5 py-0.5 rounded-lg border border-[#2e4052]">
                    💧 {isAr ? "ري بالتنقيط" : "Goutte-à-goutte"}
                  </span>
                  <span className="bg-[#1f2d3a] px-2.5 py-0.5 rounded-lg border border-[#2e4052]">
                    📍 {isAr ? "المملكة المغربية" : "Maroc"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowReport(true)}
                className="bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] hover:from-[#9e6757] hover:to-[#b35d35] text-[#F9F8F6] text-xs font-bold px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shadow-xl active:scale-95 border border-[#B86B53]/30"
              >
                <span>📄</span>
                <span>{t("workspace.actions.pdfReport")}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowIndexGuide(true)}
                className="bg-[#1f2d3a] hover:bg-[#28394a] border border-[#2e4052] text-[#D8D2C5] hover:text-[#F9F8F6] text-xs font-bold px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shadow-xl active:scale-95"
              >
                <span>📖</span>
                <span>{t("workspace.actions.indexGuide")}</span>
              </button>
            </div>
          </div>

          {/* Digital Twin KPIs */}
          <DigitalTwinKPIs
            satelliteData={satelliteData}
            summary={summary}
            stageLabels={stageLabels}
          />

          {/* 4 Structured Domain Tabs */}
          <div className="flex gap-2 pt-2 border-t border-[#2e4052] overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab("agronomy")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap active:scale-95 ${
                activeTab === "agronomy"
                  ? "bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] text-[#F9F8F6] border-[#B86B53]/40 shadow-lg"
                  : "bg-[#1f2d3a]/60 text-[#D8D2C5] hover:text-[#F9F8F6] hover:bg-[#1f2d3a] border-[#2e4052]"
              }`}
            >
              <span>1. {t("workspace.tabs.agronomy")}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("insights")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap active:scale-95 ${
                activeTab === "insights"
                  ? "bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] text-[#F9F8F6] border-[#B86B53]/40 shadow-lg"
                  : "bg-[#1f2d3a]/60 text-[#D8D2C5] hover:text-[#F9F8F6] hover:bg-[#1f2d3a] border-[#2e4052]"
              }`}
            >
              <span>2. {t("workspace.tabs.insights")}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("weather")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap active:scale-95 ${
                activeTab === "weather"
                  ? "bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] text-[#F9F8F6] border-[#B86B53]/40 shadow-lg"
                  : "bg-[#1f2d3a]/60 text-[#D8D2C5] hover:text-[#F9F8F6] hover:bg-[#1f2d3a] border-[#2e4052]"
              }`}
            >
              <span>3. {t("workspace.tabs.weather")}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("operations")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap active:scale-95 ${
                activeTab === "operations"
                  ? "bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] text-[#F9F8F6] border-[#B86B53]/40 shadow-lg"
                  : "bg-[#1f2d3a]/60 text-[#D8D2C5] hover:text-[#F9F8F6] hover:bg-[#1f2d3a] border-[#2e4052]"
              }`}
            >
              <span>4. {t("workspace.tabs.operations")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Domain Tab Panels */}
      <div className="bg-[#16212b]/90 border border-[#2e4052] rounded-[32px] p-6 backdrop-blur-md min-h-[340px] shadow-2xl">
        {/* TAB 1: AGRONOMY (IRRIGATION & FERTIGATION RECOMMENDATIONS) */}
        {activeTab === "agronomy" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Integrated Recommendation Cards (Shown ONLY inside Irrigation & Fertigation Tab) */}
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

            {loadingAgronomy ? (
              <div className="text-center py-16 text-[#D8D2C5] animate-pulse font-medium">
                {t("common.loading")}
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
              <div className="text-center py-16 text-[#D8D2C5]">
                {t("common.error")}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: HEALTH & RISKS */}
        {activeTab === "insights" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {loadingInsights ? (
              <div className="text-center py-16 text-[#D8D2C5] animate-pulse font-medium">
                {t("common.loading")}
              </div>
            ) : insightsData ? (
              <InsightsPanel data={insightsData} cropType={field.cropType} />
            ) : (
              <div className="text-center py-16 text-[#D8D2C5]">
                {isAr ? "لم يتم توليد تحليل المخاطر بعد." : "Analyse des risques non générée."}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MICROCLIMATE & WEATHER */}
        {activeTab === "weather" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#2e4052] pb-4">
              <div>
                <h3 className="text-lg font-black text-[#F9F8F6] flex items-center gap-2">
                  <span>⛅</span>
                  <span>{t("grid.liveWeather")}</span>
                </h3>
                <p className="text-xs text-[#D8D2C5] mt-1">
                  {isAr ? `توقعات الطقس لـ 7 أيام والمؤشرات الحرارية لحقل ${field.name}` : `Prévisions météo 7 jours et microclimat pour la parcelle ${field.name}`}
                </p>
              </div>
            </div>

            {loadingWeather ? (
              <div className="text-center py-16 text-[#D8D2C5] animate-pulse font-medium">
                {t("common.loading")}
              </div>
            ) : weatherData ? (
              <WeatherPanel data={weatherData} />
            ) : (
              <div className="text-center py-16 text-[#D8D2C5]">
                {isAr ? "تعذر تحميل بيانات الطقس" : "Météo non disponible"}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: OPERATIONS & TIMELINE LOGS */}
        {activeTab === "operations" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#2e4052] pb-4 flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-black text-[#F9F8F6] flex items-center gap-2">
                  <span>📋</span>
                  <span>{t("workspace.tabs.operations")}</span>
                </h3>
                <p className="text-xs text-[#D8D2C5] mt-1">
                  {isAr ? `تتبع جميع العمليات الفلاحية المدونة لحقل ${field.name}` : `Suivi de toutes les interventions agricoles enregistrées pour ${field.name}`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onLogOperation(field)}
                className="px-4 py-2.5 bg-gradient-to-r from-[#8D5B4C] to-[#A0522D] hover:from-[#9e6757] hover:to-[#b35d35] text-[#F9F8F6] text-xs font-bold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>+</span>
                <span>{t("modal.logOperation")}</span>
              </button>
            </div>

            {loadingOperations ? (
              <div className="text-center py-16 text-[#D8D2C5] animate-pulse font-medium">
                {t("common.loading")}
              </div>
            ) : operationsData ? (
              <OperationsPanel
                data={operationsData}
                onDelete={onDeleteOperation}
                fieldId={field.id}
              />
            ) : (
              <div className="text-center py-16 text-[#D8D2C5]">
                {isAr ? "لا توجد عمليات ميدانية مسجلة مؤخراً" : "Aucune opération récente enregistrée"}
              </div>
            )}
          </div>
        )}
      </div>

      <SpectralIndexGuide isOpen={showIndexGuide} onClose={() => setShowIndexGuide(false)} />
      {showReport && <ReportViewer field={field} onClose={() => setShowReport(false)} />}
    </div>
  );
}
