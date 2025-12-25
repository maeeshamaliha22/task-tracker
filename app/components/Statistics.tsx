"use client";

// ========== TYPES ==========
interface StatisticsProps {
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

// ========== COMPONENT ==========
export default function Statistics({
  totalCount,
  activeCount,
  completedCount,
}: StatisticsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-2 border border-gray-100 grid grid-cols-3 gap-4">
      {/* Total Count Card */}
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 flex gap-2 border border-blue-200">
        <span className="font-bold text-blue-600">{totalCount}</span>
        <span className="text-blue-700">Total</span>
      </div>
      {/* Active Count Card */}
      <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-4 flex gap-2 border border-orange-200">
        <span className="font-bold text-orange-800">{activeCount}</span>
        <span className="text-orange-600">Active</span>
      </div>
      {/* Completed Count Card */}
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 flex gap-2 border border-green-200">
        <span className="font-bold text-green-800">{completedCount}</span>
        <span className="text-green-600">Done</span>
      </div>
    </div>
  );
}
