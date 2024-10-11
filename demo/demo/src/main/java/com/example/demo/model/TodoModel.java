package com.example.demo.model;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TodoModel {
    public final int id;
    public final int user_id;
    public final String content;
    public final LocalDate due_date;
    public final Timestamp created_at;
    public final Timestamp updated_at;

    public int id() {
        return id;
    }

    public int user_id() {
        return user_id;
    }

    public String content() {
        return content;
    }

    public LocalDate due_date() {
        return due_date;
    }

    public Timestamp created_at() {
        return created_at;
    }

    public Timestamp updated_at() {
        return updated_at;
    }

    public static TodoModel empty() {
        return new TodoModel(0, 0, "", LocalDate.now(), LocalDateTime.now(), LocalDateTime.now());
    }

    public TodoModel(int id, int user_id, String content, LocalDate due_date, LocalDateTime created_at, LocalDateTime updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.content = content;
        this.due_date = due_date;
        this.created_at = Timestamp.valueOf(created_at);
        this.updated_at = Timestamp.valueOf(updated_at);
    }
}
