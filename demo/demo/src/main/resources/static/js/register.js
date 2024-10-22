async function handleRegisterUser(event) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const user = {
        username: formData.get("username"),
        password: formData.get("password"),
    };
    const same = await checkSameUser(user.username, user.password);
    if (same) {
        alert("Username or password already exists. Please choose a different username or password.");
        return;
    }
    console.log(user);
    //ส่ง POST request ไปยัง server เพื่อสร้าง user ใหม่
    const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",     //ส่งข้อมูลสร้าง user
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user), //ข้อมูลที่จะส่งไป server
    });

    if (response.ok) {
        setTimeout(function(){
            location.href = "./login.html"
        }, 1050)
    } else {
        const error = await response.json();
        console.error(error);
        return;
    }
        
}

async function checkSameUser(username, password) {
    try {
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) {
            throw new Error("Could not fetch users");
        }
        const usersJson = await response.json();
        const userExists = usersJson.users.some(user => user.username === username || user.password === password);
        return userExists;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}