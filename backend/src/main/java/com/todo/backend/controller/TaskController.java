package com.todo.backend.controller;

import com.todo.backend.model.Task;
import com.todo.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3002")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/addtask")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.saveTask(task));
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Task>> getTasks() {
        return ResponseEntity.ok(taskService.getRecentTasks());
    }

    @PutMapping("/{id}/done")
    public ResponseEntity<Void> markTaskAsDone(@PathVariable Long id) {
        taskService.markAsDone(id);
        return ResponseEntity.noContent().build();
    }
}

