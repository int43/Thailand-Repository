package com.example.demo.repository;

import com.example.demo.model.TodoModel;

import java.util.List;

public interface TodoRepository {
    List<TodoModel> getAllTodo();

    void insertTodo(TodoModel Todo);

    void updateTodo(TodoModel Todo);

    TodoModel getTodo(int id);

    void deleteTodo(int id);
}

