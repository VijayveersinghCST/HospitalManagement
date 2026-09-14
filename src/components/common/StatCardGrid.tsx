import StatCard, { type StatCardProps } from "@/components/common/StatCard";

interface StatCardGridProps {
  stats: StatCardProps[];
}

/**
 * Lays stat cards out responsively:
 * - mobile: 1 column
 * - tablet (sm, 640px+): 2 columns
 * - small/large laptop (xl, 1280px+): 3 columns
 * Pass any number of stats; the grid wraps automatically.
 */
export default function StatCardGrid({ stats }: StatCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
