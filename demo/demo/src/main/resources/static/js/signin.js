async function LoginUser(event) {
    event.preventDefault();
    //ใช้ try catch ดัก error ง่ายขึ้น 
    try {
        //fetch ข้อมูล user จาก url ถ้าสำเร็จแสดงในรูป json
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) {
            throw new Error("Could not fetch users");
        }
        const usersJson = await response.json();

        const checkuser = document.getElementById("username").value;  
        const checkpass = document.getElementById("password").value;
        //หาใน users ว่าข้อมูลตรงกันไหม
        const resultlogin = usersJson.users.find(data => data.username === checkuser && data.password === checkpass);

        if (!resultlogin) {
            alert("Please fill username and password again.");
        } else {
            // เก็บ username ใน localStorage
            localStorage.setItem("loggedInUser", checkuser);
            setTimeout(function(){
                location.href = "./index.html";
            }, 1050);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

