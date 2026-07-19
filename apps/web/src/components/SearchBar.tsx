import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
}

export const SearchBar = React.memo(function SearchBar({
  searchQuery,
  onSearchChange,
  activeTab,
}: SearchBarProps) {
  return (
    <div className="mb-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-slate-400">🔍</span>
        </div>
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-900 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600 shadow-inner"
          aria-label={`Search ${activeTab}`}
        />
      </div>
    </div>
  );
});
