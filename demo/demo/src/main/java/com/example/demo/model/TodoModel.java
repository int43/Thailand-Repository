package com.example.demo.model;

import java.time.Instant;
import java.time.LocalDate;

public class TodoModel {
    public final int id;
    public final int user_id;
    public final String content;
    public final LocalDate due_date;
    public final Instant created_at;
    public final Instant updated_at;

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

    public Instant created_at() {
        return created_at;
    }

    public Instant updated_at() {
        return updated_at;
    }

    public static TodoModel empty() {
        return new TodoModel(0, 0, "", LocalDate.now(), Instant.now(), Instant.now());
    }

    public TodoModel(int id, int user_id, String content, LocalDate due_date, Instant created_at, Instant updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.content = content;
        this.due_date = due_date;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
