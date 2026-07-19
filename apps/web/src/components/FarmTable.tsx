import React from "react";
import type { Farm } from "../lib/types";
import { formatDate } from "../lib/utils";

interface FarmTableProps {
  farms: Farm[];
  debouncedSearchQuery: string;
}

export const FarmTable = React.memo(function FarmTable({
  farms,
  debouncedSearchQuery,
}: FarmTableProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-white/5 text-slate-400 text-left">
          <tr>
            <th className="px-6 py-4 font-semibold">Farm Name</th>
            <th className="px-6 py-4 font-semibold">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {farms.length === 0 ? (
            <tr>
              <td colSpan={2} className="px-6 py-10 text-center text-slate-500">
                {debouncedSearchQuery
                  ? "No farms matched your search."
                  : "No farms registered."}
              </td>
            </tr>
          ) : (
            farms.map((farm) => (
              <tr key={farm.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-emerald-400">{farm.name}</td>
                <td className="px-6 py-4 text-slate-500 text-xs">
                  {formatDate(farm.createdAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});
