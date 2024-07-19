package com.excellence.demo.controller.order.response;

import com.excellence.demo.model.ExampleOrder;

import java.util.List;

public class OrdersResponse {
    public List<ExampleOrder> orders;

    public OrdersResponse(List<ExampleOrder> orders) {
        this.orders = orders;
    }
}