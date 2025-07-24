import React from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks, markDone }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks available.</p>;
  }

  return (
    <div className="task-section">
      <h2>Task List</h2>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} markDone={markDone} />
      ))}
    </div>
  );
}

export default TaskList;
