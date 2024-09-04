package com.example.demo.repository;

import com.example.demo.model.UsersModel;

import java.util.List;

//ใช้ interface เพื่อกำหนดค่าหลักๆ โดยจะถูก class ที่สืบทอดไปเขียนแยกการทำงานอีกที
public interface UsersRepository {
    List<UsersModel> getAllUsers();

    void insertUser(UsersModel user);
}

