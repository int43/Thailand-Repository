package com.example.demo.service;

import com.example.demo.model.TodoModel;
import com.example.demo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    
    public List<TodoModel> getAllTodo() {
        List<TodoModel> todos = todoRepository.getAllTodo();
        return todos;
    }

    public void createTodo(TodoModel todo) {
        todoRepository.insertTodo(todo);
    }

    public TodoModel getTodoById(int todoId) {
        return todoRepository.getTodo(todoId);
    }

    public void updateTodo(TodoModel todo) {
        todoRepository.updateTodo(todo);
    }

    public void deleteTodo(int todoId) {
        todoRepository.deleteTodo(todoId);
    }

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
}
