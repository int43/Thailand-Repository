// แสดงข้อมูลจาก database
async function fetchTodo() {
    const userId = localStorage.getItem("loggedInUserId");  // เก็บข้อมูล user_id จาก localStorage "loggedInUserId" ในตัวแปร userId 
    console.log(userId);
    if (!userId) {
        console.error("No user ID found.");
        return;
    } try {
        const response = await fetch("http://192.168.56.104:8080/todo");
        if (!response.ok) {
            throw new Error("Could not fetch todos");
        }
        const todosJson = await response.json();

        // ใช้ filter กรองเอาเฉพาะ user_id ที่ตรงกับ userId ที่เก็บไว้ก่อนหน้า (แปลงเป็น String เพื่อเปรียบเทียบ)
        const filteredTodos = todosJson.todos.filter(todo => todo.user_id.toString() === userId);
        console.log(filteredTodos);
        renderTodo(filteredTodos);
    } catch (error) {
        console.error("Fetch error:", error);
    }
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
        const createdAt = new Date(todo.created_at).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
        const dueDate = new Date(todo.due_date).toLocaleDateString('th-TH', { timeZone: 'Asia/Bangkok' });
        todoDiv.innerHTML += `
        <tr>
            <td>${todo.id}</td>
            <td id="duedate">${dueDate}</td>
            <td id="content">${todo.content}</td>
            <td>${createdAt}</td>
            <td>
            <button type="button" id="editbtn" onclick="editTodo(${todo.id})">Edit</button>
            <button type="button" id="deletebtn" onclick="handleDeleteTodo(${todo.id})">Delete</button>
            </td>
        </tr>
        `;
        todos.appendChild(todoDiv);     // เพิ่ม todoDiv เข้าไปใน todos
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
        created_at: new Date(), 
        updated_at: new Date(),   
    };
    console.log(todo)
    try {
        const response = await fetch("http://192.168.56.104:8080/todo/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        if (!response.ok) {
            const error = await response.json();
            console.log('Error from server : ',error);
            const alertMessage = error.message || "Error to record Todo-List"; // ใช้ข้อความจากเซิร์ฟเวอร์ถ้ามี
            alert(alertMessage); // แสดงข้อความเตือน
            form.reset(); // เคลียร์ฟอร์ม
            return;
        }

        await fetchTodo();
        form.reset(); // เคลียร์ฟอร์ม

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Have error to connect the server");
    }
}


// ดึงข้อมูลโดย Todo id
async function takeTodo(id) {
    const response = await fetch(`http://192.168.56.104:8080/todo/${id}`);
    if (!response.ok) {
        throw new Error("Could not fetch todo");
    }
    return await response.json();
}

// ส่วนของ edit เอาข้อมูลโดยใช้ id
async function editTodo(id) {
    const todo = await takeTodo(id);
    const todoDiv = document.getElementById("todo-modal-component");
    todoDiv.innerHTML = `
    <form id="edit">
        <div style="font-weight: bold; margin-top: 30px; margin-bottom: 30px;">Task ID: ${todo.id}</div>

        <label for="due_date" style="display: block; margin-bottom: 20px;">Due_Date</label>
        <input type="date" id="due_date" name="due_date" value="${todo.due_date}" />

        <label for="content" style="display: block; margin-bottom: 20px;">Task Description</label>
        <textarea id="content" name="content" style="width:35%;" rows="3">${todo.content}</textarea><br>

        <button type="submit" id="update" onclick="handleUpdateTodo(event, ${todo.id})"
        style="padding: 10px 15px; margin-top: 20px; background-color: #2c60ff; color: white; border: none; border-radius: 4px; cursor: pointer;" 
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
        created_at: new Date(), 
        updated_at: new Date(), 
    };
    console.log(updatedTodo);
    const response = await fetch(`http://192.168.56.104:8080/todo/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
        const result = await response.json();
        console.error("Error:", result);

        const alertMessage = " Due_Date can't be in the past ";   // กำหนดข้อความเตือนที่ต้องการแสดง
        // ตรวจสอบข้อมูล error เพื่อปรับข้อความที่จะแสดง
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


async function handleDeleteTodo(id) {
    if(confirm("Do you want to delete?")) {
        console.log("You press OK!");
        const response = await fetch(`http://192.168.56.104:8080/todo/${id}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            throw new Error("Could not delete todo");
        }
        await fetchTodo();
    
    } else {
        console.log("You press Cancel!");
    };
}
