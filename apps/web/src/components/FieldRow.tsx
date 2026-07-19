import React from "react";
import type {
  Field,
  WeatherData,
  InsightData,
  OperationData,
  AgronomyData,
  AgronomyForm,
  SeasonSummary,
} from "../lib/types";
import { WeatherPanel } from "./WeatherPanel";
import { InsightsPanel } from "./InsightsPanel";
import { OperationsPanel } from "./OperationsPanel";
import { AgronomyPanel } from "./AgronomyPanel";
import { formatDate } from "../lib/utils";

interface FieldRowProps {
  field: Field;
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
  onLogOperation: (field: Field) => void;
  onDeleteField: (id: string) => void;
  onDeleteOperation: (fieldId: string, opId: string) => void;
  onSaveAgronomy: (fieldId: string, section: "irrigation" | "soil" | "yield") => void;
}

function getFieldAge(plantingDate?: string): number | null {
  if (!plantingDate) return null;
  const years = Math.floor(
    (Date.now() - new Date(plantingDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
  return years;
}

export const FieldRow = React.memo(function FieldRow({
  field,
  weatherData,
  insightsData,
  operationsData,
  agronomyData,
  agronomyForm,
  onAgronomyFormChange,
  onFetchWeather,
  onFetchInsights,
  onFetchOperations,
  onFetchAgronomy,
  onLogOperation,
  onDeleteField,
  onDeleteOperation,
  onSaveAgronomy,
}: FieldRowProps) {
  const age = getFieldAge(field.plantingDate);
  const ad = field.agronomicData;

  return (
    <React.Fragment>
      {/* Main Field Row */}
      <tr className="hover:bg-white/[0.02] transition-colors">
        <td className="px-6 py-4 font-medium text-amber-400">{field.name}</td>
        <td className="px-6 py-4 text-slate-400">{field.farm?.name || "Unknown"}</td>
        <td className="px-6 py-4 text-emerald-400 font-mono text-xs">{field.area} ha</td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wider">
            🫒 {field.cropType || "Olive"}
          </span>
        </td>
        <td className="px-6 py-4 text-slate-500 text-xs">{formatDate(field.createdAt)}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFetchWeather(field)}
              className={`p-2 rounded-lg border transition-all ${
                weatherData
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
              }`}
              title="Weather"
            >
              🌤️
            </button>
            <button
              onClick={() => onFetchInsights(field)}
              className={`p-2 rounded-lg border transition-all ${
                insightsData
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
              }`}
              title="AI Insights"
            >
              🧠
            </button>
            <button
              onClick={() => onFetchOperations(field)}
              className={`p-2 rounded-lg border transition-all ${
                operationsData
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
              }`}
              title="Operation Log"
            >
              📋
            </button>
            <button
              onClick={() => onFetchAgronomy(field)}
              className={`p-2 rounded-lg border transition-all ${
                agronomyData
                  ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
              }`}
              title="Agronomie & Décisions"
            >
              🧪
            </button>
            <button
              onClick={() => onLogOperation(field)}
              className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/20 transition-all"
              title="Log Action"
            >
              ➕
            </button>
            <button
              onClick={() => onDeleteField(field.id)}
              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-all"
              title="Delete Field"
            >
              🗑️
            </button>
          </div>
        </td>
      </tr>

      {/* Agronomic Profile Row */}
      <tr className="bg-slate-900/20">
        <td colSpan={7} className="px-6 py-4 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">🧬 Spec</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-2">
                {age !== null && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🌳</span>
                    <span className="text-xs font-semibold text-slate-300">{age} Years</span>
                  </div>
                )}
                {ad?.["Texture du Sol"] && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🧪</span>
                    <span className="text-xs font-semibold text-slate-300">{ad["Texture du Sol"]}</span>
                  </div>
                )}
                {ad?.["Système d Irrigation"] && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">💧</span>
                    <span className="text-xs font-semibold text-slate-300">{ad["Système d Irrigation"]}</span>
                  </div>
                )}
                {ad?.["Exposition"] && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🧭</span>
                    <span className="text-xs font-semibold text-slate-300">{ad["Exposition"]}</span>
                  </div>
                )}
                {ad?.["Porte-greffe"] && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🧬</span>
                    <span className="text-xs font-semibold text-slate-300">{ad["Porte-greffe"]}</span>
                  </div>
                )}
                {(!ad || Object.keys(ad).length === 0) && (
                  <button className="text-[10px] text-amber-500 hover:text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                    <span>⚠️</span> Complete Field Profile
                  </button>
                )}
              </div>
            </div>

            {field.seasonSummary && field.seasonSummary.length > 0 && (
              <GDDSummary summary={field.seasonSummary[0]} />
            )}
          </div>
        </td>
      </tr>

      {/* Weather Panel */}
      {weatherData && <WeatherPanel data={weatherData} />}

      {/* Insights Panel */}
      {insightsData && <InsightsPanel data={insightsData} cropType={field.cropType} />}

      {/* Operations Panel */}
      {operationsData && (
        <OperationsPanel data={operationsData} onDelete={onDeleteOperation} fieldId={field.id} />
      )}

      {/* Agronomy Panel */}
      {agronomyData && (
        <AgronomyPanel
          data={agronomyData}
          form={agronomyForm}
          onFormChange={onAgronomyFormChange}
          onSave={onSaveAgronomy}
          fieldId={field.id}
          operationsData={operationsData}
          field={field}
        />
      )}
    </React.Fragment>
  );
});

function GDDSummary({ summary }: { summary: SeasonSummary }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
      <span className="text-xs text-emerald-500 uppercase tracking-wider font-bold">🌡️ GDD & Stade</span>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">Stade:</span>
          <span className="font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded">
            🫒 {summary.currentStage}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">GDD:</span>
          <span className="font-semibold text-slate-300">
            {summary.accumulatedGdd.toFixed(0)} /{" "}
            {summary.gddToNextStage
              ? (summary.accumulatedGdd + summary.gddToNextStage).toFixed(0)
              : "Max"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">Froid:</span>
          <span className="font-semibold text-blue-300">
            {summary.accumulatedChilling.toFixed(0)} h {summary.bioFixReached ? "❄️" : "⏳"}
          </span>
        </div>
        {summary.predictedHarvestDate && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Récolte Estimée:</span>
            <span className="font-semibold text-amber-400">
              {formatDate(summary.predictedHarvestDate, "fr-FR", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
