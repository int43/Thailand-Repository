package com.example.demo.datasource;

import com.example.demo.model.UsersModel;

/*
สร้าง object ใหม่โดยเอา input จาก UsersModel 
*/
public class UsersDatasourceEntity {
    final int id;
    final String username;
    final String password;

    public static UsersDatasourceEntity of(UsersModel user) {
        return new UsersDatasourceEntity(
            user.id(),
            user.username(),
            user.password()
        );
    }

    public UsersDatasourceEntity(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
