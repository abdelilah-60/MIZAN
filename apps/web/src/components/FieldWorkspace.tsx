import { useState, useEffect } from "react";
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
  onLogOperationDirectly: _onLogOperationDirectly,
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

  const [showIndexGuide, setShowIndexGuide] = useState(false);
  const [showReport, setShowReport] = useState(false);

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
