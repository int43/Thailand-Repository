//คำสั่ง $(document).ready เมื่อ load หน้าเสร็จจะเรียกใช้ฟังก์ชัน showUser(username),fetchTodo()
$(document).ready( function (){
    showUser();
    fetchTodo();
});

function LogoutUser(event) {
    event.preventDefault();
    if(confirm("Do you want to logout?")) {
        console.log("You press OK!");
        localStorage.removeItem("loggedInUser"); 
        setTimeout(function(){
            location.href = "./login.html"
        }, 1050)
    } else {
        console.log("You press Cancel!"); 
    }
}

function showUser() {
    //ดึงค่า "loggedInUser" จาก localStorage
    const username = localStorage.getItem("loggedInUser");
    if (username) {
        document.getElementById("usernameDisplay").textContent = `Username : ${username}`;
    } else {
        console.error("No user is logged in");
    }
}

function addtask() {
    //ค้นหา class "close" และเพิ่มการทำงานฟังก์ชันโดยการ "click" แล้วจะค้นหา class "pop-up" และแสดงผลหน้าจอแบบ none
    document.querySelector(".close").addEventListener("click",function(){
        document.querySelector(".pop-up").style.display = "none";
    })
    document.getElementById("post-it").addEventListener("click",function(){
        document.querySelector(".pop-up").style.display = "flex";
    })
    document.querySelector(".submitbtn").addEventListener("click",function(){
        document.querySelector(".pop-up").style.display = "none";
    })
}
  
async function fetchTodo() {
    const todos = await fetch("http://localhost:8080/todo");
    if (!todos.ok) {
        throw new Error("Could not fetch todos");
    }
    const todosJson = await todos.json();
    console.log(todosJson);
    renderTodo(todosJson);
}

function renderTodo(todosJson) {
    const todos = document.getElementById("todo-list");
    if (!todos) {
        throw new Error("Could not find todos element");
    }
    todos.innerHTML = "";
    const todoDiv = document.createElement("table");
    todoDiv.innerHTML =
    "<th>ID</th><th>User_Id</th><th>Content</th><th>Due_date</th><th>created_at</th><th>updated_at</th>";
    todosJson.todos.forEach((todo) => {
        todoDiv.innerHTML += `
        <tr>
            <td>${todo.id}</td>
            <td>${todo.user_id}</td>
            <td>${todo.content}</td>
            <td>${todo.due_date}</td>
            <td>${todo.created_at}</td>
            <td>${todo.updated_at}</td>
            <td>
            <button id="editbtn" onclick="renderTodo(${todo.id})">Edit</button>
            <button id="deletebtn" onclick="handleDeleteTodo(${todo.id})">Delete</button>
            </td>
        </tr>
        `;
        todos.appendChild(todoDiv);
    });
}

/*async function handleRegisterTodo(event) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const todo = {
        user_id: formData.get("user_id"),
        content: formData.get("content"),
        due_date: formData.get("due_date"),
        created_at: formData.get("created_at"),
        updated_at: formData.get("updated_at"),
    };
    console.log(todo);
    const response = await fetch("http://localhost:8080/todo/list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
    }
}*/

async function fetchTodo(id) {
    const response = await fetch(`http://localhost:8080/todo/${id}`);
    if (!response.ok) {
        throw new Error("Could not fetch todo");
    }
    return await response.json();
}

async function renderTodo(id) {
    const todo = await fetchTodo(id);
    const todoDiv = document.getElementById("todo-modal-component");
    todoDiv.innerHTML = `
    <form>
        <div> todo id: ${todo.id}</div>
        <label for="user_id">User_id</label>
        <input type="number" name="user_id" value="${todo.user_id}"/>
        <label for="content">Name</label>
        <input type="text" name="content" value="${todo.content}"/>
        <label for="due_date">Due_date</label>
        <input type="date" name="due_date" value="${todo.due_date}"/>
        <label for="created_at">Created_at</label>
        <input type="date" name="created_at" value="${todo.created_at}"/>
        <label for="updated_at">Updated_at</label>
        <input type="date" name="updated_at" value="${todo.updated_at}"/>
        <button type="submit" onclick="handleUpdateTodo(event, ${todo.id})">Update</button>
    </form>
    `;
    document.getElementById("myModal").style.display = "block";
}

/*async function handleUpdateTodo(event, id) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const todo = {
        user_id: formData.get("user_id"),
        content: formData.get("content"),
        due_date: formData.get("due_date"),
        created_at: formData.get("created_at"),
        updated_at: formData.get("updated_at"),
    };

    const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
    } else {
        await fetchOrders();
        document.getElementById("myModal").style.display = "none";
    }
}*/

/*async function handleDeleteTodo(id) {
    const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Could not delete todo");
    }
    await fetchTodo();
}*/