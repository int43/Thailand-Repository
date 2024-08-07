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

/* Used List to adding, deleting, retrieving data from a specified location, etc., and it can expand or reduce freely according to the data that is added or removed. */
import java.util.List;

/* 
@RestController is an annotation in the Spring Framework that defines a class as a Controller that controls the operation of HTTP requests and responses.
@RequestMapping("/orders") Use the URL path for the method to handle incoming requests. In this case, it's the path "/orders".
define a class OrderController that handles HTTP requests for paths that start with “/orders”.
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
        produces = "application/json" tells Spring that the result of this method will be json.
    @ResponseStatus(HttpStatus.OK): This command is used to determine the HTTP status to be returned to the API caller.
        HttpStatus.OK means that the request was successful and the data has been sent back.
    */
    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public OrdersResponse getAll() {
        List<ExampleOrder> orders = service.getAllOrder();
        OrdersResponse response = new OrdersResponse(orders);
        return response;
    }

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