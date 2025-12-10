"use client";

import { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskTracker() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

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

      {/* Task List Container */}
      <div className="bg-white rounded-md shadow-md overflow-hidden mt-4">
        {tasks.length === 0 ? (
          // Show this if no tasks
          <div className="p-8 text-center text-gray-500">
            <p className="text-xl">No tasks yet!</p>
            <p className="text-sm mt-2">Add your first task above</p>
          </div>
        ) : (
          // Show this if tasks exist
          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <p className="text-lg">{task.title}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
