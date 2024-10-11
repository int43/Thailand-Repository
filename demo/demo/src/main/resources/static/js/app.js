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
            <button type="button" id="editbtn" onclick="editTodo(${todo.id})">Edit</button>
            <button type="button" id="deletebtn" onclick="handleDeleteTodo(${todo.id})">Delete</button>
            </td>
        </tr>
        `;
        todos.appendChild(todoDiv);
    });
}


// เรียกใช้ข้อมูล user_id
async function fetchUsers(defaultUserId) {
    try {
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) {
            throw new Error("Could not fetch users");
        }
        const data = await response.json(); // แปลง response เป็น json เก็บไว้ในตัวแปร data
        const users = data.users; // ดึงข้อมูล users จาก data เก็บไว้ในตัวแปร users

        // ตรวจสอบ users เป็น array ไหม
        if (!Array.isArray(users)) {
            throw new Error("Fetched data is not an array");
        }

        const dropdown = document.getElementById('userDropdown');
        dropdown.innerHTML = ''; // Clear ข้อมูลใน dropdown เพื่อดูข้อมูลใหม่

        // ใช้ foreach เพื่อวนลูปแต่ละ users สร้าง option ของแต่ละ user_id
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.user_id;
            option.textContent = user.user_id; // ใช้ user.user_id แสดงข้อมูล user_id
            dropdown.appendChild(option);   // เอา option ที่สร้างขึ้นไปยัง dropdown
        });

        // ตั้งค่า default ของ user_id
        if (defaultUserId) {
            dropdown.value  = defaultUserId; // แสดง default user_id ใน dropdown
        }
    } catch (error) {
        console.error('Error fetching users:', error); //แสดงข้อมูลเกี่ยวกับ error ว่ามีอะไรผิดพลาด
        const dropdown = document.getElementById('userDropdown');
        dropdown.innerHTML = '<option value="">Error loading users</option>'; // clear เนื้อหาภายใน dropdown และเพิ่ม <option> ใหม่ที่แสดงข้อความ error, value="" หมายความว่าไม่มีค่าที่ถูกต้องใน dropdown ในกรณีนี้
    }
}


// เพิ่มข้อมูลเข้า database
async function handleRegisterTodo(event) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const todo = {
        id: formData.get("id"),
        user_id: formData.get("user_id"),
        content: formData.get("content"),
        due_date: formData.get("due_date"),
        created_at: new Date().toISOString(), 
        updated_at: new Date().toISOString(),  
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
    fetchTodo();
    await fetchUsers(todo.user_id);
}


// ดึงข้อมูลโดย Todo id
async function takeTodo(id) {
    const response = await fetch(`http://localhost:8080/todo/${id}`);
    if (!response.ok) {
        throw new Error("Could not fetch todo");
    }
    return await response.json();
}

async function editTodo(id) {
    const todo = await takeTodo(id);
    const todoDiv = document.getElementById("todo-modal-component");
    todoDiv.innerHTML = `
    <form>
        <div> todo : ${todo.id}</div><br>

        <label for="user_id">User ID </label>
        <select name="user_id" id="userDropdown">
            <option value="${todo.user_id}">Select User</option>
        </select><br>

        <br><label for="content">Content</label><br>
        <input type="text" name="content" value="${todo.content}"/>
        <label for="due_date">Due_date</label>
        <input type="date" name="due_date" value="${todo.due_date}"/>
        <button type="submit" onclick="handleUpdateTodo(event, ${todo.id})">Update</button>
    </form>
    `;
    document.getElementById("myModal").style.display = "block";
    await fetchUsers(todo.user_id);
}

async function handleUpdateTodo(event, id) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const todo = {
        user_id: formData.get("user_id"),
        content: formData.get("content"),
        due_date: formData.get("due_date"),
        created_at: new Date(formData.get("created_at")).toISOString(), 
        updated_at: new Date().toISOString(), 
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