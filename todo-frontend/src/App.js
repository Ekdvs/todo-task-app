import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = "http://localhost:8080/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getall`);
      setTasks(res.data);
    } catch (error) {
      setErrorMsg("Failed to fetch tasks. Please try again.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setErrorMsg("Title is required.");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/addtask`, form);
      setForm({ title: '', description: '' });
      fetchTasks();
      setSuccessMsg("Task added successfully!");
      setErrorMsg('');
    } catch (error) {
      setErrorMsg("Error adding task. Please try again.");
    }
  };

  const markDone = async (id) => {
    try {
      await axios.put(`${BASE_URL}/${id}/done`);
      fetchTasks();
    } catch (error) {
      setErrorMsg("Failed to mark task as done.");
    }
  };

  const dismissMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2>Add a Task</h2>

        {errorMsg && <div className="error-msg" onClick={dismissMessages}>{errorMsg}</div>}
        {successMsg && <div className="success-msg" onClick={dismissMessages}>{successMsg}</div>}

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="input"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="textarea"
        />
        <button
          onClick={handleAdd}
          disabled={!form.title.trim()}
          className="btn"
        >
          Add Task
        </button>
      </div>

      <div className="task-section">
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks available.</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <button className="btn done-btn" onClick={() => markDone(task.id)}>
                Mark as Done
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
