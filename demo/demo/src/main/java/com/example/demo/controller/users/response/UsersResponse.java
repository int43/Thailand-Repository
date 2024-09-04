package com.example.demo.controller.users.response;

import com.example.demo.model.UsersModel;

import java.util.List;

public class UsersResponse {
    public List<UsersModel> users;

    public UsersResponse(List<UsersModel> users) {
        this.users = users;
    }
}
