"use client";

import { CategoryWeight } from "@/app/lib/weight-calculator";

interface WeightGraphProps {
  categoryWeights: CategoryWeight[];
  totalWeight: number;
}

const categoryColors: Record<string, string> = {
  shelter: "#3B82F6",
  sleep_system: "#8B5CF6",
  clothing: "#EC4899",
  filtration_and_cookware: "#F59E0B",
  pack_system: "#10B981",
  electronics: "#6366F1",
  essentials: "#14B8A6",
  miscellaneous: "#6B7280",
};

const categoryLabels: Record<string, string> = {
  shelter: "Shelter",
  sleep_system: "Sleep System",
  clothing: "Clothing",
  filtration_and_cookware: "Filtration & Cookware",
  pack_system: "Pack System",
  essentials: "Essentials",
  miscellaneous: "Miscellaneous",
};

export function WeightGraph({ categoryWeights, totalWeight }: WeightGraphProps) {
  if (categoryWeights.length === 0 || totalWeight === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-lg font-semibold mb-4">Weight Distribution</h2>
        <p className="text-zinc-500 text-center py-8">
          Add items to see weight distribution
        </p>
      </div>
    );
  }

  const sortedWeights = [...categoryWeights].sort(
    (a, b) => b.totalWeight - a.totalWeight
  );

  const maxWeight = Math.max(...sortedWeights.map((w) => w.totalWeight));

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-lg font-semibold mb-4">Weight Distribution</h2>

      <div className="space-y-3">
        {sortedWeights.map((cat) => {
          const percentage = totalWeight > 0 ? (cat.totalWeight / totalWeight) * 100 : 0;
          const barWidth = maxWeight > 0 ? (cat.totalWeight / maxWeight) * 100 : 0;
          const color = categoryColors[cat.category] || "#6B7280";

          return (
            <div key={cat.category}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{categoryLabels[cat.category] || cat.category}</span>
                <span className="text-zinc-500">
                  {cat.totalWeight.toFixed(2)} lbs ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${barWidth}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Total Pack Weight</span>
          <span className="font-bold">{totalWeight.toFixed(2)} lbs</span>
        </div>
      </div>
    </div>
  );
}
