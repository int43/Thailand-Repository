package com.excellence.demo.controller.order.request;

import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.model.OrderStatus;
import com.excellence.demo.model.ValidateResult;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class ExampleOrderRequest {
    public final Integer itemId;
    public final String name;
    public final Integer amount;
    public final String orderStatus;
    public final String orderDate;

    public ValidateResult validate() {
        if (itemId < 1) return ValidateResult.failed("itemId can't be less than 1");

        if (name.equals("")) return ValidateResult.failed("name can't be empty");

        if (amount < 1) return ValidateResult.failed("amount can't be less than 1");

        if (!OrderStatus.validOf(orderStatus))
            return ValidateResult.failed("orderStatus: PENDING, COMPLETED, CANCELLED are only allowed");

        if(LocalDate.parse(orderDate).isBefore(LocalDate.now()))
            return ValidateResult.failed("orderDate can't be in the past");

        return ValidateResult.success();
    }

    public ExampleOrder toExampleOrder() {
        return toExampleOrder(0);
    }

    public ExampleOrder toExampleOrder(int id) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate formattedDate = LocalDate.parse(orderDate, formatter);
        return new ExampleOrder(id, itemId, name, amount, OrderStatus.valueOf(orderStatus), formattedDate);
    }

    public ExampleOrderRequest() {
        this.itemId = null;
        this.name = null;
        this.amount = null;
        this.orderStatus = null;
        this.orderDate = null;
    }
}