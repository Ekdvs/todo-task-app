import React from 'react';

function TaskCard({ task, markDone }) {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button className="btn done-btn" onClick={() => markDone(task.id)}>
        Mark as Done
      </button>
    </div>
  );
}

export default TaskCard;
