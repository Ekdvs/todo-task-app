package com.todo.backend.serviceimpl;

import com.todo.backend.model.Task;
import com.todo.backend.repository.TaskRepository;
import com.todo.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task saveTask(Task task) {
        task.setCompleted(false);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getRecentTasks() {
        return taskRepository.findTop5ByCompletedFalseOrderByIdDesc();
    }

    @Override
    public void markAsDone(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(true);
        taskRepository.save(task);
    }
}

