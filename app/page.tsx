"use client";

import { useEffect, useState } from "react";
import { Task, FilterType } from "./types/task";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import SearchFilter from "./components/SearchFilter";
import Statistics from "./components/Statistics";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import TaskItem from "./components/TaskItem";

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
          <TaskList
            filteredTasks={filteredTasks}
            searchQuery={searchQuery}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            toggleTask={toggleTask}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            deleteTask={deleteTask}
          />
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
