package com.example.demo.controller.todo.request;

import com.example.demo.model.TodoModel;
import com.example.demo.model.ValidateResult;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class TodoRequest {
    public final Integer userId;
    public final String content;
    public final String due_date;
    public final String created_at;
    public final String updated_at;

    public ValidateResult validate() {
        if(LocalDate.parse(due_date).isBefore(LocalDate.now()))
            return ValidateResult.failed("due_date can't be in the past");

        if(LocalDate.parse(created_at).isBefore(LocalDate.now()))
            return ValidateResult.failed("created_at can't be in the past");

        if(LocalDate.parse(updated_at).isBefore(LocalDate.now()))
            return ValidateResult.failed("updated_at can't be in the past");
        
        return ValidateResult.success();
    }

    public TodoModel toTodoModel() {
        return toTodoModel(0);
    }

    public TodoModel toTodoModel(int id) {
        DateTimeFormatter formatdue = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate formatterdue = LocalDate.parse(due_date, formatdue);

        DateTimeFormatter formatcreated = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate formattercreated = LocalDate.parse(created_at, formatcreated);

        DateTimeFormatter formatupdated = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate formatterupdated = LocalDate.parse(updated_at, formatupdated);
        
        return  TodoModel(id, userId, content, formatterdue, formattercreated, formatterupdated);
    }

    public TodoRequest() {
        this.userId = null;
        this.content = null;
        this.formatterdue_date = null;
        this.formattercreated_at = null;
        this.formatterupdated_at = null;
    }
}
