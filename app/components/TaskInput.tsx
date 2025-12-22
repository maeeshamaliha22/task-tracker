"use client";

type Props = {
  taskText: string;
  setTaskText: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
};

export default function TaskInput({ taskText, setTaskText, addTask }: Props) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={taskText}
        onChange={(e) => {
          setTaskText(e.target.value);
        }}
        placeholder="Enter your task..."
        className="w-3xl px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <button
        onClick={addTask}
        className="px-8 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
      >
        Add
      </button>
    </div>
  );
}
