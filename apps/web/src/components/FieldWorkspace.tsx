import { useState, useEffect, useMemo, useRef } from "react";
import L from "leaflet";
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

interface SatelliteFieldCoverProps {
  geoPolygon?: any;
  satelliteMode: "SATELLITE" | "CANOPY" | "SAVI" | "NDVI" | "NDWI";
  satelliteData: any;
}

/* ─── Real High-Res ESRI Satellite Map Cover with Mask & Overlays ──── */
function SatelliteFieldCover({ geoPolygon, satelliteMode, satelliteData }: SatelliteFieldCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !geoPolygon?.coordinates?.[0]) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const coords = geoPolygon.coordinates[0];
    if (coords.length < 3) return;

    // ESRI World Imagery Satellite Tile Layer (High Resolution Aerial)
    const satelliteTile = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "Tiles &copy; Esri",
        maxZoom: 19,
      }
    );

    // Initialize Map centered on field
    const map = L.map(containerRef.current, {
      layers: [satelliteTile],
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      dragging: true,
    });
    mapRef.current = map;

    // 1. Inverted Mask: Mask out EVERYTHING outside field boundaries
    const worldOuterRing: [number, number][] = [
      [-180, -90],
      [180, -90],
      [180, 90],
      [-180, 90],
      [-180, -90],
    ];

    const invertedMaskFeature = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [worldOuterRing, coords],
      },
    };

    L.geoJSON(invertedMaskFeature as any, {
      style: {
        color: "transparent",
        fillColor: "#020617",
        fillOpacity: 0.94,
      },
    }).addTo(map);

    // 2. Add Polygon Layer for neon emerald border
    const polygonLayer = L.geoJSON(geoPolygon, {
      style: {
        color: "#10b981",
        weight: 3,
        opacity: 0.95,
        fillColor: "transparent",
        fillOpacity: 0,
      },
    }).addTo(map);

    // Get polygon bounds and fit map perfectly
    const bounds = polygonLayer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    // Add pulsing centroid pin
    const center = bounds.getCenter();
    const pulseIcon = L.divIcon({
      className: "custom-pulse-marker",
      html: `<div class="relative flex items-center justify-center">
        <div class="w-6 h-6 rounded-full bg-emerald-400/40 animate-ping absolute"></div>
        <div class="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-lg"></div>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    L.marker(center, { icon: pulseIcon }).addTo(map);

    // 3. Render Overlay Image for CANOPY / SAVI / NDVI / NDWI if selected and data is ready
    if (satelliteMode === "CANOPY" && satelliteData?.canopyCover?.overlayDataUrl && bounds.isValid()) {
      L.imageOverlay(satelliteData.canopyCover.overlayDataUrl, bounds, { opacity: 0.88 }).addTo(map);
    } else if (satelliteMode === "SAVI" && satelliteData?.savi?.overlayDataUrl && bounds.isValid()) {
      L.imageOverlay(satelliteData.savi.overlayDataUrl, bounds, { opacity: 0.88 }).addTo(map);
    } else if (satelliteMode === "NDVI" && satelliteData?.ndvi?.overlayDataUrl && bounds.isValid()) {
      L.imageOverlay(satelliteData.ndvi.overlayDataUrl, bounds, { opacity: 0.88 }).addTo(map);
    } else if (satelliteMode === "NDWI" && satelliteData?.ndwi?.overlayDataUrl && bounds.isValid()) {
      L.imageOverlay(satelliteData.ndwi.overlayDataUrl, bounds, { opacity: 0.88 }).addTo(map);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [geoPolygon, satelliteMode, satelliteData]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={containerRef} className="w-full h-full z-0" />
      {/* Subtle UI gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
    </div>
  );
}

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
          title: "❄️ مرحلة السكون الشتوي (Dormance)",
          desc: `يُنصح ببدء التسميد العضوي (Amendement Organique) لتغذية التربة وتحسين بنية الحقل وإمداد أشجار (${cropName}) بالمادة العضوية المجهزة قبل خروج العين.`,
          type: "ORGANIC_AMENDMENT",
          icon: "🍂",
          btnText: "Appliquer l'amendement (تطبيق التسميد)",
          prefill: {
            fertilizerType: "BOVINE",
            state: "DECOMPOSED",
            quantity: "20",
            unit: "Kg/arbre"
          }
        };
      case "DEBOURREMENT":
        return {
          title: "🌱 مرحلة خروج البراعم (Débourrement)",
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
          title: "🌸 مرحلة الإزهار (Floraison)",
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
          title: "👶 مرحلة عقد الثمار (Nouaison)",
          desc: `الثمار الفتية للصنف (${cropName}) تبدأ في النمو وتتطلب الآزوت المتوازن. يوصى بإضافة الجرعة الصافية الثانية: ${Math.round((npk?.n || 30) * 0.35)} كجم/هكتار لدعم العقد وتخفيف تساقط الثمار الفتية.`,
          type: "FERTILIZER",
          icon: "👶",
          btnText: "Appliquer la Dose d'Azote (تطبيق دفعة العقد)",
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
          title: "📈 مرحلة نمو وتصلب النواة (Croissance/Durcissement)",
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
          title: "🎨 مرحلة تلوين الثمرة وبداية النضج (Véraison)",
          desc: `ثمار الصنف (${cropName}) تبدأ بتغيير اللون. يُنصح بمراقبة ذبابة الزيتون لحماية المحصول، والتوقف التام عن التسميد الكيميائي تمهيداً للجني.`,
          type: "PESTICIDE",
          icon: "🛡️",
          btnText: "Pré-remplir Traitement (تسجيل حماية الثمار)",
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
          title: "🫒 مرحلة الجني والحصاد (Récolte)",
          desc: `حان موعد قطف حبات الصنف (${cropName}) للوجهة الموصى بها. يوصى بالجني اليدوي أو الهزازات اللطيفة لتجنب كسر وجرح الأغصان المنتجة للعام القادم.`,
          type: "HARVEST",
          icon: "🫒",
          btnText: "Pré-remplir la Récolte (تسجيل الجني)",
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
      {/* Header Card with SVG Cover, Info & Tabs */}
      <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">

        {/* Live Satellite Map Cover */}
        <div className="relative w-full h-[220px] md:h-[270px]">
          <SatelliteFieldCover
            geoPolygon={field.geoPolygon}
            satelliteMode={satelliteMode}
            satelliteData={satelliteData}
          />

          {/* Layer Switcher Controls */}
          <div className="absolute top-3 left-3 right-14 z-20 flex items-center justify-between pointer-events-auto">
            <div className="bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-xl p-1 flex items-center gap-1 shadow-2xl">
              <button
                type="button"
                onClick={() => setSatelliteMode("SATELLITE")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                  satelliteMode === "SATELLITE"
                    ? "bg-emerald-500 text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>🛰️</span>
                <span>طبيعي</span>
                {loadingSatellite && <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />}
              </button>

              <button
                type="button"
                onClick={() => setSatelliteMode("CANOPY")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                  satelliteMode === "CANOPY"
                    ? "bg-emerald-400 text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                title="Fractional Tree Canopy Coverage (% كثافة الأشجار حقيقية وفق خوارزمية أوتسو)"
              >
                <span>🌳</span>
                <span>كثافة الأشجار (% Cover)</span>
                {satelliteData?.canopyCover && (
                  <span className="bg-slate-950/40 text-slate-950 px-1.5 py-0.2 rounded font-mono text-[9px]">
                    {satelliteData.canopyCover.meanPct}%
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSatelliteMode("SAVI")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                  satelliteMode === "SAVI"
                    ? "bg-teal-400 text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                title="Soil-Adjusted Vegetation Index"
              >
                <span>🌿</span>
                <span>صحة الأشجار (SAVI)</span>
                {satelliteData?.savi && (
                  <span className="bg-slate-950/40 text-slate-950 px-1.5 py-0.2 rounded font-mono text-[9px]">
                    {satelliteData.savi.mean}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSatelliteMode("NDVI")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                  satelliteMode === "NDVI"
                    ? "bg-cyan-400 text-slate-950 shadow-md font-black"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>🌱</span>
                <span>الغطاء النباتي (NDVI)</span>
                {satelliteData?.ndvi && (
                  <span className="bg-slate-950/40 text-slate-950 px-1.5 py-0.2 rounded font-mono text-[9px]">
                    {satelliteData.ndvi.mean}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setSatelliteMode("NDWI")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                  satelliteMode === "NDWI"
                    ? "bg-blue-500 text-white shadow-md font-black"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>💧</span>
                <span>الإجهاد المائي (NDWI)</span>
                {satelliteData?.ndwi && (
                  <span className="bg-slate-950/40 text-white px-1.5 py-0.2 rounded font-mono text-[9px]">
                    {satelliteData.ndwi.hydricStressPct}%
                  </span>
                )}
              </button>
            </div>
            {/* Data Source Badge */}
            {satelliteData && (
              <div className={`bg-slate-950/80 backdrop-blur-md border px-2.5 py-1.5 rounded-xl text-[9px] font-bold flex items-center gap-2 shadow-lg ${
                satelliteData.dataSource === "sentinel-2-real"
                  ? "border-emerald-500/30 text-emerald-400"
                  : "border-amber-500/30 text-amber-400"
              }`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  satelliteData.dataSource === "sentinel-2-real" ? "bg-emerald-400" : "bg-amber-400"
                }`} />
                <span>{satelliteData.dataSource === "sentinel-2-real" ? "بيانات حقيقية ✓" : "تقريبي (Demo)"}</span>
                {satelliteData.lastPassDate && satelliteData.lastPassDate !== "N/A" && (
                  <span className="text-white/70 font-mono text-[9px]">📅 {satelliteData.lastPassDate}</span>
                )}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-slate-950/70 hover:bg-slate-800 border border-white/15 hover:border-white/25 text-white font-bold p-2 rounded-full transition-all z-20 shadow-lg active:scale-95 backdrop-blur-sm"
            title="Fermer / إغلاق"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Legend Banner when CANOPY / SAVI / NDVI or NDWI is active */}
          {satelliteMode !== "SATELLITE" && (
            <div className="absolute top-14 left-3 z-20 bg-slate-950/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[9px] font-mono text-slate-300 flex items-center gap-3 shadow-xl animate-in fade-in flex-wrap">
              {satelliteMode === "CANOPY" ? (
                <>
                  <span className="font-bold text-emerald-400">كثافة الأشجار الحقيقية (% Cover):</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> كثيفة عالية (&ge;35%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-lime-500"></span> متوازنة (18%-35%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> خفيفة/فتية (8%-18%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> تربة/منخفضة (&lt;8%)</span>
                </>
              ) : satelliteMode === "SAVI" ? (
                <>
                  <span className="font-bold text-emerald-400">صحة الأشجار (SAVI):</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> ممتازة (&ge;0.28)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-lime-500"></span> جيدة (0.20-0.28)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> متوسطة (0.14-0.20)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> ضعيفة (&lt;0.14)</span>
                </>
              ) : satelliteMode === "NDVI" ? (
                <>
                  <span className="font-bold text-teal-400">الغطاء النباتي (NDVI):</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> كثيفة (&ge;0.30)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-lime-500"></span> متوازنة (0.20-0.30)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> خفيفة (0.14-0.20)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> تربة/ضعيفة (&lt;0.14)</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-blue-400">دليل الإجهاد المائي:</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> ري مثالي (&ge;0.02)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> رطوبة متوازنة</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> جفاف خفيف</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600"></span> إجهاد حاد ⚠️</span>
                </>
              )}
            </div>
          )}

          {/* Floating stats on cover */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-emerald-400">
              {field.area} ha
            </div>
            {summary && (
              <div className="bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-amber-400">
                {stageLabels[summary.currentStage] || summary.currentStage}
              </div>
            )}
          </div>
        </div>

        {/* Profile Info Area */}
        <div className="relative px-5 pt-5 pb-4 bg-slate-900/60">
          {/* Avatar */}
          <div className="absolute -top-7 left-5 h-14 w-14 rounded-2xl border-[3px] border-slate-950 bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-xl shadow-lg z-10">
            🫒
          </div>

          {/* Name & details */}
          <div className="ml-[72px] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-2 flex-wrap">
                <span>{field.name}</span>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md uppercase tracking-wider">
                  {field.cropType || "Olive"}
                </span>
              </h2>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                {farm?.name || "Sans Ferme"} &bull; {field.area} Hectares
                {field.plantingDate && (
                  <> &bull; Planté {formatDate(field.plantingDate, "fr-FR", { month: "short", year: "numeric" })}</>
                )}
              </p>
            </div>

            {/* Phenological summary chips */}
            {summary && (
              <div className="flex gap-2 text-[10px] text-slate-300 font-mono flex-shrink-0">
                <div className="bg-slate-950/50 px-2.5 py-1.5 rounded-xl border border-white/5">
                  <p className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">GDD</p>
                  <p className="text-white font-bold">{summary.accumulatedGdd.toFixed(0)}</p>
                </div>
                <div className="bg-slate-950/50 px-2.5 py-1.5 rounded-xl border border-white/5">
                  <p className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Froid</p>
                  <p className="text-blue-400 font-bold">{summary.accumulatedChilling.toFixed(0)}h</p>
                </div>
                {summary.predictedHarvestDate && (
                  <div className="bg-slate-950/50 px-2.5 py-1.5 rounded-xl border border-white/5 hidden sm:block">
                    <p className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">Récolte</p>
                    <p className="text-amber-400 font-bold">
                      {formatDate(summary.predictedHarvestDate, "fr-FR", { month: "short", year: "2-digit" })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Satellite Agronomic Advice Banner */}
          {satelliteData?.agronomicAdvice && (
            <div className="mt-3 p-3 bg-slate-950/60 border border-emerald-500/20 rounded-2xl flex items-start gap-2.5 shadow-md">
              <span className="text-lg">📡</span>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                    تحليل الأقمار الصناعية (Sentinel-2A • 10m)
                  </span>
                  {satelliteData.lastPassDate && satelliteData.lastPassDate !== "N/A" && (
                    <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-1.5 py-0.5 rounded-md">
                      📅 تاريخ التصوير: {satelliteData.lastPassDate}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-200 font-medium leading-relaxed mt-0.5">
                  {satelliteData.agronomicAdvice}
                </p>
              </div>
            </div>
          )}

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

      {/* ========== SMART STAGE RECOMMENDATION CARD ========== */}
      {smartRec && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20 border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl flex-shrink-0">
              {smartRec.icon}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                العمليات المقترحة للمرحلة الحالية (Stage-Specific Recommendation)
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">{smartRec.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">{smartRec.desc}</p>
            </div>
          </div>
          <div className="flex justify-end pt-2 border-t border-white/5">
            <button
              onClick={() => onLogOperation(field, smartRec.type, smartRec.prefill)}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-lg transition-all active:scale-[0.97] flex items-center gap-1.5"
            >
              <span>{smartRec.icon}</span>
              <span>{smartRec.btnText}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========== ASSUMED COMPLIANCE BANNER ========== */}
      {showComplianceBanner && (
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-emerald-950/80 border border-emerald-500/20 rounded-2xl p-4 shadow-xl animate-in slide-in-from-top-4 duration-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">💧</span>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Mizan Smart Irrigation Sync (التزام الري الذكي)</h4>
              <p className="text-xs text-slate-300">
                Nous estimons un besoin d&apos;irrigation de <span className="text-emerald-400 font-extrabold">{recommendedMinutes} min</span> ({recommendedLiters} L) pour aujourd&apos;hui. Avez-vous irrigué ?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleAutoLog}
              disabled={isAutoLogging}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap flex items-center gap-1.5"
            >
              {isAutoLogging ? "Enregistrement..." : "✅ Oui (نعم)"}
            </button>
            <button
              onClick={() => onLogOperation(field, "IRRIGATION")}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white text-xs font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap"
            >
              ✏️ Modifier (تعديل)
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-xl transition-all"
              title="Ignorer / تجاهل"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
}
