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

    //declare "getAllOrder()" to get all orders from an "orderRepository".
    //The "getAllOrder()" method of the "orderRepository" returns orders (a list of "ExampleOrder"), which is returned orders by the "getAllOrder()" method of "OrderService" class.
    public List<ExampleOrder> getAllOrder() {
        List<ExampleOrder> orders = orderRepository.getAllOrder();
        return orders;
    }

    //declare "createOrder" that takes order of "ExampleOrder" as a parameter and calls the "insertOrder" method on an order named "orderRepository", passing the "ExampleOrder" to order.
    public void createOrder(ExampleOrder order) {
        orderRepository.insertOrder(order);
    }

    //
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