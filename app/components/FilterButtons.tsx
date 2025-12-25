"use client";
import { FilterType } from "../types/task";

// ========== TYPES ==========
interface FilterButtonsProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

// ========== COMPONENT ==========
export default function FilterButtons({
  filter,
  setFilter,
}: FilterButtonsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex gap-2 mt-4 mb-4">
      {/*Filtering all tasks */}
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded-lg ${
          filter === "all"
            ? "bg-blue-500 text-white"
            : "bg-blue-100  hover:bg-blue-200"
        }`}
      >
        All
      </button>

      {/*Filtering active tasks */}
      <button
        onClick={() => setFilter("active")}
        className={`px-4 py-2 rounded-lg ${
          filter === "active"
            ? "bg-blue-500 text-white"
            : "bg-blue-100  hover:bg-blue-200"
        }`}
      >
        Active
      </button>

      {/*Filtering completed tasks */}
      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 rounded-lg ${
          filter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-blue-100  hover:bg-blue-200"
        }`}
      >
        Completed
      </button>
    </div>
  );
}
