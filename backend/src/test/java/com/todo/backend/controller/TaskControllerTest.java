package com.todo.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.backend.model.Task;
import com.todo.backend.service.TaskService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void addTask_shouldReturnSavedTask() throws Exception {
        Task task = new Task(null, "Test Task", "Test Desc", false, null);
        Task savedTask = new Task(1L, "Test Task", "Test Desc", false, null);

        Mockito.when(taskService.saveTask(any(Task.class))).thenReturn(savedTask);

        mockMvc.perform(post("/api/tasks/addtask")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Task"));
    }

    @Test
    void getTasks_shouldReturnTaskList() throws Exception {
        List<Task> tasks = List.of(
                new Task(1L, "Task 1", "Desc 1", false, null),
                new Task(2L, "Task 2", "Desc 2", false, null)
        );

        Mockito.when(taskService.getRecentTasks()).thenReturn(tasks);

        mockMvc.perform(get("/api/tasks/getall"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Task 1"));
    }

    @Test
    void markTaskAsDone_shouldReturnNoContent() throws Exception {
        Mockito.doNothing().when(taskService).markAsDone(eq(1L));

        mockMvc.perform(put("/api/tasks/1/done"))
                .andExpect(status().isNoContent());
    }
}
