package com.example.demo.controller.users.request;

import com.example.demo.model.UsersModel;
import com.example.demo.model.ValidateResult;

/*
จัดการข้อมูล user เมื่อลงทะเบียนหรือเข้าสู่ระบบโดยตรวจสอบ input
*/
public class UsersRequest {
    public final String username;
    public final String password;

    public ValidateResult validate() {
        if (username == "") return ValidateResult.failed("username can't be empty");
        if (password == "") return ValidateResult.failed("password can't be empty");

        return ValidateResult.success();
    }

    public UsersModel toUsersModel() {
        return toUsersModel(0);
    }

    public UsersModel toUsersModel(int user_id) {
        return new UsersModel(user_id, username, password);
    }

    public UsersRequest() {
        this.username = null;
        this.password = null;
    }
}
