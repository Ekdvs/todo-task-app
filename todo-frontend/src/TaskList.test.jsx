import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

const sampleTasks = [
  { id: 1, title: 'Task 1', description: 'Desc 1' },
  { id: 2, title: 'Task 2', description: 'Desc 2' },
];

describe('TaskList', () => {
  const mockMarkDone = jest.fn();

  test('renders no tasks message when tasks array is empty', () => {
    render(<TaskList tasks={[]} markDone={mockMarkDone} />);
    expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
  });

  test('renders list of TaskCard components when tasks exist', () => {
    render(<TaskList tasks={sampleTasks} markDone={mockMarkDone} />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Desc 2')).toBeInTheDocument();
  });
});
