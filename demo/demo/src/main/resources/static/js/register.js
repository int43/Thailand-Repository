async function handleRegisterUser(event) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const user = {
        username: formData.get("username"),
        password: formData.get("password"),
    };
    console.log(user);
    //ส่ง POST request ไปยัง server เพื่อสร้าง user ใหม่
    const response = await fetch("http://localhost:8080/Users/register", {
        method: "POST",     //ส่งข้อมูลสร้าง user
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user), //ข้อมูลที่จะส่งไป server
    });
    if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
    }
}