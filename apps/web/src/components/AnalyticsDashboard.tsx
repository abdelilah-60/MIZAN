import { useState, useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { Field, OperationData } from "../lib/types";

interface AnalyticsDashboardProps {
  fields: Field[];
  operationsData?: OperationData[];
  token?: string;
  onSelectField?: (fieldId: string) => void;
}

export function AnalyticsDashboard({
  fields,
  operationsData = [],
  token,
}: AnalyticsDashboardProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string>(
    fields[0]?.id || ""
  );
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [loadingSnapshots, setLoadingSnapshots] = useState<boolean>(false);

  const activeField = useMemo(
    () => fields.find((f) => f.id === selectedFieldId) || fields[0],
    [fields, selectedFieldId]
  );

  // Fetch satellite history for selected field
  useEffect(() => {
    if (!selectedFieldId && fields.length > 0) {
      setSelectedFieldId(fields[0].id);
    }
  }, [fields, selectedFieldId]);

  useEffect(() => {
    if (selectedFieldId) {
      setLoadingSnapshots(true);
      const authToken = token || localStorage.getItem("token");
      fetch(`/api/satellite/history/${selectedFieldId}`, {
        headers: {
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.snapshots && Array.isArray(data.snapshots)) {
            setSnapshots(data.snapshots.reverse());
          } else {
            setSnapshots([]);
          }
        })
        .catch(() => setSnapshots([]))
        .finally(() => setLoadingSnapshots(false));
    }
  }, [selectedFieldId, token]);

  // Aggregate Stats
  const totalAreaHa = useMemo(
    () => fields.reduce((acc, f) => acc + (f.area || 0), 0),
    [fields]
  );

  const averageCanopyCover = useMemo(() => {
    if (fields.length === 0) return 0;
    const covers = fields
      .map((f) => Number(f.agronomicData?.canopyCover || 0))
      .filter((c) => c > 0);
    if (covers.length === 0) return 0;
    return Math.round(covers.reduce((a, b) => a + b, 0) / covers.length);
  }, [fields]);

  // Operations breakdown for pie chart
  const operationsBreakdown = useMemo(() => {
    const counts: Record<string, number> = {
      IRRIGATION: 0,
      FERTILIZER: 0,
      PESTICIDE: 0,
      HARVEST: 0,
      PRUNING: 0,
      TILLAGE: 0,
    };
    operationsData.forEach((op) => {
      if (counts[op.type] !== undefined) {
        counts[op.type] += 1;
      }
    });

    const labels: Record<string, { label: string; color: string }> = {
      IRRIGATION: { label: "ري (Irrigation)", color: "#3b82f6" },
      FERTILIZER: { label: "تسميد (Fertilisation)", color: "#10b981" },
      PESTICIDE: { label: "معالجة (Pesticide)", color: "#a855f7" },
      HARVEST: { label: "جني (Récolte)", color: "#f59e0b" },
      PRUNING: { label: "تقليم (Taille)", color: "#06b6d4" },
      TILLAGE: { label: "حرث (Labour)", color: "#64748b" },
    };

    return Object.keys(counts)
      .filter((key) => counts[key] > 0)
      .map((key) => ({
        name: labels[key]?.label || key,
        value: counts[key],
        color: labels[key]?.color || "#94a3b8",
      }));
  }, [operationsData]);

  // Fields Canopy Cover Bar Chart Data
  const fieldsCanopyData = useMemo(() => {
    return fields.map((f) => ({
      name: f.name,
      canopy: Number(f.agronomicData?.canopyCover || 0),
      area: f.area || 0,
    }));
  }, [fields]);

  // Satellite NDVI Time-series Data
  const ndviTimeSeriesData = useMemo(() => {
    if (snapshots.length > 0) {
      return snapshots.map((s) => ({
        date: new Date(s.captureDate).toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
        }),
        NDVI: s.meanNdvi,
        SAVI: s.meanSavi,
        NDWI: s.meanNdwi,
      }));
    }

    // Default synthetic 90-day trajectory if no history snapshots exist yet
    return [
      { date: "15 أيار", NDVI: 0.18, SAVI: 0.14, NDWI: 0.01 },
      { date: "01 حزيران", NDVI: 0.22, SAVI: 0.17, NDWI: 0.03 },
      { date: "15 حزيران", NDVI: 0.28, SAVI: 0.21, NDWI: 0.05 },
      { date: "01 تموز", NDVI: 0.35, SAVI: 0.26, NDWI: 0.04 },
      { date: "15 تموز", NDVI: 0.42, SAVI: 0.31, NDWI: 0.02 },
      { date: "29 تموز", NDVI: 0.45, SAVI: 0.33, NDWI: 0.01 },
    ];
  }, [snapshots]);

  // GDD Thermal accumulation curve
  const gddCurveData = useMemo(() => {
    const gdd = activeField?.seasonSummary?.[0]?.accumulatedGdd || 1440;
    return [
      { stage: "DORMANCE", gdd: 200, target: 400 },
      { stage: "DEBOURREMENT", gdd: 550, target: 700 },
      { stage: "FLORAISON", gdd: 900, target: 1100 },
      { stage: "NOUAISON", gdd: 1250, target: 1400 },
      { stage: "CROISSANCE", gdd: Math.min(gdd, 1800), target: 1800 },
      { stage: "VERAISON", gdd: gdd > 1800 ? gdd : 0, target: 2400 },
      { stage: "RECOLTE", gdd: gdd > 2400 ? gdd : 0, target: 2800 },
    ];
  }, [activeField]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Banner */}
      <div className="bg-slate-900/90 border border-emerald-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-900/40 border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-400 shadow-xl">
            📊
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>لوحة التحليلات البيانية الشاملة</span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-lg">
                Analytics Hub
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">
              مراقبة السلاسل الزمنية الطيفية، تراكم GDD الحراري، وتوزيع العمليات الزراعية
            </p>
          </div>
        </div>

        {/* Field Selector Pill */}
        {fields.length > 0 && (
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400 pl-2">الحقل:</span>
            <select
              value={selectedFieldId}
              onChange={(e) => setSelectedFieldId(e.target.value)}
              className="bg-slate-900 text-emerald-400 text-xs font-bold rounded-xl px-3 py-2 border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.area} ha)
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
            <span>إجمالي المساحة المدارة</span>
            <span>📐</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalAreaHa.toFixed(2)}{" "}
            <span className="text-xs text-slate-400">ha</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-bold">
            موزعة على {fields.length} حقول
          </p>
        </div>

        <div className="bg-slate-900/80 border border-emerald-500/20 p-5 rounded-2xl space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
            <span>متوسط التغطية الشجرية</span>
            <span>🌳</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {averageCanopyCover}%
          </div>
          <p className="text-[10px] text-slate-400 font-bold">
            {averageCanopyCover > 25 ? "عرش كثيف متوازن 🟢" : "غطاء خفيف / حديث 🟢"}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/20 p-5 rounded-2xl space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
            <span>الحرارة التراكمية (GDD)</span>
            <span>🌡️</span>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            {activeField?.seasonSummary?.[0]?.accumulatedGdd.toFixed(0) || "1440"}
          </div>
          <p className="text-[10px] text-amber-300 font-bold truncate">
            {activeField?.seasonSummary?.[0]?.currentStage || "CROISSANCE"}
          </p>
        </div>

        <div className="bg-slate-900/80 border border-blue-500/20 p-5 rounded-2xl space-y-1 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-bold">
            <span>إجمالي العمليات المسجلة</span>
            <span>📋</span>
          </div>
          <div className="text-2xl font-black text-blue-400 font-mono">
            {operationsData.length}
          </div>
          <p className="text-[10px] text-slate-400 font-bold">
            سجل التدخلات الزراعية
          </p>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: NDVI / SAVI Satellite Time Series */}
        <div className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-sm shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🌱 السلسلة الزمنية للمؤشرات الطيفية (NDVI / SAVI / NDWI)</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                تتبع التطور الخضري لحقل ({activeField?.name}) عبر الأقمار الصناعية
              </p>
            </div>
            {loadingSnapshots && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ndviTimeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={[0, 0.8]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="NDVI"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="SAVI"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="NDWI"
                  stroke="#3b82f6"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: GDD Thermal Trajectory Area Chart */}
        <div className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-sm shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🌡️ تراكم الحرارة الفينولوجية (GDD Curve)</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                تقدم الساعات الحرارية المستجمعة مقارنة بالعتبة التراكمية
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gddCurveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="stage" stroke="#94a3b8" tick={{ fontSize: 9 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Area
                  type="monotone"
                  dataKey="gdd"
                  name="GDD المستجمع"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.25}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  name="العتبة المستهدفة"
                  stroke="#64748b"
                  fill="#64748b"
                  fillOpacity={0.08}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Fields Canopy Cover Comparison (Bar Chart) */}
        <div className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-sm shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🌳 مقارنة كثافة العرش الحقيقية (% Canopy Cover)</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                مقارنة نسبة الغطاء الشجري المستخلصة عبر جميع الحقول
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fieldsCanopyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="canopy" name="كثافة العرش %" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Operations Breakdown (Donut Chart) */}
        <div className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-sm shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>📋 توزيع التدخلات والعمليات الزراعية</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                نسبة توزيع عمليات الري والتسميد والحماية والجني
              </p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {operationsBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={operationsBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {operationsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-500 text-xs text-center py-10">
                لا توجد عمليات مسجلة حتى الآن لعرض التوزيع البياني
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
