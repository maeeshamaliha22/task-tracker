"use client";

import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  editingId: number | null;
  editingText: string;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  startEdit: (task: Task) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export default function TaskItem({
  task,
  editingId,
  editingText,
  setEditingText,
  startEdit,
  saveEdit,
  cancelEdit,
  toggleTask,
  deleteTask,
}: TaskItemProps) {
  return (
    <li
      //   key={task.id}
      className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-3"
    >
      {editingId === task.id ? (
        /* ========== EDIT MODE ========== */
        <div className="flex items-center gap-3">
          {/* Edit Input */}
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            autoFocus
          />
          {/* Save Button */}
          <button
            onClick={saveEdit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Save
          </button>
          {/* Cancel Button */}
          <button
            onClick={cancelEdit}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      ) : (
        /* ========== NORMAL MODE ========== */
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <button
            onClick={() => toggleTask(task.id)}
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              task.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300"
            }`}
          >
            {task.completed && <span className="text-white text-sm">✓</span>}
          </button>
          {/* Task text */}
          <p
            className={`text-lg  flex -1 ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {task.title}
          </p>
          {/* Edit Button */}
          <button
            onClick={() => startEdit(task)}
            className="px-3 py-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors font-medium"
          >
            Edit
          </button>
          {/* Delete button */}
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700 transition-colors font-medium px-3 py-1 rounded hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
