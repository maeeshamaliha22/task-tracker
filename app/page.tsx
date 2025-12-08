"use client";

import { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskTracker() {
  const [taskText, setTaskText] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleAddTask = () => {
    setDisplayText(taskText);
    setTaskText("");
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
          onClick={handleAddTask}
          className="w-full font-bold text-white text-2xl py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {displayText && (
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-lg">✓ {displayText}</p>
        </div>
      )}
    </div>
  );
}
