/* package is used to determine the file location. */
package com.excellence.demo.service;

/* import is used for importing code from other files. So that the code is divided and stored in separate files. */
import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.repository.OrderRepository;
import org.springframework.stereotype.Service;

/* Used List to adding, deleting, getting data from a specified location, etc., and it can expand or reduce freely according to the data that is added or removed. */
import java.util.List;

/*
@Service is used to designate the class "OrderService" allowing it to be used with other components.
declare "orderRepository" in type of "orderRepository". 
    This pattern is commonly used in dependency injection, where an instance of OrderRepository is passed to the OrderService when it’s created, allowing OrderService to use the functionality provided by OrderRepository.
*/
@Service
public class OrderService {
    private final OrderRepository orderRepository;

    //declare "getAllOrder()" to get all orders from "orderRepository" that return "List<ExampleOrder>".
    //declare "orders" of "List<ExampleOrder>" to get all order from the "getAllOrder()" of "orderRepository" and return the value of "orders".
    public List<ExampleOrder> getAllOrder() {
        List<ExampleOrder> orders = orderRepository.getAllOrder();
        return orders;
    }

    //declare "createOrder" that takes order of "ExampleOrder" as a parameter and calls the "insertOrder(order)" on "orderRepository".
    public void createOrder(ExampleOrder order) {
        orderRepository.insertOrder(order);
    }

    //declare "getOrderById" use parameter "(int orderId)"
    //In the "getOrderById" method, "getOrder(orderId)" of "orderRepository" is get and return the value of order by "orderId".
    public ExampleOrder getOrderById(int orderId) {
        return orderRepository.getOrder(orderId);
    }

    //declare "updateOrder" use parameter "(ExampleOrder order)" to update new data that provide in the order of "updateOrder(order)" on "orderRepository".
    public void updateOrder(ExampleOrder order) {
        orderRepository.updateOrder(order);
    }

    //declare "deleteOrder" use parameter "(int orderId)" to delete the data that provide in the order by use "orderId" on "orderRepository".
    public void deleteOrder(int orderId) {
        orderRepository.deleteOrder(orderId);
    }

    //declare class "OrderService" use parameter "OrderRepository" of "OrderRepository"
    //this.orderRepository = orderRepository; assign the value parameter of "OrderRepository" to variable "OrderRepository" of class "OrderService".
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
}