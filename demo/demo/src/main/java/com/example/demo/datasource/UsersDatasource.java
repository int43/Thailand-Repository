package com.example.demo.datasource;

import com.example.demo.model.UsersModel;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

/*
    @Repository เป็นคลาสที่จัดการกับการเข้าถึงข้อมูล
    @Autowired  คือการบอก Spring ให้ช่วยหาสิ่งที่เราต้องการมาใส่ให้เราอัตโนมัติ (เช่น ถ้าเรามีคลาส A ที่ต้องการใช้คลาส B เราแค่ใส่ @Autowired ไว้ที่คลาส A แล้ว Spring จะเอาคลาส B มาใส่ให้เอง)
    @Override   คือการบอกว่าเรากำลังเขียนฟังก์ชันที่มีอยู่แล้วในคลาสแม่หรืออินเตอร์เฟซใหม่ (ช่วยให้โค้ดอ่านง่ายขึ้นและช่วยป้องกันข้อผิดพลาดในการพิมพ์ชื่อเมธอดผิด)
    ดำเนินการฐานข้อมูล users เช่น การดึงข้อมูล all users และ new user
*/
@Repository
public class UsersDatasource implements UsersRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;  //เชื่อมกับฐานข้อมูล

    @Override   //ดึงข้อมูลทั้งหมด
    public List<UsersModel> getAllUsers() {
        String sql = "SELECT * FROM users";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream()
                .map(record -> toModel(record))
                .collect(toList());
    }

    @Override   //เพิ่มข้อมูลใหม่
    public void insertUser(UsersModel user) {
        UsersDatasourceEntity entity = UsersDatasourceEntity.of(user);
        String sql = "INSERT INTO users(user_id, username, password) VALUES (?, ?, ?)";
        jdbcTemplate.update(
                sql,
                entity.user_id,
                entity.username,
                entity.password);
    }

    //แปลงข้อมูลจาก Map<String, Object> ให้เป็น UsersModel โดยดึงค่าจาก Map และแปลงเป็นชนิดข้อมูลที่ถูกต้องก่อนที่จะสร้าง UsersModel ใหม่
    private UsersModel toModel(Map<String, Object> record) {
        return new UsersModel(
                (int) record.get("id"),
                (int) record.get("user_id"),
                (String) record.get("username"),
                (String) record.get("password")
        );
    }

}