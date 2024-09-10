package com.example.demo.controller.users.request;

import com.example.demo.model.UsersModel;
import com.example.demo.model.ValidateResult;

/*
จัดการข้อมูล user เมื่อลงทะเบียนหรือเข้าสู่ระบบโดยตรวจสอบ input
*/
public class UsersRequest {
    public final int user_id;
    public final String username;
    public final String password;

    public ValidateResult validate() {
        if (username == "") return ValidateResult.failed("username can't be empty");
        if (password == "") return ValidateResult.failed("password can't be empty");

        return ValidateResult.success();
    }

    public UsersModel toUsersModel() {
        return toUsersModel(0, 0);
    }

    public UsersModel toUsersModel(int id,int user_id) {
        return new UsersModel(id, user_id, username, password);
    }

    public UsersRequest() {
        this.user_id  = 0;
        this.username = null;
        this.password = null;
    }
}
