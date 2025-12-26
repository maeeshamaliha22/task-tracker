"use client";

// ========== TYPES ==========
interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// ========== COMPONENT ==========
export default function SearchFilter({
  searchQuery,
  setSearchQuery,
}: SearchFilterProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Search tasks..."
        className="w-full px-4 py-3 pl-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          x
        </button>
      )}
    </div>
  );
}
