package com.example.demo.controller.todo.response;

import com.example.demo.model.TodoModel;

import java.util.List;

public class TodoResponse {
    public List<TodoModel> todos;
    
    public TodoResponse(List<TodoModel> todos) {
        this.todos = todos;
    }
}
