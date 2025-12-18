"use client";

import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskTracker() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // Load tasks when app first loads
  useEffect(() => {
    const savedTasks = localStorage.getItem("my-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks whenever they change
    if (tasks.length > 0) {
      localStorage.setItem("my-tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("my-tasks");
    }
  }, [tasks]); // Run whenever 'tasks' changes

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
  const filteredtasks = tasks.filter((task) => {
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

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-100 bg-blue-400 m-auto mb-2">
        Task Tracker
      </h1>

      <div>
        <input
          type="text"
          value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value);
          }}
          placeholder="Enter your task..."
          className="w-full px-4 py-2 border-2 border-gray-300 rounded mb-2"
        />

        <button
          onClick={addTask}
          className="w-full font-bold text-white text-2xl py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search tasks..."
          className="w-full mt-4 px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-7 text-gray-400 hover:text-gray-600"
          >
            x
          </button>
        )}
      </div>

      {/* Adding task count */}
      <div className="flex gap-2 mt-4 mb-4">
        <div className="bg-blue-100 px-4 py-2 rounded">
          <span className="font-bold text-blue-800">{tasks.length}</span>
          <span className="text-blue-600 ml-2">Total</span>
        </div>

        <div className="bg-orange-100 px-4 py-2 rounded">
          <span className="font-bold text-orange-800">
            {tasks.filter((t) => !t.completed).length}
          </span>
          <span className="text-orange-600 ml-2">Active</span>
        </div>

        <div className="bg-green-100 px-4 py-2 rounded">
          <span className="font-bold text-green-800">
            {tasks.filter((t) => t.completed).length}
          </span>
          <span className="text-green-600 ml-2">Done</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mt-4 mb-4">
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

      {/* Task List Container */}
      <div className="bg-white rounded-md shadow-md overflow-hidden mt-4">
        {filteredtasks.length === 0 ? (
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
            {filteredtasks.map((task) => (
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
      {/* Clear Completed Button */}
      <div>
        {tasks.filter((t) => t.completed).length > 0 && ( // Check if any tasks are marked as completed
          <button
            onClick={() => setTasks(tasks.filter((t) => !t.completed))}
            className="mt-4 text-red-500 hover:text-red-700 text-sm"
          >
            clear {tasks.filter((t) => t.completed).length} completed tasks
          </button>
        )}
      </div>
    </div>
  );
}
