package com.todo.backend.service;

import com.todo.backend.model.Task;

import java.util.List;

public interface TaskService {
    Task saveTask(Task task);
    List<Task> getRecentTasks();
    void markAsDone(Long id);
    List<Task> getIncompleteTasks();
}

