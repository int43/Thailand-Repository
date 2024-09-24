package com.example.demo.datasource;

import com.example.demo.model.TodoModel;
import com.example.demo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@Repository
public class TodoDatasource implements TodoRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<TodoModel> getAllTodo() {
        String sql = "SELECT * FROM Todo";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream()
            .map(record -> toModel(record))
            .collect(toList());
    }

    @Override
    public void insertTodo(TodoModel todo) {
        TodoDatasourceEntity entity = TodoDatasourceEntity.of(todo);
        String sql = "INSERT INTO Todo(user_id, content, due_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(
            sql,
            entity.user_id,
            entity.content,
            entity.due_date,
            entity.created_at,
            entity.updated_at);
    }

    @Override
    public void updateTodo(TodoModel todo) {
        TodoDatasourceEntity entity = TodoDatasourceEntity.of(todo);
        String sql = "UPDATE Todo SET user_id = ?, content = ?, due_date = ?, created_at = ?, updated_at = ? WHERE id = ?";
        jdbcTemplate.update(
            sql,
            entity.user_id,
            entity.content,
            entity.due_date,
            entity.created_at,
            entity.updated_at,
            entity.id
        );
    }

    @Override
    public TodoModel getTodo(int id) {
        String sql = "SELECT * FROM Todo WHERE id = ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, id);
        if (records.isEmpty()) return TodoModel.empty();
        return toModel(records.get(0));
    }

    @Override
    public void deleteTodo(int id) {
        String sql = "DELETE FROM Todo WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private TodoModel toModel(Map<String, Object> record) {
        Date due_date = (Date) record.get("due_date");
        Date created_at = (Date) record.get("created_at");
        Date updated_at = (Date) record.get("updated_at");
        return new TodoModel(
            (int) record.get("id"),
            (int) record.get("user_id"),
            (String) record.get("content"),
            due_date.toLocalDate(),
            created_at.toLocalDate(),
            updated_at.toLocalDate()
        );
    }
}