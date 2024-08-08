/* package is used to determine the file location. */
package com.excellence.demo.controller.order;

/* import is used for importing code from other files. So that the code is divided and stored in separate files. */
import com.excellence.demo.controller.order.request.ExampleOrderRequest;
import com.excellence.demo.controller.order.response.OrdersResponse;
import com.excellence.demo.model.ExampleOrder;
import com.excellence.demo.model.ValidateResult;
import com.excellence.demo.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/* Used List to adding, deleting, getting data from a specified location, etc., and it can expand or reduce freely according to the data that is added or removed. */
import java.util.List;

/* 
@RestController is an annotation in the Spring Framework that defines a class as a Controller that controls the operation of HTTP requests and responses.
@RequestMapping("/orders") Use the URL path for the method to handle incoming requests. In this case, it's the path "/orders".
define a class "OrderController" that handles HTTP requests for paths that start with “/orders”.
declares a variable call "service" of type OrderService. 
    In the "private" means that this variable can only be accessed within the class in which it is declared, and 
    "final" means that the value of this variable can't be changed after the initial configuration has been received.
*/
@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService service;

    /*
    @GetMapping(produces = “application/json”): This command is used to determine of this method will respond to an HTTP GET request and will send out the data in json format.
        produces = "application/json" means that the server sends a value back in the form of JSON, which is a data format used for structured data exchange. 
        JSON is the standard for information exchange or Data Interchange Format. JSON is especially popular in APIs.
    @ResponseStatus(HttpStatus.OK): This command is used to determine the HTTP status to be returned to the API caller.
        HttpStatus.OK means that the request was successful and the data has been sent back.
        API is the medium act as an interface between the client and the server. In the exchange of information and interconnection between applications.
    declare method "getAll()" sent value back to OrderResponse
    use the method "getAllOrder()" from service to get all of the order list and keep it in the variables "orders".
    create the new OrderResponse variable call "response" by use the orders from list.
    returns the response of OrderResponse.
    */
    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public OrdersResponse getAll() {
        List<ExampleOrder> orders = service.getAllOrder();
        OrdersResponse response = new OrdersResponse(orders);
        return response;
    }
    /*
    @PostMapping(produces = "application/json") is an annotation in the Spring Framework that is used to define a method handler to receive POST requests and produce responses in json format.
        produces = "application/json" means that the server sends a value back in the form of JSON, which is a data format used for structured data exchange. 
        Structured data exchange refers to the exchange of data that is managed in an orderly format to make it easier to use. Typically used in computer systems and databases for efficient and accurate data communication.
    @ResponseStatus(HttpStatus.CREATED): This command is used to determine the HTTP response status to created.
        HttpStatus.CREATED means that the the creation of a new resource is successful.
    declare method "create" that get parameter "request"
    public void create(@RequestBody ExampleOrderRequest request) declare method "create" that doesn't return any value (void) and takes one parameter (request). 
        The parameter is an object of type "ExampleOrderRequest" and is annotated with "@RequestBody", which this method is likely used in Spring Framework, to handle HTTP POST requests where the body of the request is mapped to the "ExampleOrderRequest" object.
        This method would be responsible for creating something, possibly an order, based on the data provided in the request body. Which order data received in JSON format.
    */
    @PostMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody ExampleOrderRequest request) {
        ValidateResult validate = request.validate();
        if (!validate.ok()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, validate.errorMessage());
        }
        service.createOrder(request.toExampleOrder());
    }

    @GetMapping(value = "/{orderId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ExampleOrder get(@PathVariable int orderId) {
        return service.getOrderById(orderId);
    }

    @PutMapping(value = "/{orderId}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void update(@PathVariable int orderId,@RequestBody ExampleOrderRequest request) {
        ValidateResult validate = request.validate();
        if (!validate.ok()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, validate.errorMessage());
        }
        service.updateOrder(request.toExampleOrder(orderId));
    }

    @DeleteMapping(value = "/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int orderId) {
        service.deleteOrder(orderId);
    }


    public OrderController(OrderService service) {
        this.service = service;
    }
}