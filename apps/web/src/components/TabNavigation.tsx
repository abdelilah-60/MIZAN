import React from "react";
import type { ActiveTab } from "../lib/types";

interface Tab {
  key: ActiveTab;
  label: string;
  icon: string;
  count?: number;
}

interface TabNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  tabs: Tab[];
}

export const TabNavigation = React.memo(function TabNavigation({
  activeTab,
  onTabChange,
  tabs,
}: TabNavigationProps) {
  return (
    <div className="flex gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10 w-fit" role="tablist" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={activeTab === tab.key}
          aria-controls={`panel-${tab.key}`}
          onClick={() => onTabChange(tab.key)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === tab.key
              ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-900/10"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.key
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-white/5 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
});
