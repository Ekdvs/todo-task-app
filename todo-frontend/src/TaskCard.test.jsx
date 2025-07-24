import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';

describe('TaskCard', () => {
  const mockMarkDone = jest.fn();

  const task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders task title and description', () => {
    render(<TaskCard task={task} markDone={mockMarkDone} />);

    expect(screen.getByText(/test task/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  test('calls markDone with correct id on button click', () => {
    render(<TaskCard task={task} markDone={mockMarkDone} />);

    fireEvent.click(screen.getByRole('button', { name: /mark as done/i }));

    expect(mockMarkDone).toHaveBeenCalledWith(1);
  });
});
