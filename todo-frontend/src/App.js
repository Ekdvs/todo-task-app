import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
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
      <AddTaskForm
        form={form}
        setForm={setForm}
        onAdd={handleAdd}
        errorMsg={errorMsg}
        successMsg={successMsg}
        dismissMessages={dismissMessages}
      />
      <TaskList tasks={tasks} markDone={markDone} />
    </div>
  );
}

export default App;
