package com.excellence.demo.datasource;

import com.excellence.demo.model.ExampleMenu;
import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@Repository
public class MenuDatasource implements MenuRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<ExampleMenu> getAllMenu() {
        String sql = "SELECT * FROM Example_menu";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream()
                .map(record -> toModel(record))
                .collect(toList());
    }

    @Override
    public void insertMenu(ExampleMenu menu) {
        ExampleMenuEntity entity = ExampleMenuEntity.of(menu);
        String sql = "INSERT INTO example_menu(name) VALUES (?)";
        jdbcTemplate.update(
                sql,
                entity.name
        );
    }

    @Override
    public void updateMenu(ExampleMenu menu) {
        ExampleMenuEntity entity = ExampleMenuEntity.of(menu);
        String sql = "UPDATE example_menu SET name = ? WHERE id = ?";
        jdbcTemplate.update(
                sql,
                entity.name,
                entity.id
        );
    }

    @Override
    public ExampleMenu getMenu(int id) {
        String sql = "SELECT * FROM example_menu WHERE id = ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, id);
        if (records.isEmpty()) return ExampleMenu.empty();
        return toModel(records.get(0));
    }

    @Override
    public void deleteMenu(int id) {
        String sql = "DELETE FROM example_menu WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    private ExampleMenu toModel(Map<String, Object> record) {
        return new ExampleMenu(
                (int) record.get("id"),
                (String) record.get("name")
        );
    }
}