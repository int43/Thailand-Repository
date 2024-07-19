package com.excellence.demo.datasource;

import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.model.OrderStatus;

import java.time.LocalDate;

public class ExampleOrderEntity {
    final int id;
    final int itemId;
    final String name;
    final int amount;
    final OrderStatus orderStatus;
    final LocalDate orderDate;

    public static ExampleOrderEntity of(ExampleOrder order) {
        return new ExampleOrderEntity(
                order.id(),
                order.itemId(),
                order.name(),
                order.amount(),
                order.orderStatus(),
                order.orderDate()
        );
    }

    public ExampleOrderEntity(int id, int itemId, String name, int amount, OrderStatus orderStatus, LocalDate orderDate) {
        this.id = id;
        this.itemId = itemId;
        this.name = name;
        this.amount = amount;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
    }
}