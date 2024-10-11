package com.example.demo.controller.todo.request;

import com.example.demo.model.TodoModel;
import com.example.demo.model.ValidateResult;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TodoRequest {
    public final Integer user_id;
    public final String content;
    public final String due_date;
    public final Timestamp created_at;
    public final Timestamp updated_at;

    public ValidateResult validate() {
        LocalDate Current = LocalDate.now();

        if(LocalDate.parse(due_date).isBefore(Current))
            return ValidateResult.failed("due_date can't be in the past");
        
        return ValidateResult.success();
    }

    public TodoModel toTodoModel() {
        return toTodoModel(0);
    }

    public TodoModel toTodoModel(int id) {
        DateTimeFormatter formatdue = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate formatterdue = LocalDate.parse(due_date, formatdue);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime createdDateTime = created_at.toLocalDateTime();
        LocalDateTime updatedDateTime = updated_at.toLocalDateTime();

        return new TodoModel(id, user_id, content, formatterdue, createdDateTime, updatedDateTime);
    }

    public TodoRequest() {
        this.user_id = null;
        this.content = null;
        this.due_date = null;
        this.created_at = null;
        this.updated_at = null;
    }
}
