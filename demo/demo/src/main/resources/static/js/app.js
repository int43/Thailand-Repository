// แสดงข้อมูลจาก database
async function fetchTodo() {
    const userId = localStorage.getItem("loggedInUserId");
    console.log(userId);
    if (!userId) {
        console.error("No user ID found.");
        return;
    }
    const response = await fetch("http://localhost:8080/todo");
    if (!response.ok) {
        throw new Error("Could not fetch todos");
    }
    const todosJson = await response.json();
    const filteredTodos = todosJson.todos.filter(todo => todo.user_id.toString() === userId);
    console.log(filteredTodos);
    renderTodo(filteredTodos);
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
    todosJson.forEach((todo) => {
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
    const userId = localStorage.getItem("loggedInUserId");
    const form = event.target.form;
    const formData = new FormData(form);
    const todo = {
        user_id: userId,
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
        // กำหนดข้อความเตือนที่ต้องการแสดง
        let alertMessage = " Due_Date can't be in the past ";
    
        // คุณสามารถตรวจสอบรหัสสถานะหรือเนื้อหาจาก error เพื่อปรับข้อความที่จะแสดง
        if (error.code) {
            alertMessage += `Error: ${error.code}`;
        }
        alert(alertMessage); // แสดงข้อความเตือน
            return;
        }
    else {
        await fetchTodo();
    }
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
async function editDueDate(id) {
    const todo = await takeTodo(id);
    const todoDiv = document.getElementById("todo-modal-component");
    todoDiv.innerHTML = `
    <form id="editduedate" style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <div style="font-weight: bold; margin-top: 30px; margin-bottom: 45px;">Todo ID: ${todo.id}</div>
        <label for="due_date" style="display: block; margin-bottom: 25px;">Due Date</label>
        <input 
            type="date" 
            id="due_date" 
            name="due_date" 
            value="${todo.due_date}" 
            style="width: 30%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; margin-bottom: 10px;"
        />
        <button 
            onclick="handleUpdateTodo(event, ${todo.id})"
            id="updateduedate" 
            type="submit" 
            style="padding: 10px 15px; margin-top: 25px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"
        > Update </button>
    </form>
    `;
    document.getElementById("myModal").style.display = "block";
}

async function editContent(id) {
    const todo = await takeTodo(id);
    const todoDiv = document.getElementById("todo-modal-component");
    todoDiv.innerHTML = `
    <form id="editcontent" style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <div style="font-weight: bold; margin-top: 30px; margin-bottom: 45px;">Todo ID: ${todo.id}</div>
        <label for="content" style="display: block; margin-bottom: 20px;">Task Description</label>
        <textarea 
            id="content" 
            name="content" 
            rows="3" 
            style="width: 60%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; margin-bottom: 10px;"
        >${todo.content}</textarea>
        <br><button 
            onclick="handleUpdateTodo(event, ${todo.id})"
            id="updatecontent"           
            type="submit" 
            style="padding: 10px 15px; margin-top: 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"
        > Update </button>
    </form>
    `;
    document.getElementById("myModal").style.display = "block";
}

async function handleUpdateTodo(event, id) {
    event.preventDefault();
    const userId = localStorage.getItem("loggedInUserId");
    const form = event.target.form;
    const formData = new FormData(form);

    // รับค่าจากฟอร์ม
    const updatedContent = formData.get("content");
    const updatedDueDate = formData.get("due_date");
    
    // ดึงข้อมูล todo เดิมเพื่อตั้งค่า
    const todo = await takeTodo(id);

    const updatedTodo = {
        user_id: userId,
        content: updatedContent !== "" ? updatedContent : todo.content,     // ถ้า content เปลี่ยน ให้ใช้ค่าใหม่ ถ้าไม่ ให้ใช้ค่าเดิม
        due_date: updatedDueDate !== "" ? updatedDueDate : todo.due_date,   // ถ้า due_date เปลี่ยน ให้ใช้ค่าใหม่ ถ้าไม่ ให้ใช้ค่าเดิม
        created_at: new Date(formData.get("created_at")).toISOString(), 
        updated_at: new Date().toISOString(), 
    };
    console.log(updatedTodo);
    const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
        const result = await response.json();
        console.error("Error:", result);

        // กำหนดข้อความเตือนที่ต้องการแสดง
        let alertMessage = " Due_Date can't be in the past ";
    
        // คุณสามารถตรวจสอบรหัสสถานะหรือเนื้อหาจาก error เพื่อปรับข้อความที่จะแสดง
        if (result.code) {
            alertMessage += `Error: ${error.code}`;
        }
        alert(alertMessage); // แสดงข้อความเตือน
            return;
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