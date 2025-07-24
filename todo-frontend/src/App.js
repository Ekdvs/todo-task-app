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
      console.error("Error fetching tasks:", error);
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
      console.error("Error adding task:", error);
    }
  };

  const markDone = async (id) => {
    try {
      await axios.put(`${BASE_URL}/${id}/done`);
      fetchTasks();
    } catch (error) {
      setErrorMsg("Failed to mark task as done.");
      console.error("Error marking task as done:", error);
    }
  };

  const dismissMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formSection}>
        <h2>Add a Task</h2>

        {errorMsg && <div style={styles.errorMsg} onClick={dismissMessages}>{errorMsg}</div>}
        {successMsg && <div style={styles.successMsg} onClick={dismissMessages}>{successMsg}</div>}

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={styles.textarea}
        />
        <button
          onClick={handleAdd}
          disabled={!form.title.trim()}
          style={{ ...styles.button, backgroundColor: form.title.trim() ? '#007bff' : '#aaa' }}
        >
          Add
        </button>
      </div>

      <div style={styles.taskList}>
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p style={{ color: '#777' }}>No tasks available.</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} style={styles.taskCard}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <button onClick={() => markDone(task.id)} style={styles.doneBtn}>
                Mark as Done
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    padding: '40px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  formSection: {
    flex: 1,
    paddingRight: '40px'
  },
  taskList: {
    flex: 1,
    paddingLeft: '40px',
    borderLeft: '2px solid #ddd'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    height: '80px',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px'
  },
  taskCard: {
    background: '#ffffff',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  doneBtn: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  errorMsg: {
    backgroundColor: '#ffdddd',
    color: '#d8000c',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer'
  },
  successMsg: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    cursor: 'pointer'
  }
};

export default App;
