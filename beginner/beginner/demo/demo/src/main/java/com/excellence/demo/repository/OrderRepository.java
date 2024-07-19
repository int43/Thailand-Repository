package com.excellence.demo.repository;

import com.excellence.demo.model.ExampleOrder;

import java.util.List;

public interface OrderRepository {
    List<ExampleOrder> getAllOrder();

    void insertOrder(ExampleOrder order);

    void updateOrder(ExampleOrder order);

    ExampleOrder getOrder(int id);

    void deleteOrder(int id);
}