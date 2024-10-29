async function LoginUser(event) {
    event.preventDefault();

    // แสดงหน้าจอโหลด
    document.getElementById("loading").style.display = "flex";

    //ใช้ try catch ดัก error ง่ายขึ้น 
    try {
        //fetch ข้อมูล user จาก url ถ้าสำเร็จแสดงในรูป json
        const response = await fetch("http://192.168.56.104:8080/users");
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
            // คืนค่าฟอร์มให้เหมือนเดิม
            document.getElementById("username").value = '';
            document.getElementById("password").value = '';
            document.getElementById("loading").style.display = "none"; // ซ่อนหน้าจอโหลด
        } else {
            // เก็บ username และ user_id ใน localStorage
            localStorage.setItem("loggedInUser", checkuser);
            localStorage.setItem("loggedInUserId", resultlogin.user_id);
            console.log(resultlogin);
            
            // ซ่อนหน้าจอโหลดหลังจาก 4 วินาทีเพื่อแสดงหน้า main screen
            setTimeout(() => {
                document.getElementById("loading").style.display = "none";
                location.href = "./index.html";
            }, 4000);
        }
    } catch (error) {
        console.error("Error:", error);
        // ซ่อนหน้าจอโหลดเมื่อเกิด error
        document.getElementById("loading").style.display = "none";
    }
}

function redirectToRegister() {
    setTimeout(function() {
        window.location.href = 'register.html';
    }, 1000); // 1000 มิลลิวินาที (1 วินาที)
}