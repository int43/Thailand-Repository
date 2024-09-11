package com.example.demo.model;

/*
สร้างและจัดการข้อมูลเกี่ยวกับ ID user password
*/
public class UsersModel {
    public final int user_id;
    public final String username;
    public final String password;

    public int user_id() {
        return user_id;
    }

    public String username() {
        return username;
    }

    public String password() {
        return password;
    }

    public static UsersModel empty() {
        return new UsersModel(0, "", "");
    }

    public UsersModel(int user_id, String username, String password) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
    }
}
