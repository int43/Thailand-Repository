package com.example.demo.controller.users;

import com.example.demo.model.UsersModel;
import com.example.demo.model.ValidateResult;
import com.example.demo.service.UsersService;
import com.example.demo.controller.users.request.UsersRequest;
import com.example.demo.controller.users.response.UsersResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/*
@RestController: คลาสนี้จะจัดการคําขอ HTTP
@RequestMapping("/users"): ตั้งค่า URL พื้นฐานสําหรับ request ทั้งหมดที่จัดการโดยคอนโทรลเลอร์นี้เป็น /users
*/
@RestController
@RequestMapping("/users")
public class UsersController {
    private final UsersService service;

    //จัดการ Get request เมื่อเข้าถึง /users ระบบจะส่งคืน all users ในรูปแบบ json
    @GetMapping(produces = "application/json")  //สร้าง response ของ json
    @ResponseStatus(HttpStatus.OK)              //ถ้า method ถูกต้องจะแสดง HttpStatus OK
    public UsersResponse getAll() {
        List<UsersModel> users = service.getAllUsers();
        UsersResponse response = new UsersResponse(users);
        return response;
    }

    //จัดการ Post request เพื่อสร้าง user ใหม่ ใช้ json ตรวจสอบความถูกต้อง ถ้าถูกจะสร้าง user ใหม่
    @PostMapping(produces = "application/json") //เกิดจาก Post request และสร้าง json response
    @ResponseStatus(HttpStatus.CREATED)         //ถ้าสร้าง user สำเร็จจะแสดง HTTP status created
    public void create(@RequestBody UsersRequest request) {     //แปลง json เป็น UsersRequest
        ValidateResult validate = request.validate();
        if (!validate.ok()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, validate.errorMessage());
        }
        service.createUser(request.toUsersModel());
    }

    public UsersController(UsersService service) {
        this.service = service;
    }
}
