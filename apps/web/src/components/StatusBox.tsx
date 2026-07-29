import { useState, useEffect, useRef } from "react";
import type { Field } from "../lib/types";

export type OperationType = "IRRIGATION" | "FERTILIZER" | "PESTICIDE" | "HARVEST";

interface StatusBoxProps {
  fields: Field[];
  onSubmitLog: (payload: {
    type: OperationType;
    fieldId: string;
    metadata: Record<string, any>;
  }) => Promise<void>;
  onToast: (msg: string, type: "success" | "error" | "info") => void;
}

export function StatusBox({ fields, onSubmitLog, onToast }: StatusBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<string>("");
  const [selectedType, setSelectedType] = useState<OperationType | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states based on selectedType
  const [volume, setVolume] = useState("50");
  const [duration, setDuration] = useState("120");
  const [fertilizerType, setFertilizerType] = useState("NPK 15-15-15");
  const [fertilizerQty, setFertilizerQty] = useState("20");
  const [pesticideName, setPesticideName] = useState("هيدروكسيد النحاس");
  const [targetPest, setTargetPest] = useState("مرض عين الطاووس");
  const [harvestQty, setHarvestQty] = useState("5");

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "ar-MA"; // Target Moroccan/Arabic speech (can fallback or support French)

      rec.onstart = () => {
        setIsListening(true);
        setVoiceText("Écoute en cours / جاري الاستماع...");
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (e: any) => {
        console.error("Speech recognition error", e);
        setIsListening(false);
        onToast("Erreur vocale ou autorisation refusée", "error");
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setVoiceText(text);
        parseVoiceCommand(text);
      };

      recognitionRef.current = rec;
    }
  }, [fields]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        onToast("La reconnaissance vocale n'est pas supportée sur ce navigateur.", "info");
        // Simulated voice parser fallback for testing
        const simulatedText = "سقينا حقل Picholine ساعتين";
        onToast(`Simulation vocale: "${simulatedText}"`, "info");
        setTimeout(() => parseVoiceCommand(simulatedText), 1500);
        return;
      }
      // Force user to select language or just start
      recognitionRef.current.lang = Math.random() > 0.5 ? "ar-MA" : "fr-FR";
      recognitionRef.current.start();
    }
  };

  const parseVoiceCommand = (text: string) => {
    const lowerText = text.toLowerCase();
    onToast(`Texte détecté: "${text}"`, "info");

    // 1. Detect Operation Type
    let detectedType: OperationType | null = null;
    if (
      lowerText.includes("سقي") ||
      lowerText.includes("ري") ||
      lowerText.includes("ماء") ||
      lowerText.includes("سقينا") ||
      lowerText.includes("irrigation") ||
      lowerText.includes("arroser") ||
      lowerText.includes("eau")
    ) {
      detectedType = "IRRIGATION";
    } else if (
      lowerText.includes("تسميد") ||
      lowerText.includes("سماد") ||
      lowerText.includes("سمدنا") ||
      lowerText.includes("npk") ||
      lowerText.includes("fertilisation") ||
      lowerText.includes("fertiliser")
    ) {
      detectedType = "FERTILIZER";
    } else if (
      lowerText.includes("رش") ||
      lowerText.includes("دواء") ||
      lowerText.includes("فطري") ||
      lowerText.includes("علاج") ||
      lowerText.includes("pesticide") ||
      lowerText.includes("traitement") ||
      lowerText.includes("fongicide")
    ) {
      detectedType = "PESTICIDE";
    } else if (
      lowerText.includes("جني") ||
      lowerText.includes("حصاد") ||
      lowerText.includes("جمع") ||
      lowerText.includes("récolte") ||
      lowerText.includes("cueillir")
    ) {
      detectedType = "HARVEST";
    }

    if (detectedType) {
      setSelectedType(detectedType);
      setIsExpanded(true);
    }

    // 2. Detect Field
    const matchedField = fields.find((f) => {
      const name = f.name.toLowerCase();
      const crop = f.cropType.toLowerCase();
      return (
        lowerText.includes(name) ||
        lowerText.includes(crop) ||
        (f.name.includes("A") && lowerText.includes("أ")) ||
        (f.name.includes("B") && lowerText.includes("ب"))
      );
    });

    if (matchedField) {
      setSelectedFieldId(matchedField.id);
    } else if (fields.length > 0) {
      // Default to first field if none matched
      setSelectedFieldId(fields[0].id);
    }

    // 3. Detect Numbers for quantities (e.g. 3 hours, 50 liters)
    const numbers = lowerText.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const numValue = numbers[0];
      if (detectedType === "IRRIGATION") {
        if (lowerText.includes("ساعة") || lowerText.includes("heure") || lowerText.includes("ساعات")) {
          setDuration((parseInt(numValue) * 60).toString());
        } else {
          setVolume(numValue);
        }
      } else if (detectedType === "FERTILIZER") {
        setFertilizerQty(numValue);
      } else if (detectedType === "HARVEST") {
        setHarvestQty(numValue);
      }
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFieldId) {
      onToast("Veuillez sélectionner un champ / الحقل مطلوب", "error");
      return;
    }
    if (!selectedType) {
      onToast("Veuillez choisir un type d'opération / نوع العملية مطلوب", "error");
      return;
    }

    setIsSubmitting(true);
    let metadata: Record<string, any> = {};

    switch (selectedType) {
      case "IRRIGATION":
        metadata = { volume: parseFloat(volume), duration: parseInt(duration) };
        break;
      case "FERTILIZER":
        metadata = { type: fertilizerType, quantity: parseFloat(fertilizerQty) };
        break;
      case "PESTICIDE":
        metadata = { name: pesticideName, targetPest };
        break;
      case "HARVEST":
        metadata = { quantity: parseFloat(harvestQty) };
        break;
    }

    try {
      await onSubmitLog({
        type: selectedType,
        fieldId: selectedFieldId,
        metadata,
      });
      onToast("Opération enregistrée avec succès !", "success");
      // Reset form
      setSelectedType(null);
      setIsExpanded(false);
      setVoiceText("");
    } catch (err) {
      onToast("Échec de l'enregistrement de l'opération", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl space-y-4 transition-all duration-300">
      {/* Top collapsed row */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
          🌱
        </div>
        <input
          type="text"
          placeholder="ماذا سجلت في حقلك اليوم؟ / Quoi de neuf dans vos parcelles ?"
          onClick={() => setIsExpanded(true)}
          value={voiceText}
          onChange={(e) => setVoiceText(e.target.value)}
          className="flex-1 bg-slate-950/40 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 placeholder-slate-500"
          aria-label="Statut"
        />
        <button
          type="button"
          onClick={toggleListening}
          className={`h-9 w-9 rounded-full flex items-center justify-center border transition-all ${
            isListening
              ? "bg-red-500/20 border-red-500/40 text-red-400 animate-pulse"
              : "bg-slate-800 border-white/5 text-slate-400 hover:text-white hover:bg-slate-700"
          }`}
          title="Enregistrer par voix / تسجيل صوتي"
        >
          {isListening ? (
            <div className="flex gap-0.5 items-center">
              <span className="h-3 w-0.5 bg-red-400 animate-bounce"></span>
              <span className="h-4 w-0.5 bg-red-400 animate-bounce delay-75"></span>
              <span className="h-3 w-0.5 bg-red-400 animate-bounce delay-150"></span>
            </div>
          ) : (
            "🎙️"
          )}
        </button>
      </div>

      {/* Expanded Quick Publish view */}
      {isExpanded && (
        <form onSubmit={handlePublish} className="space-y-4 pt-3 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* 1. Field Avatar Row */}
          <div className="space-y-2">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sélectionner la Parcelle (الحقل)</label>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {fields.map((field) => {
                const isSelected = selectedFieldId === field.id;
                return (
                  <button
                    key={field.id}
                    type="button"
                    onClick={() => setSelectedFieldId(field.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all shrink-0 ${
                      isSelected
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                        : "bg-slate-950/30 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <span>🫒</span>
                    <span>{field.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Operation Type Selector */}
          <div className="space-y-2">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">نوع التدخل الزراعي</label>
            <div className="grid grid-cols-4 gap-2">
              {(["IRRIGATION", "FERTILIZER", "PESTICIDE", "HARVEST"] as OperationType[]).map((type) => {
                const isSelected = selectedType === type;
                const config = ({
                  IRRIGATION: { icon: "💧", label: "ري الحقل", color: "border-blue-500/30 text-blue-400 bg-blue-500/5" },
                  FERTILIZER: { icon: "🌱", label: "تسميد", color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" },
                  PESTICIDE: { icon: "🧪", label: "معالجة وقائية", color: "border-purple-500/30 text-purple-400 bg-purple-500/5" },
                  HARVEST: { icon: "🚜", label: "جني المحصول", color: "border-amber-500/30 text-amber-400 bg-amber-500/5" },
                } as any)[type];

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? `${config.color} ring-1 ring-white/10 scale-[1.02]`
                        : "bg-slate-950/20 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-sm mb-1">{config.icon}</span>
                    <span className="text-[9px] font-bold uppercase">{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Dynamic input metrics fields */}
          {selectedType && (
            <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 space-y-3 animate-in fade-in duration-200">
              {selectedType === "IRRIGATION" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-500">Volume d'eau (L/arbre)</label>
                    <input
                      type="number"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-500">Durée (minutes)</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {selectedType === "FERTILIZER" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-500">Formule Engrais</label>
                    <input
                      type="text"
                      value={fertilizerType}
                      onChange={(e) => setFertilizerType(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-500">Quantité (kg/ha)</label>
                    <input
                      type="number"
                      value={fertilizerQty}
                      onChange={(e) => setFertilizerQty(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {selectedType === "PESTICIDE" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-500">Nom du produit</label>
                    <input
                      type="text"
                      value={pesticideName}
                      onChange={(e) => setPesticideName(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-500">Cible (آفة/مرض)</label>
                    <input
                      type="text"
                      value={targetPest}
                      onChange={(e) => setTargetPest(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {selectedType === "HARVEST" && (
                <div className="space-y-1 max-w-xs">
                  <label className="text-[9px] text-slate-500">Rendement estimé (tonnes/ha)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={harvestQty}
                    onChange={(e) => setHarvestQty(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setSelectedType(null);
                setVoiceText("");
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-[10px] font-bold"
            >
              Annuler (إلغاء)
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/40 text-slate-950 text-[10px] font-bold transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5"
            >
              {isSubmitting && <div className="h-2.5 w-2.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />}
              <span>Publier (تسجيل)</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
