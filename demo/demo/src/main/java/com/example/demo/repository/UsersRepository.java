package com.example.demo.repository;

import com.example.demo.model.UsersModel;

import java.util.List;

/*
ใช้ interface เพื่อกำหนดค่าหลักๆ โดยจะถูก class ที่สืบทอดไปเขียนแยกการทำงานอีกที 
(รับผู้ใช้ทั้งหมดและแทรกผู้ใช้ใหม่ เหมือนกับพิมพ์เขียวสําหรับการสร้างคลาสที่จัดการข้อมูลผู้ใช้)
*/
public interface UsersRepository {
    List<UsersModel> getAllUsers();

    void insertUser(UsersModel user);
}

