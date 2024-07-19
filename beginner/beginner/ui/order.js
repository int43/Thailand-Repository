/* 
    addEventListener executes to set event "DOMContentLoaded" and set function fetchOrders().
    DOM is connecting HTML and JavaScript.
*/
document.addEventListener("DOMContentLoaded", fetchOrders());

/*  
    run function fetchorders that wait the adding orders from "http://localhost:8080/orders".
    If the order not ok it will get error message "Could not fetch orders".
    call orders.json and the console display ordersJson.
    run the function renderOrders(ordersJson);.
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
    innerHTML of orders created table include table head(<th>) and each order.
    for each row column (<tr>,<td>) show the data of orders and have button click Edit and Delete.
    orders.appendChild(orderDiv); is the order that adding will show with the order before.
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
    run function handleRegisterOrder
    event.preventDefault(); is use to make the browser does not reload or refresh.
    
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

async function fetchOrder(id) {
    const response = await fetch(`http://localhost:8080/orders/${id}`);
    if (!response.ok) {
        throw new Error("Could not fetch order");
    }
    return await response.json();
}

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

async function handleDeleteOrder(id) {
    const response = await fetch(`http://localhost:8080/orders/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Could not delete order");
    }
    await fetchOrders();
}