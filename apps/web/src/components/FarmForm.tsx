import React from "react";

interface FarmFormProps {
  farmName: string;
  onFarmNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const FarmForm = React.memo(function FarmForm({
  farmName,
  onFarmNameChange,
  onSubmit,
  isSubmitting,
}: FarmFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm max-w-md"
    >
      <div className="space-y-1">
        <label className="text-xs text-slate-400 ml-1">Farm Name</label>
        <input
          type="text"
          placeholder="e.g. Green Valley"
          className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
          value={farmName}
          onChange={(e) => onFarmNameChange(e.target.value)}
          aria-label="Farm Name"
        />
      </div>
      <button
        disabled={isSubmitting || !farmName}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
      >
        {isSubmitting ? "Processing..." : "Register Farm"}
      </button>
    </form>
  );
});
