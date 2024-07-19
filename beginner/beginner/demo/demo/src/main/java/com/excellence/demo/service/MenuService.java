package com.excellence.demo.service;

import com.excellence.demo.model.ExampleMenu;
import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    private final MenuRepository repository;

    public List<ExampleMenu> getAllMenu() {
        List<ExampleMenu> menus = repository.getAllMenu();
        return menus;
    }

    public void createMenu(ExampleMenu menu) {
        repository.insertMenu(menu);
    }

    public ExampleMenu getMenuById(int id) {
        return repository.getMenu(id);
    }

    public void updateMenu(ExampleMenu menu) {
        repository.updateMenu(menu);
    }

    public void deleteMenu(int id) {
        repository.deleteMenu(id);
    }

    public MenuService(MenuRepository repository) {
        this.repository = repository;
    }
}