//package is used to determine the file location.
package com.excellence.demo.controller.order.request;

//import is used for importing code from other files. So that the code is divided and stored in separate files.
import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.model.OrderStatus;
import com.excellence.demo.model.ValidateResult;

/*
import java.time.LocalDate; Imports the LocalDate class from the java.time package, represents a date without time and timezone information.
import java.time.format.DateTimeFormatter;  Imports the LocalDate class from the java.time package, used for formatting and parsing dates and times in a locale-sensitive manner.
import java.util.Date;      Imports the Date class from the java.util package, represents a specific instant in time, with millisecond precision.
*/
import java.time.LocalDate; 
import java.time.format.DateTimeFormatter;
import java.util.Date;

/*
declare class "ExampleOrderRequest"
    declare "itemId" in "Integer" that the value of this variable can't be changed after the initial configuration has been received.
    declare "name" in "String" that the value of this variable can't be changed after the initial configuration has been received.
    declare "amount" in "Integer" that the value of this variable can't be changed after the initial configuration has been received.
    declare "orderStatus" in "String" that the value of this variable can't be changed after the initial configuration has been received.
    declare "orderDate" in "String" that the value of this variable can't be changed after the initial configuration has been received.
*/
public class ExampleOrderRequest {
    public final Integer itemId;
    public final String name;
    public final Integer amount;
    public final String orderStatus;
    public final String orderDate;

    /*
    declare "validate()" when implemented, would perform some sort of validation process and return a "ValidateResult".
    if "itemId < 1", ValidateResult will return the response fail with the message "itemId can't be less than 1"
    if "name" is empty(""), ValidateResult will return the response fail with the message ""name can't be empty""
    if "amount < 1", ValidateResult will return the response fail with the message "amount can't be less than 1"
    if "orderStatus" isn't valid, ValidateResult will return the response fail with the message "orderStatus: PENDING, COMPLETED, CANCELLED are only allowed"
    if "orderDate" is in the past, ValidateResult will return the response fail with the message "orderDate can't be in the past"

    */
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