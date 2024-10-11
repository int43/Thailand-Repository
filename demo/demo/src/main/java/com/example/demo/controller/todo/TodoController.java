package com.example.demo.controller.todo;

import com.example.demo.model.TodoModel;
import com.example.demo.model.ValidateResult;
import com.example.demo.service.TodoService;
import com.example.demo.controller.todo.request.TodoRequest;
import com.example.demo.controller.todo.response.TodoResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping; 
import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/todo")
public class TodoController {
    private final TodoService service;

    /* ดึงข้อมูล todo */
    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public TodoResponse getAll() {
        List<TodoModel> todos = service.getAllTodo();
        TodoResponse response = new TodoResponse(todos);
        return response;
    }

    /* สร้าง todo */
    @PostMapping(value="/list", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody TodoRequest request) {
        ValidateResult validate = request.validate();
        if(!validate.ok()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, validate.errorMessage());
        }
        service.createTodo(request.toTodoModel());
    }

    /* ดึงข้อมูล todoId */
    @GetMapping(value = "/{todoId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public TodoModel get(@PathVariable int todoId) {
        return service.getTodoById(todoId);
    }

    /* อัพเดท todoId */
    @PutMapping(value = "/{todoId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable int todoId,@RequestBody TodoRequest request) {
        ValidateResult validate = request.validate();
        if(!validate.ok()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, validate.errorMessage());
        }
        TodoModel todo = request.toTodoModel(todoId);

        service.updateTodo(todo);
    }

    /* ลบ todoId */
    @DeleteMapping(value = "/{todoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int todoId) {
        service.deleteTodo(todoId);
    }

    public TodoController(TodoService service) {
        this.service = service;
    }
}
