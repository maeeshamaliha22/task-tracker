"use client";

import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface taskListProps {
  filteredTasks: Task[];
  searchQuery: string;
  editingId: number | null;
  editingText: string;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  startEdit: (task: Task) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export default function TaskList({
  filteredTasks,
  searchQuery,
  editingId,
  editingText,
  setEditingText,
  startEdit,
  saveEdit,
  cancelEdit,
  toggleTask,
  deleteTask,
}: taskListProps) {
  if (filteredTasks.length === 0) {
    return (
      // Show this if no tasks
      <div className="p-8 text-center text-gray-500">
        {searchQuery ? (
          <p className="text-xl">No tasks found for "{searchQuery}"</p>
        ) : (
          <p className="text-xl">No tasks yet!</p>
        )}
      </div>
    );
  }

  return (
    // Show this if tasks exist
    <div>
      <ul className="divide-y divide-gray-200">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            toggleTask={toggleTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
