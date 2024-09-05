package com.example.demo.model;

/*
สร้างและจัดการข้อมูลเกี่ยวกับ ID user password
*/
public class UsersModel {
    public final int id;
    public final String username;
    public final String password;

    public int id() {
        return id;
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

    public UsersModel(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
