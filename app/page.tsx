"use client";

import { useEffect, useState } from "react";
import { Task, FilterType } from "./types/task";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import SearchFilter from "./components/SearchFilter";
import Statistics from "./components/Statistics";
import FilterButtons from "./components/FilterButtons";

export default function TaskTracker() {
  // ========== STATE MANAGEMENT ==========
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // ========== PERSISTENCE ==========
  // Load tasks when app first loads
  useEffect(() => {
    const savedTasks = localStorage.getItem("my-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks on change
  useEffect(() => {
    // Save tasks whenever they change
    if (tasks.length > 0) {
      localStorage.setItem("my-tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("my-tasks");
    }
  }, [tasks]); // Run whenever 'tasks' changes

  // ========== TASK OPERATIONS ==========
  const addTask = () => {
    if (taskText.trim() === "") return; // Don't add empty tasks

    const newTask: Task = {
      // Create a new task object
      id: Date.now(),
      title: taskText,
      completed: false,
    };

    setTasks([newTask, ...tasks]); // Add to the beginning of the array
    setTaskText(""); // Clear the input
  };

  // Filter tasks based on search AND filter
  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    // Filter by search query
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    // Task passes all filters
    return true;
  });

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id); // Remember which task we're editing
    setEditingText(task.title); // Pre-fill input with current text
  };

  const saveEdit = () => {
    if (editingText.trim() === "") {
      // Don't save if empty
      alert("Task cannot be empty!");
      return;
    }

    // Update the task with new text
    setTasks(
      tasks.map(
        (task) =>
          task.id === editingId
            ? { ...task, title: editingText } // Update this task
            : task // Keep others unchanged
      )
    );

    // Clear edit state
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null); // Stop editing
    setEditingText(""); // Clear the text
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // ========== STATISTICS ==========
  const totalCount = tasks.length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  // ========== RENDER ==========
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ========== HEADER ========== */}
        <Header />

        {/* ========== ADD TASK SECTION ========== */}
        <TaskInput
          taskText={taskText}
          setTaskText={setTaskText}
          addTask={addTask}
        />

        {/* ========== SEARCH SECTION ========== */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          {/* Search Bar */}
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* ========== STATISTICS CARDS ========== */}
        <Statistics
          totalCount={totalCount}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        {/* ========== FILTER BUTTONS SECTION ========== */}
        <FilterButtons filter={filter} setFilter={setFilter} />

        {/* ========== TASK LIST CONTAINER ========== */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 overflow-hidden mt-4">
          {filteredTasks.length === 0 ? (
            // Show this if no tasks
            <div className="p-8 text-center text-gray-500">
              {searchQuery ? (
                <p className="text-xl">No tasks found for "{searchQuery}"</p>
              ) : (
                <p className="text-xl">No tasks yet!</p>
              )}
            </div>
          ) : (
            // Show this if tasks exist
            <ul className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
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
                        {task.completed && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </button>
                      {/* Task text */}
                      <p
                        className={`text-lg  flex -1 ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
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
              ))}
            </ul>
          )}
        </div>

        {/* ========== CLEAR COMPLETED BUTTON ========== */}
        <div className="mt-4 text-center">
          {completedCount > 0 && ( // Check if any tasks are marked as completed
            <button
              onClick={clearCompleted}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all font-medium"
            >
              clear {completedCount} completed{" "}
              {completedCount === 1 ? "task" : "tasks"}
            </button>
          )}
        </div>

        {/* ========== FOOTER ========== */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Built with Next.js + TypeScript 🚀</p>
        </footer>
      </div>
    </div>
  );
}
