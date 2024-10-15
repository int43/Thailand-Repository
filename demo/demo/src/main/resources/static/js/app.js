// แสดงข้อมูลจาก database
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
    "<th>Task ID</th><th>Due_date</th><th>Task Description</th><th>Registration Date</th>";
    todosJson.todos.forEach((todo) => {
        todoDiv.innerHTML += `
        <tr>
            <td>${todo.id}</td>
            <td id="duedate" onclick="editDueDate(${todo.id})">${todo.due_date}</td>
            <td id="content" onclick="editContent(${todo.id})">${todo.content}</td>
            <td>${todo.created_at}</td>
            <td>
            <button type="button" id="deletebtn" onclick="handleDeleteTodo(${todo.id})">Delete</button>
            </td>
        </tr>
        `;
        todos.appendChild(todoDiv);
    });
}


// เพิ่มข้อมูลเข้า database
async function handleRegisterTodo(event) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const todo = {
        user_id: localStorage.getItem("loggedInUserId"),
        content: formData.get("content"),
        due_date: formData.get("due_date"),
        created_at: new Date().toISOString(), 
        updated_at: new Date().toISOString(),  
    };
    console.log(todo)
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
    await fetchTodo();
}


// ดึงข้อมูลโดย Todo id
async function takeTodo(id) {
    const response = await fetch(`http://localhost:8080/todo/${id}`);
    if (!response.ok) {
        throw new Error("Could not fetch todo");
    }
    return await response.json();
}

// ส่วนของ edit เอาข้อมูลโดยใช้ id
async function editContent(id) {
    const todo = await takeTodo(id);
    const todoDiv = document.getElementById("todo-modal-component");
    todoDiv.innerHTML = `
    <form>
        <div> todo : ${todo.id}</div><br>
        <br><label for="content">Task Description</label><br>
        <textarea type="text" name="content" value="${todo.content}"/></textarea><br>
        <button type="submit" onclick="handleUpdateTodo(event, ${todo.id})">Update</button>
    </form>
    `;
    document.getElementById("myModal").style.display = "block";
}

async function editDueDate(id) {
    const todo = await takeTodo(id);
    const todoDiv = document.getElementById("todo-modal-component");
    todoDiv.innerHTML = `
    <form>
        <div> todo : ${todo.id}</div><br>
        <label for="due_date">Due_date</label>
        <input type="date" name="due_date" value="${todo.due_date}"/>
        <button type="submit" onclick="handleUpdateTodo(event, ${todo.id})">Update</button>
    </form>
    `;
    document.getElementById("myModal").style.display = "block";
}

async function handleUpdateTodo(event, id) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const todo = {
        user_id: localStorage.getItem("loggedInUserId"),
        content: formData.get("content"),
        due_date: formData.get("due_date"),
        created_at: new Date(formData.get("created_at")).toISOString(), 
        updated_at: new Date().toISOString(), 
    };
    console.log(todo)
    const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    if (!response.ok) {
        const result = await response.json();
        console.error("Error:", result);
        throw new Error(result.message);
    } else {
        await fetchTodo(); 
        document.getElementById("myModal").style.display = "none";
    }
}


/*async function handleDeleteTodo(id) {
    const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Could not delete todo");
    }
    await fetchTodo();
}*/