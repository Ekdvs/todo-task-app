package com.todo.backend.service;

import com.todo.backend.model.Task;
import com.todo.backend.repository.TaskRepository;
import com.todo.backend.serviceimpl.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @Test
    void testSaveTask() {
        Task task = new Task(null, "Title", "Desc", false, LocalDateTime.now());
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task savedTask = taskService.saveTask(task);
        assertEquals("Title", savedTask.getTitle());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testGetIncompleteTasks() {
        List<Task> tasks = List.of(new Task(1L, "A", "B", false, LocalDateTime.now()));
        when(taskRepository.findByCompletedFalse()).thenReturn(tasks);

        List<Task> result = taskService.getIncompleteTasks();
        assertEquals(1, result.size());
    }
}
