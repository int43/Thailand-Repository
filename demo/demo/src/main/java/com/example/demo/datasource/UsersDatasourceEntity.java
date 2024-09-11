package com.example.demo.datasource;

import com.example.demo.model.UsersModel;

/*
สร้าง object ใหม่โดยเอา input จาก UsersModel 
*/
public class UsersDatasourceEntity {
    final int user_id;
    final String username;
    final String password;

    public static UsersDatasourceEntity of(UsersModel user) {
        return new UsersDatasourceEntity(
            user.user_id(),
            user.username(),
            user.password()
        );
    }

    public UsersDatasourceEntity(int user_id,String username, String password) {
        this.user_id  = user_id;
        this.username = username;
        this.password = password;
    }
}
