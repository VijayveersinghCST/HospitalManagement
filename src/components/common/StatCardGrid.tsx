// src/components/common/StatCardGrid.tsx
import StatCard, { type StatCardProps } from "@/components/common/StatCard";

interface StatCardGridProps {
  stats: StatCardProps[];
  /** Optional manual column override if needed */
  columns?: 2 | 3 | 4;
}

export default function StatCardGrid({ stats, columns }: StatCardGridProps) {
  // Auto-detect layout based on number of cards
  const count = columns || stats.length;

  const getGridCols = () => {
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    // Default 3 cards: Mobile pe 1, Tablet (768px) aur Laptop (1024px+) pe 3 cards 1 row me
    return "grid-cols-1 md:grid-cols-3";
  };

  return (
    <div className={`grid ${getGridCols()} gap-4 sm:gap-5`}>
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}