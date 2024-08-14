//package is used to determine the file location.
package com.excellence.demo.repository;

//import is used for importing code from other files. So that the code is divided and stored in separate files.
import com.excellence.demo.model.ExampleOrder;

//Used List to adding, deleting, getting data from a specified location, etc., and it can expand or reduce freely according to the data that is added or removed.
import java.util.List;

/*
declare "OrderRepository", which interface class (Define a function (Method) without need for a step within the Method.)
    get a list of all order on "ExampleOrder"
    insert a new order of "ExampleOrder"
    update the order of "ExampleOrder"
    get a data of "ExampleOrder" by id
    delete the order of "ExampleOrder" by id
*/
public interface OrderRepository {
    List<ExampleOrder> getAllOrder();

    void insertOrder(ExampleOrder order);

    void updateOrder(ExampleOrder order);

    ExampleOrder getOrder(int id);

    void deleteOrder(int id);
}