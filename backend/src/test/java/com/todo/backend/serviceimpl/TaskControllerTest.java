package com.todo.backend.serviceimpl;

import com.todo.backend.model.Task;
import com.todo.backend.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceImplTest {

    @InjectMocks
    private TaskServiceImpl taskService;

    @Mock
    private TaskRepository taskRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveTask_shouldSetCompletedFalseAndSave() {
        Task task = new Task();
        task.setTitle("Test Task");

        when(taskRepository.save(any(Task.class))).thenAnswer(i -> i.getArgument(0));

        Task savedTask = taskService.saveTask(task);

        assertFalse(savedTask.isCompleted());
        assertEquals("Test Task", savedTask.getTitle());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void getRecentTasks_shouldReturnTasks() {
        List<Task> tasks = List.of(
                new Task(1L, "Task 1", "Desc 1", false, null),
                new Task(2L, "Task 2", "Desc 2", false, null)
        );

        when(taskRepository.findTop5ByCompletedFalseOrderByIdDesc()).thenReturn(tasks);

        List<Task> result = taskService.getRecentTasks();

        assertEquals(2, result.size());
        verify(taskRepository, times(1)).findTop5ByCompletedFalseOrderByIdDesc();
    }

    @Test
    void markAsDone_shouldSetCompletedTrue() {
        Task task = new Task(1L, "Task 1", "Desc", false, null);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenAnswer(i -> i.getArgument(0));

        taskService.markAsDone(1L);

        assertTrue(task.isCompleted());
        verify(taskRepository).save(task);
    }

    @Test
    void markAsDone_shouldThrowExceptionIfTaskNotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            taskService.markAsDone(1L);
        });

        assertEquals("Task not found", exception.getMessage());
    }
}
