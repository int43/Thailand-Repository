package com.example.demo.datasource;

import com.example.demo.model.TodoModel;

import java.sql.Timestamp;
import java.time.LocalDate;

public class TodoDatasourceEntity {
    final int id;
    final int user_id;
    final String content;
    final LocalDate due_date;
    final Timestamp created_at;
    final Timestamp updated_at;

    public static TodoDatasourceEntity of(TodoModel todo) {
        return new TodoDatasourceEntity(
            todo.id(),
            todo.user_id(),
            todo.content(),
            todo.due_date(),
            todo.created_at(),
            todo.updated_at()
        );
    }

    public TodoDatasourceEntity(int id, int user_id, String content, LocalDate due_date, Timestamp created_at, Timestamp updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.content = content;
        this.due_date = due_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
