package com.example.demo.controller.todo.request;

import com.example.demo.model.TodoModel;
import com.example.demo.model.ValidateResult;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class TodoRequest {
    public final Integer user_id;
    public final String content;
    public final String due_date;
    public final String created_at;
    public final String updated_at;

    public ValidateResult validate() {
        if(LocalDate.parse(due_date).isBefore(LocalDate.now()))
            return ValidateResult.failed("due_date can't be in the past");

        if(Instant.parse(created_at).isBefore(Instant.now()))
            return ValidateResult.failed("created_at can't be in the past");

        if(Instant.parse(updated_at).isBefore(Instant.now()))
            return ValidateResult.failed("updated_at can't be in the past");
        
        return ValidateResult.success();
    }

    public TodoModel toTodoModel() {
        return toTodoModel(0);
    }

    public TodoModel toTodoModel(int id) {
        DateTimeFormatter formatdue = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate formatterdue = LocalDate.parse(due_date, formatdue);

        Instant formattercreated = Instant.parse(created_at);
        Instant formatterupdated = Instant.parse(updated_at);
        
        return new TodoModel(id, user_id, content, formatterdue, formattercreated, formatterupdated);
    }

    public TodoRequest() {
        this.user_id = null;
        this.content = null;
        this.due_date = null;
        this.created_at = null;
        this.updated_at = null;
    }
}
