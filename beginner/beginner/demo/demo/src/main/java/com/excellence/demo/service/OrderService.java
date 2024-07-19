package com.excellence.demo.service;

import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public List<ExampleOrder> getAllOrder() {
        List<ExampleOrder> orders = orderRepository.getAllOrder();
        return orders;
    }

    public void createOrder(ExampleOrder order) {
        orderRepository.insertOrder(order);
    }

    public ExampleOrder getOrderById(int orderId) {
        return orderRepository.getOrder(orderId);
    }

    public void updateOrder(ExampleOrder order) {
        orderRepository.updateOrder(order);
    }

    public void deleteOrder(int orderId) {
        orderRepository.deleteOrder(orderId);
    }

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
}