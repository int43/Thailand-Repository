package com.example.demo.service;

import com.example.demo.model.UsersModel;
import com.example.demo.repository.UsersRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service    //ใช้บอกให้ Spring รู้ว่า class นั้นเป็น "Service"
public class UsersService {
    private final UsersRepository usersRepository;

    public List<UsersModel> getAllUsers() {
        List<UsersModel> users = usersRepository.getAllUsers();
        return users;
    }

    public void createUser(UsersModel user) {
        usersRepository.insertUser(user);
    }

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
}
