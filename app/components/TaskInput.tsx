"use client";
// ========== TYPES ==========
interface TaskInputProps {
  taskText: string;
  setTaskText: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
}

// ========== COMPONENT ==========
export default function TaskInput({
  taskText,
  setTaskText,
  addTask,
}: TaskInputProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 flex gap-3">
      {/* Input Field */}
      <input
        type="text"
        value={taskText}
        onChange={(e) => {
          setTaskText(e.target.value);
        }}
        placeholder="Enter your task..."
        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      {/* Add Button */}
      <button
        onClick={addTask}
        className="px-8 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
      >
        Add
      </button>
    </div>
  );
}
