//คำสั่ง $(document).ready เมื่อ load หน้าเสร็จจะเรียกใช้ฟังก์ชัน showUser(),fetchTodo()
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
    //ดึงค่า "loggedInUser"(username) จาก localStorage
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
    });
    document.getElementById("post-it").addEventListener("click",function(){
        document.querySelector(".pop-up").style.display = "flex";
    });
    document.querySelector(".addbtn").addEventListener("click",function(){
        document.querySelector(".pop-up").style.display = "none";
    });
} 