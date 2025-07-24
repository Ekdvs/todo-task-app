import React from 'react';

function AddTaskForm({ form, setForm, onAdd, errorMsg, successMsg, dismissMessages }) {
  return (
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
        onClick={onAdd}
        disabled={!form.title.trim()}
        className="btn"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTaskForm;
