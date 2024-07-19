package com.excellence.demo.repository;

import com.excellence.demo.model.ExampleMenu;
import com.excellence.demo.model.ExampleOrder;

import java.util.List;

public interface MenuRepository {
    List<ExampleMenu> getAllMenu();

    void insertMenu(ExampleMenu menu);

    void updateMenu(ExampleMenu menu);

    ExampleMenu getMenu(int id);

    void deleteMenu(int id);
}