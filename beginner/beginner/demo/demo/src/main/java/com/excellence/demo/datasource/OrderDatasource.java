//package is used to determine the file location.
package com.excellence.demo.datasource;

//import is used for importing code from other files. So that the code is divided and stored in separate files.
import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.model.OrderStatus;
import com.excellence.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/*
import java.sql.Date;   Imports the Date class from the java.sql package, which is used for handling dates in SQL statements.
import java.util.List;  Imports the List interface from the java.util package, which is used to work with lists of objects.
import java.util.Map;   Imports the Map interface from the java.util package, which represents mappings between keys and values.
By importing these, you can use the Date, List, and Map in your Java class without needing to specify their full package paths.
*/
import java.sql.Date;
import java.util.List;
import java.util.Map;

/*
java.util.stream.Collectors provides various methods to collect stream elements into different collections like lists, sets, maps, etc 
toList() is a static method in the Collectors class. It returns a Collector that accumulates the input elements into a new List.
*/
import static java.util.stream.Collectors.toList;

/*
@Repository is used to designate the class "OrderDatasource" allowing it to be used with other components.
declare "OrderDatasource" which use implements interface called "OrderRepository"
*/
@Repository
public class OrderDatasource implements OrderRepository {
    
    /*
    @Autowired used to auto-wire the JdbcTemplate bean into the class where this code is defined.
    declare "jdbcTemplate" of "JdbcTemplate"
        JdbcTemplate: A class provided by the Spring Framework that simplifies JDBC operations.
        jdbcTemplate: This variable will hold an instance of JdbcTemplate that you can use to perform database operations like querying and updating data.
    */
    @Autowired
    JdbcTemplate jdbcTemplate;

    /*
    @Override use to declare the method below. It works instead of a method that looks the same in the class that invokes this method.
    declare "getAllOrder()" to get all datas from List<ExampleOrder>
    declare "sql" query to select all columns from the example_order table.
    List<Map<String, Object>> records = jdbcTemplate.queryForList(sql); declare list name "records" by each set of data can store two values, namely string and object, 
        and let records get the value from the database using the JdbcTemplate class, call the queryForList method to get the list value<Maps> using the SQL command from the sql string.
    records.stream() : Turns the list of records into a stream.
        .map(record -> toModel(record)) : Converts each record into a model using the "toModel" method.
        .collect(toList()) : Collects all the models into a list and returns it.
    */
    @Override
    public List<ExampleOrder> getAllOrder() {
        String sql = "SELECT * FROM example_order";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream()
                .map(record -> toModel(record))
                .collect(toList());
    }

    /*
    @Override use to declare the method below. It works instead of a method that looks the same in the class that invokes this method.
    declare "insertOrder()" use parameter "order" of "ExampleOrder"
    declare "entity" into ExampleOrderEntity that converts the order object into an ExampleOrderEntity object.
    Defines the sql to insert a new row into the example_order table.
    Runs the SQL query with the values from the entity object to insert the new order into the database.
    */
    @Override
    public void insertOrder(ExampleOrder order) {
        ExampleOrderEntity entity = ExampleOrderEntity.of(order);
        String sql = "INSERT INTO example_order(item_id, name, amount, order_status, order_date) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                entity.itemId,
                entity.name,
                entity.amount,
                entity.orderStatus.name(),
                entity.orderDate);
    }

    /*
    @Override use to declare the method below. It works instead of a method that looks the same in the class that invokes this method.
    declare "updateOrder()" use parameter "order" of "ExampleOrder"
    declare "entity" into ExampleOrderEntity that converts the order object into an ExampleOrderEntity object.
    defines the sql to update a new row into the example_order table.
    runs the SQL query with the values from the entity object to update the order into the database.
    */
    @Override
    public void updateOrder(ExampleOrder order) {
        ExampleOrderEntity entity = ExampleOrderEntity.of(order);
        String sql = "UPDATE example_order SET item_id = ?,name = ?, amount = ?, order_status = ?, order_date = ? WHERE id = ?";
        jdbcTemplate.update(
                sql,
                entity.itemId,
                entity.name,
                entity.amount,
                entity.orderStatus.name(),
                entity.orderDate,
                entity.id
        );
    }

    /*
    @Override use to declare the method below. It works instead of a method that looks the same in the class that invokes this method.
    declare "getOrder()" to get the data from ExampleOrder by use parameter int id.  
    defines a SQL query that selects all columns from the example_order table where the id column matches the provided id.
    The jdbcTemplate is used to execute the SQL query. It replaces the ? in the SQL with the provided id and returns a list of maps, where each map represents a row from the result set.
    If the query result is empty (meaning no record was found with that id), it returns an empty ExampleOrder object.
    If there is at least one record, it takes the first one (since id should be unique, there should only be one) and converts it into an ExampleOrder object using the toModel method.
    */
    @Override
    public ExampleOrder getOrder(int id) {
        String sql = "SELECT * FROM example_order WHERE id = ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, id);
        if (records.isEmpty()) return ExampleOrder.empty();
        return toModel(records.get(0));
    }

    /*
    @Override use to declare the method below. It works instead of a method that looks the same in the class that invokes this method.
    declare "deleteOrder()" use parameter "(int id)"
    defines the sql to delete a data from the example_order table where the id matches the provided parameter.
    Runs the SQL query the ? in the query is replaced by the value of id instance of JdbcTemplate.
    */
    @Override
    public void deleteOrder(int id) {
        String sql = "DELETE FROM example_order WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    /*
    declare "toModel" that use parameter "record" which is map two values, namely string and object, to convert the record into "ExampleOrder".
    declare "date" that get the data from "record" which associated with key "order_date" to a "Date" type.
    return instance of ExampleOrder class.
        send the "record" value with the key "id" to int.
        send the "record" value with the key "item_id" to int.
        send the "record" value with the key "name" to string.
        send the "record" value with the key "amount" to int.
        send the value with the key "order_status" to string and convert it to the enum value of "OrderStatus"
        convert "Date" to "LocalDate".
    */
    private ExampleOrder toModel(Map<String, Object> record) {
        Date date = (Date) record.get("order_date");
        return new ExampleOrder(
                (int) record.get("id"),
                (int) record.get("item_id"),
                (String) record.get("name"),
                (int) record.get("amount"),
                OrderStatus.valueOf((String) record.get("order_status")),
                date.toLocalDate()
        );
    }
}