import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todo-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    const date = new Date().toLocaleString();
    setTasks([...tasks, { text: newTask, completed: false, created: date }]);
    setNewTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>📝 My To-Do List</h1>
      <p className="date">{new Date().toDateString()}</p>

      <div className="input-area">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What do you need to do?"
        />
        <button onClick={addTask}>➕</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <div className="task-count">
        Total Tasks: {tasks.length} | Showing: {filteredTasks.length}
      </div>

      <ul className="task-list">
        {filteredTasks.map((task, idx) => (
          <li
            key={idx}
            className={`task-card ${task.completed ? "completed" : ""}`}
          >
            <div>
              <span className="task-text">{task.text}</span>
              <div className="task-time">{task.created}</div>
            </div>
            <div>
              <button onClick={() => toggleTask(idx)} title="Mark as Done">✔️</button>
              <button onClick={() => deleteTask(idx)} title="Delete Task">❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


