import { useState } from "react";
import "./DateRangeFilter.css";

export type DateRange = "today" | "week" | "month" | "all";

interface DateRangeFilterProps {
  onFilterChange: (filter: DateRange) => void;
}

const filterOptions: { label: string; value: DateRange }[] = [
  { label: "Hoy", value: "today" },
  { label: "Semana", value: "week" },
  { label: "Mes", value: "month" },
  { label: "Todo", value: "all" },
];

export const DateRangeFilter = ({ onFilterChange }: DateRangeFilterProps) => {
  const [activeFilter, setActiveFilter] = useState<DateRange>("all");

  const handleSelectFilter = (filter: DateRange) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="date-range-filter">
      {filterOptions.map(({ label, value }) => (
        <button
          key={value}
          className={`filter-button ${activeFilter === value ? "active" : ""}`}
          onClick={() => handleSelectFilter(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};