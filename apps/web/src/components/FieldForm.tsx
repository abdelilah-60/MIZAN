import React, { useEffect, useState } from "react";
import type { Farm, FieldRequirement } from "../lib/types";
import { getHeaders } from "../lib/api";
import FieldMap from "./FieldMap";

interface NewFieldState {
  name: string;
  farmId: string;
  cropType: string;
  plantingDate: string;
  geoPolygon: unknown;
  area: number;
  agronomicData: Record<string, string>;
}

interface FieldFormProps {
  newField: NewFieldState;
  onFieldChange: (field: NewFieldState) => void;
  farms: Farm[];
  onSubmit: (e: React.FormEvent) => void;
  onMapDraw?: (geoJson: unknown, areaHa: number) => void;
  isSubmitting: boolean;
  showOptionalSoilInput: boolean;
  onToggleSoil: () => void;
  token: string | null;
}

export function FieldForm({
  newField,
  onFieldChange,
  farms,
  onSubmit,
  isSubmitting,
  showOptionalSoilInput,
  onToggleSoil,
  token,
}: FieldFormProps) {
  const [fieldRequirements, setFieldRequirements] = useState<FieldRequirement[]>([]);
  const [isFetchingFieldReqs, setIsFetchingFieldReqs] = useState(false);
  const [varieties, setVarieties] = useState<{ id?: string; name: string }[]>([]);
  const [isFetchingVarieties, setIsFetchingVarieties] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchVarieties = async () => {
      setIsFetchingVarieties(true);
      try {
        const res = await fetch("/api/admin/varieties", {
          headers: getHeaders(token),
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setVarieties(data);
        }
      } catch (err) {
        console.error("Failed to fetch varieties", err);
      } finally {
        if (isMounted) setIsFetchingVarieties(false);
      }
    };
    fetchVarieties();
    return () => {
      isMounted = false;
    };
  }, [token]);

  useEffect(() => {
    if (!newField.cropType) return;
    let isMounted = true;
    const fetchFieldReqs = async () => {
      setIsFetchingFieldReqs(true);
      try {
        const res = await fetch(
          `/api/ontology/field-requirements?crop_name=${encodeURIComponent(newField.cropType)}`,
          { headers: getHeaders(token) }
        );
        if (res.ok) {
          const data = (await res.json()) as FieldRequirement[];
          if (isMounted) setFieldRequirements(data);
        } else {
          if (isMounted) setFieldRequirements([]);
        }
      } catch {
        if (isMounted) setFieldRequirements([]);
      } finally {
        if (isMounted) setIsFetchingFieldReqs(false);
      }
    };
    fetchFieldReqs();
    return () => {
      isMounted = false;
    };
  }, [newField.cropType, token]);

  const updateField = (partial: Partial<NewFieldState>) => {
    onFieldChange({ ...newField, ...partial });
  };

  useEffect(() => {
    if (farms && farms.length > 0 && !newField.farmId) {
      updateField({ farmId: farms[0].id });
    }
  }, [farms, newField.farmId]);

  const updateAgronomicData = (key: string, value: string) => {
    onFieldChange({
      ...newField,
      agronomicData: { ...newField.agronomicData, [key]: value },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-slate-400 ml-1">Field Name</label>
          <input
            type="text"
            placeholder="e.g. North Parcel A"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
            value={newField.name}
            onChange={(e) => updateField({ name: e.target.value })}
            aria-label="Field Name"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400 ml-1">🌱 Type de Culture</label>
          <input
            type="text"
            disabled
            value="Olive (الزيتون)"
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400 ml-1">🫒 Variété d'Olivier (الصنف)</label>
          <select
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none"
            value={newField.cropType}
            onChange={(e) => updateField({ cropType: e.target.value })}
            aria-label="Olive Variety"
            disabled={isFetchingVarieties}
          >
            {isFetchingVarieties ? (
              <option value="">Chargement...</option>
            ) : varieties.length > 0 ? (
              <>
                <option value="" disabled hidden>
                  Sélectionner
                </option>
                {varieties.map((v) => (
                  <option key={v.id || v.name} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </>
            ) : (
              <>
                <optgroup label="🌍 Maroc (Local)">
                  <option value="Picholine Marocaine">Picholine Marocaine</option>
                  <option value="Haouzia">Haouzia</option>
                  <option value="Menara">Menara</option>
                  <option value="Dahbia">Dahbia</option>
                  <option value="Meslala">Meslala</option>
                </optgroup>
                <optgroup label="🌍 Méditerranéen Introduit">
                  <option value="Arbequina">Arbequina</option>
                </optgroup>
              </>
            )}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-400 ml-1">Area (ha)</label>
          <div className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300">
            {newField.area > 0 ? (
              <span className="text-emerald-400 font-semibold">{newField.area} ha</span>
            ) : (
              <span className="text-slate-600">Draw on map below ↓</span>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Metadata Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl border border-white/5 border-dashed">
        <div className="space-y-1">
          <label className="text-xs text-slate-400 ml-1">Date de Plantation</label>
          <input
            type="date"
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            value={newField.plantingDate}
            onChange={(e) => updateField({ plantingDate: e.target.value })}
          />
        </div>
        {isFetchingFieldReqs ? (
          <div className="col-span-3 flex items-center justify-center py-4 text-xs text-slate-500 animate-pulse">
            Chargement des paramètres agronomiques pour {newField.cropType}...
          </div>
        ) : (
          fieldRequirements
            .filter((req) => req.name !== "Variété")
            .map((req) => {
              const isIrrigation = req.name === "Système d Irrigation";
              const isSoil = req.name === "Texture du Sol";

              return (
                <React.Fragment key={req.name}>
                  <div className="space-y-1 text-white">
                    <label className="text-xs text-slate-400 ml-1">{req.name}</label>
                    {req.inputType === "select" ? (
                      <select
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        value={newField.agronomicData[req.name] || ""}
                        onChange={(e) => updateAgronomicData(req.name, e.target.value)}
                        aria-label={req.name}
                      >
                        <option value="">Sélectionner</option>
                        {req.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={req.inputType === "number" ? "number" : "text"}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
                        placeholder={`Entrer ${req.name}`}
                        value={newField.agronomicData[req.name] || ""}
                        onChange={(e) => updateAgronomicData(req.name, e.target.value)}
                        aria-label={req.name}
                      />
                    )}
                  </div>

                  {/* DYNAMIC IRRIGATION DETAILS FOR GOUTTE A GOUTTE */}
                  {isIrrigation && newField.agronomicData[req.name] === "Goutte à goutte" && (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-1">
                        <label className="text-[11px] text-blue-300">Débit du goutteur (L/h)</label>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Ex: 4.0"
                          className="w-full bg-slate-950 border border-blue-500/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                          value={newField.agronomicData["dripperFlowRate"] || ""}
                          onChange={(e) => updateAgronomicData("dripperFlowRate", e.target.value)}
                          aria-label="Débit du goutteur"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-blue-300">Nombre de goutteurs/arbre</label>
                        <input
                          type="number"
                          placeholder="Ex: 2"
                          className="w-full bg-slate-950 border border-blue-500/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                          value={newField.agronomicData["drippersPerTree"] || ""}
                          onChange={(e) => updateAgronomicData("drippersPerTree", e.target.value)}
                          aria-label="Nombre de goutteurs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-blue-300">Efficacité (0.1 - 1.0)</label>
                        <input
                          type="number"
                          step="0.05"
                          placeholder="Ex: 0.85"
                          className="w-full bg-slate-950 border border-blue-500/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                          value={newField.agronomicData["efficiency"] || "0.85"}
                          onChange={(e) => updateAgronomicData("efficiency", e.target.value)}
                          aria-label="Efficacité"
                        />
                      </div>
                    </div>
                  )}

                  {/* DYNAMIC SOIL DETAILS TOGGLE */}
                  {isSoil && newField.agronomicData[req.name] && (
                    <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col gap-2 mt-2">
                      <button
                        type="button"
                        onClick={onToggleSoil}
                        className={`w-fit inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                          showOptionalSoilInput
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                        }`}
                        aria-expanded={showOptionalSoilInput}
                      >
                        <span>🔬</span>{" "}
                        {showOptionalSoilInput
                          ? "Masquer l'analyse de sol"
                          : "Ajouter des analyses physiques/organiques (Facultatif)"}
                      </button>

                      {showOptionalSoilInput && (
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                          {[
                            { key: "ph", label: "pH du Sol", step: "0.1", placeholder: "Ex: 7.2" },
                            { key: "organicMatter", label: "Matière Org. (%)", step: "0.1", placeholder: "Ex: 2.5" },
                            { key: "nitrogen", label: "N (ppm)", step: undefined, placeholder: "Ex: 25" },
                            { key: "phosphorus", label: "P (ppm)", step: undefined, placeholder: "Ex: 12" },
                            { key: "potassium", label: "K (ppm)", step: undefined, placeholder: "Ex: 150" },
                          ].map(({ key, label, step, placeholder }) => (
                            <div className="space-y-1" key={key}>
                              <label className="text-[10px] text-emerald-300">{label}</label>
                              <input
                                type="number"
                                step={step}
                                placeholder={placeholder}
                                className="w-full bg-slate-950 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                                value={newField.agronomicData[key] || ""}
                                onChange={(e) => updateAgronomicData(key, e.target.value)}
                                aria-label={label}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })
        )}
      </div>

      <div className="rounded-xl overflow-hidden border border-white/10 h-[280px]">
        <FieldMap onMapDraw={(geoJson, areaHa) => updateField({ geoPolygon: geoJson, area: areaHa })} />
      </div>

      <button
        disabled={isSubmitting || !newField.name || !newField.farmId || !newField.geoPolygon}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-900/20 transition-all active:scale-[0.98]"
      >
        {isSubmitting ? "Saving Field..." : "Create Field"}
      </button>
    </form>
  );
}
