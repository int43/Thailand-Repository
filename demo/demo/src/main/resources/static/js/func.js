//คำสั่ง $(document).ready เมื่อ load หน้าเสร็จจะเรียกใช้ฟังก์ชัน showUser(),fetchTodo()
$(document).ready( function (){
    showUser();
    fetchTodo();
    resetTimeout(); // เริ่มต้น timer

    // ตรวจสอบการใช้งานของผู้ใช้
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);
    window.addEventListener("click", resetTimeout);
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

const timeoutDuration = 2 * 60 * 60 * 1000; // ระยะเวลาที่ผู้ใช้สามารถไม่มีการเคลื่อนไหวก่อนที่จะถูกล็อกเอ้าท์โดยอัตโนมัติ 2 ชม
const warningDuration = 1 * 60 * 1000; // มีการแจ้งเตือนเมื่อไม่ได้ใช้งานนาน 1 นาที
let timeout;
let warningTimeout;
let hasShownWarning = false; // ตัวแปรตรวจสอบว่าได้แสดง alert แล้ว

function resetTimeout() {
    clearTimeout(timeout);          // ยกเลิก timer ล็อกเอ้าท์
    clearTimeout(warningTimeout);   // ยกเลิก timer แจ้งเตือน
    hasShownWarning = false; // รีเซ็ตตัวแปรเมื่อมีการใช้งาน
    timeout = setTimeout(showWarning, timeoutDuration);      // ถ้าผู้ใช้ไม่มีการเคลื่อนไหวในช่วงเวลา timeoutDuration ระบบจะล็อกเอ้าท์ผู้ใช้
}

function showWarning() {
    if (!hasShownWarning) {
        document.getElementById("warningModal").style.display = "block"; // แสดง Popup
        hasShownWarning = true;

        // เริ่ม timer สำหรับการล็อกเอ้าท์ 2 นาที
        warningTimeout = setTimeout(logout, warningDuration); // เก็บ timeout สำหรับล็อกเอ้าท์

        // เพิ่มเหตุการณ์เมื่อกดปุ่ม "ยกเลิก"
        document.getElementById("cancelLogout").onclick = function() {
            closeWarning(); // ปิด Popup
            clearTimeout(warningTimeout); // ยกเลิก timer สำหรับการล็อกเอ้าท์
            resetTimeout(); // รีเซ็ต timer
        };
    }
}


function closeWarning() {
    document.getElementById("warningModal").style.display = "none"; // ซ่อน Popup
}


function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUserId");
    alert("คุณถูกล็อกเอ้าท์เนื่องจากไม่มีการเคลื่อนไหว");
    location.href = "./login.html";
}
