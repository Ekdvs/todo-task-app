import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskForm from './AddTaskForm';

describe('AddTaskForm', () => {
  const mockSetForm = jest.fn();
  const mockOnAdd = jest.fn();
  const mockDismiss = jest.fn();

  const defaultForm = { title: '', description: '' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input, textarea, and button', () => {
    render(
      <AddTaskForm
        form={defaultForm}
        setForm={mockSetForm}
        onAdd={mockOnAdd}
        errorMsg=""
        successMsg=""
        dismissMessages={mockDismiss}
      />
    );

    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('button is disabled when title is empty', () => {
    render(
      <AddTaskForm
        form={defaultForm}
        setForm={mockSetForm}
        onAdd={mockOnAdd}
        errorMsg=""
        successMsg=""
        dismissMessages={mockDismiss}
      />
    );

    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).toBeDisabled();
  });

  test('calls setForm on title input change', () => {
    render(
      <AddTaskForm
        form={defaultForm}
        setForm={mockSetForm}
        onAdd={mockOnAdd}
        errorMsg=""
        successMsg=""
        dismissMessages={mockDismiss}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'New Task' } });
    expect(mockSetForm).toHaveBeenCalledWith({ ...defaultForm, title: 'New Task' });
  });

  test('calls setForm on description input change', () => {
    render(
      <AddTaskForm
        form={defaultForm}
        setForm={mockSetForm}
        onAdd={mockOnAdd}
        errorMsg=""
        successMsg=""
        dismissMessages={mockDismiss}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Some desc' } });
    expect(mockSetForm).toHaveBeenCalledWith({ ...defaultForm, description: 'Some desc' });
  });

  test('calls onAdd when button is clicked and enabled', () => {
    const filledForm = { title: 'Task', description: '' };

    render(
      <AddTaskForm
        form={filledForm}
        setForm={mockSetForm}
        onAdd={mockOnAdd}
        errorMsg=""
        successMsg=""
        dismissMessages={mockDismiss}
      />
    );

    const button = screen.getByRole('button', { name: /add task/i });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
    expect(mockOnAdd).toHaveBeenCalled();
  });

  test('shows error message and calls dismiss on click', () => {
    render(
      <AddTaskForm
        form={defaultForm}
        setForm={mockSetForm}
        onAdd={mockOnAdd}
        errorMsg="Error occurred"
        successMsg=""
        dismissMessages={mockDismiss}
      />
    );

    const errorMsg = screen.getByText(/error occurred/i);
    expect(errorMsg).toBeInTheDocument();

    fireEvent.click(errorMsg);
    expect(mockDismiss).toHaveBeenCalled();
  });

  test('shows success message and calls dismiss on click', () => {
    render(
      <AddTaskForm
        form={defaultForm}
        setForm={mockSetForm}
        onAdd={mockOnAdd}
        errorMsg=""
        successMsg="Success!"
        dismissMessages={mockDismiss}
      />
    );

    const successMsg = screen.getByText(/success!/i);
    expect(successMsg).toBeInTheDocument();

    fireEvent.click(successMsg);
    expect(mockDismiss).toHaveBeenCalled();
  });
});
