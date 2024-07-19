package com.excellence.demo.controller.menu;

import com.excellence.demo.controller.menu.request.ExampleMenuRequest;
import com.excellence.demo.controller.menu.response.MenusResponse;
import com.excellence.demo.controller.order.request.ExampleOrderRequest;
import com.excellence.demo.model.ExampleMenu;
import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.model.ValidateResult;
import com.excellence.demo.service.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/menus")
public class MenuController {
    private final MenuService service;

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public MenusResponse getAll() {
        List<ExampleMenu> menus = service.getAllMenu();
        MenusResponse response = new MenusResponse(menus);
        return response;
    }

    @PostMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody ExampleMenuRequest request) {
        ValidateResult validate = request.validate();
        if(!validate.ok()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, validate.errorMessage());
        }
        service.createMenu(request.toExampleMenu());
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ExampleMenu get(@PathVariable int id) {
        return service.getMenuById(id);
    }

    @PutMapping(value = "/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable int id,@RequestBody ExampleMenuRequest request) {
        ValidateResult validate = request.validate();
        if(!validate.ok()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, validate.errorMessage());
        }
        service.updateMenu(request.toExampleMenu(id));
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        service.deleteMenu(id);
    }

    public MenuController(MenuService service) {
        this.service = service;
    }
}