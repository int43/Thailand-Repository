/* 
    addEventListener executes to set event "DOMContentLoaded" and set function fetchOrders().
    DOM or Document Object Model is connecting HTML and JavaScript.
*/
document.addEventListener("DOMContentLoaded", fetchOrders());

/*  
    asyn is the command that can executed the next line immediately.
    run function fetchorders() that wait the adding orders from "http://localhost:8080/orders".
    If the order not ok it will get error message "Could not fetch orders".
    waiting to call orders.json() and the console display ordersJson.
    set to use the function renderOrders(ordersJson);.
*/
async function fetchOrders() {
    const orders = await fetch("http://localhost:8080/orders");
    if (!orders.ok) {
        throw new Error("Could not fetch orders");
    }
    const ordersJson = await orders.json();
    console.log(ordersJson);
    renderOrders(ordersJson);
}

/*
    run function renderOrders(ordersJson) that get orders from order-list.
    If not the orders it will get error message "Could not find orders element".
    innerHTML of orderDiv created table include table head(<th>) and each order.
    for each row column (<tr>,<td>) show the data of orders and have button click Edit and Delete.
    ${} is instead the value to string. 
    orders.appendChild(orderDiv); is the order that adding will show with the order before.
        .appendChild() is the method that make an element to another element like new child element/data to the parent element.
*/
function renderOrders(ordersJson) {
    const orders = document.getElementById("order-list");
    if (!orders) {
        throw new Error("Could not find orders element");
    }
    orders.innerHTML = "";
    const orderDiv = document.createElement("table");
    orderDiv.innerHTML =
    "<th>Order ID</th><th>Item Id</th><th>Order Name</th><th>Order Amount</th><th>Order Status</th><th>Order Date</th>";
    ordersJson.orders.forEach((order) => {
        orderDiv.innerHTML += `
        <tr>
            <td>${order.id}</td>
            <td>${order.itemId}</td>
            <td>${order.name}</td>
            <td>${order.amount}</td>
            <td>${order.orderStatus}</td>
            <td>${order.orderDate}</td>
            <td>
            <button onclick="renderOrder(${order.id})">Edit</button>
            <button onclick="handleDeleteOrder(${order.id})">Delete</button>
            </td>
        </tr>
        `;
        orders.appendChild(orderDiv);
    });
}

/*
    run function handleRegisterOrder(event).
    event.preventDefault(); is use to make the browser does not reload or refresh.
    const form = event.target.form; is gets the element's event value sent from the form.
    const formData = new FormData(form); is the new data that fill in the form.
    const order = {} is add the new data into the form (itemId name amount orderStatus orderDate).
*/
async function handleRegisterOrder(event) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const order = {
        itemId: formData.get("itemId"),
        name: formData.get("name"),
        amount: formData.get("amount"),
        orderStatus: formData.get("orderStatus"),
        orderDate: formData.get("orderDate"),
    };

/*
    decalre response to wait loading fetch to get value from "http://localhost:8080/orders".
    method: "POST" is used for creating new data by sending data through the body{} and operation may perform any type of processing. Almost use for create the new data.
    headers: {} is the section that specifies information and rules for connection. 
        "Content-Type": "application/json" is determined the browser reads the data in JSON format (if not, the browser will view it as HTML, resulting in data retrieval errors).
        JSON or Java Script Object Notation is a format for exchanging computer data that allows JavaScript able to exchange information with the Server. The information is in plain text format.
    body:  is the part that specifies the information we want to send to the destination.
        JSON.stringify(order) is converts data of orders into string format.
    If response not ok. It will wait the response.json() to show the error in console.error(show red tab)
    return; is stop execute the function.
    fetchOrders(); is set to use the function fetchOrders();.
*/
    const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
    }

    fetchOrders();
}

/*
    run function fetchOrder(id).
    declare response waiting the fetch(`http://localhost:8080/orders/${id}`) to get value from url by using id.
    If response not ok get the error message "Could not fetch order".
    waiting to return the value of response.json().
        response.json()=change the data that get from json to Javascript object.
*/
async function fetchOrder(id) {
    const response = await fetch(`http://localhost:8080/orders/${id}`);
    if (!response.ok) {
        throw new Error("Could not fetch order");
    }
    return await response.json();
}

/*
    run function renderOrder(id).
    declare order waiting the fetchOrder(id).
    declare orderDiv that get orders from "order-modal-component".
    innerHTML of orderDiv created form from click the Edit button. It includes orderid, Item ID, Name, Amount, orderStatus, orderDate, and button "Update" the order.
    In the page of Edit has to modify Item Item ID, Name, Amount, orderStatus,and orderDate to the value that you want.
    The Edit page show in display style block of get value in id=myModal.
*/
async function renderOrder(id) {
    const order = await fetchOrder(id);
    const orderDiv = document.getElementById("order-modal-component");
    orderDiv.innerHTML = `
    <form>
        <div> order id: ${order.id}</div>
        <label for="itemId">Item ID</label>
        <input type="text" name="itemId" value="${order.itemId}"/>
        <label for="name">Name</label>
        <input type="text" name="name" value="${order.name}"/>
        <label for="amount">Amount</label>
        <input type="number" name="amount" value="${order.amount}"/>
        <label for="orderStatus">orderStatus</label>
        <input type="text" name="orderStatus" value="${order.orderStatus}"/>
        <label for="orderDate">orderDate</label>
        <input type="date" name="orderDate" value="${order.orderDate}"/>
        <button type="submit" onclick="handleUpdateOrder(event, ${order.id})">Update</button>
    </form>
    `;
    document.getElementById("myModal").style.display = "block";
}

/*
    run function handleUpdateOrder(event, id).
    event.preventDefault(); is use to make the browser does not reload or refresh.
    const form = event.target.form; is gets the element's event value sent from the form.
    const formData = new FormData(form); is the new data that fill in the form.
    const order = {} is update the new data into the form (name itemId amount orderStatus orderDate).
*/
async function handleUpdateOrder(event, id) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const order = {
        name: formData.get("name"),
        itemId: formData.get("itemId"),
        amount: formData.get("amount"),
        orderStatus: formData.get("orderStatus"),
        orderDate: formData.get("orderDate"),
    };

/*
    decalre response to wait loading fetch to get value from `http://localhost:8080/orders/${id}`.
    method: "PUT" is used for create or update new data by sending data through the body{} and restricted to create or update operations. Alomost use for update the data in the server.
    headers: {} is the section that specifies information and rules for connection. 
        "Content-Type": "application/json" is determined the browser reads the data in JSON format (if not, the browser will view it as HTML, resulting in data retrieval errors).
        JSON or Java Script Object Notation is a format for exchanging computer data that allows JavaScript able to exchange information with the Server. The information is in plain text format.
    body:  is the part that specifies the information we want to send to the destination.
        JSON.stringify(order) is converts data of orders into string format.
    If response not ok. declare result to wait the response.json() to show the error message in (result.message);
    else response ok waiting the fetchOrders() when update the data in id=myModal the display style is none. 
*/
    const response = await fetch(`http://localhost:8080/orders/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
    } else {
        await fetchOrders();
        document.getElementById("myModal").style.display = "none";
    }
}

/*
    run function handleDeleteOrder(id).
    decalre response to wait loading fetch to get value from `http://localhost:8080/orders/${id}`.
    method: "DELETE" is use for delete the data.
    If response not ok get the error message "Could not delete order".
    waiting to fetchOrders().
*/
async function handleDeleteOrder(id) {
    const response = await fetch(`http://localhost:8080/orders/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Could not delete order");
    }
    await fetchOrders();
}