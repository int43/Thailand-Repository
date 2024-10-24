//คำสั่ง $(document).ready เมื่อ load หน้าเสร็จจะเรียกใช้ฟังก์ชัน showUser(),fetchTodo()
$(document).ready( function (){
    showUser();
    fetchTodo();
    resetTimeout(); // เริ่มต้น timer

    // ตรวจสอบการใช้งานของผู้ใช้
    /*
        สร้างอาร์เรย์ events ซึ่งเก็บชื่อของเหตุการณ์ การเคลื่อนไหวของเมาส์ (mousemove), การกดปุ่ม (keydown), และการคลิก (click).
        ใช้ฟังก์ชัน forEach เพื่อทำการวนลูปผ่านทุกค่าที่อยู่ในอาร์เรย์ events. ในแต่ละรอบของลูป จะมีการส่งค่าเหตุการณ์ ไปยังตัวแปร event.
        เมื่อมีเหตุการณ์เกิดขึ้น จะเรียกฟังก์ชัน resetTimeout, ซึ่งทำให้เวลาที่นับอยู่ (สำหรับล็อกเอ้าท์) ถูกรีเซ็ต.
    */
    const events = ["mousemove", "keydown", "click"]; 
    events.forEach(event => {
        window.addEventListener(event, resetTimeout);})
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
        location.href = "./login.html";
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

const timeoutDuration = 60 * 60 * 1000; // ระยะเวลาที่ผู้ใช้ไม่มีการเคลื่อนไหวก่อนที่จะถูกล็อกเอ้าท์โดยอัตโนมัติ 1 ชม
const warningDuration = 1 * 60 * 1000; // มีการแจ้งเตือนก่อนที่จะถูกล็อกเอ้าท์เมื่อไม่ได้ใช้งานนาน เตือนเป็นเวลา 1 นาที
let timeout;    // เก็บค่า timeout สำหรับล็อกเอ้าท์
let warningTimeout;     // เก็บค่า timeout สำหรับการแสดงการแจ้งเตือน
let hasShownWarning = false;    // ตัวแปรใช้ตรวจสอบว่าได้แสดง alert แล้วหรือยัง

/*
ฟังก์ชันนี้จะทำการยกเลิก timer ที่กำลังทำงานอยู่ (ถ้ามี) ทั้งหมดและรีเซ็ตตัวแปร hasShownWarning ก่อนที่จะเริ่มนับใหม่อีกครั้ง
หากไม่มีการเคลื่อนไหวในระยะเวลาที่กำหนด(timeoutDuration) ฟังก์ชัน showWarning จะถูกเรียกใช้เพื่อแสดงการแจ้งเตือนล็อกเอ้าท์ผู้ใช้
*/
function resetTimeout() {
    clearTimeout(timeout);       
    clearTimeout(warningTimeout);
    hasShownWarning = false; 
    timeout = setTimeout(showWarning, timeoutDuration);
}

/*
ฟังก์ชันนี้จะแสดง Popup แจ้งเตือนเมื่อผู้ใช้ไม่มีการเคลื่อนไหว และยังเริ่ม timer สำหรับการล็อกเอ้าท์
ถ้าผู้ใช้คลิกที่ปุ่ม "ยกเลิก" จะทำการปิด Popup, ยกเลิก timer และรีเซ็ต timer ใหม่
*/
function showWarning() {
    if (!hasShownWarning) {
        document.getElementById("warningModal").style.display = "block"; // แสดง Popup
        hasShownWarning = true;

        // เริ่ม timer สำหรับการล็อกเอ้าท์ 1 นาที
        warningTimeout = setTimeout(logout, warningDuration); // เก็บ timeout สำหรับล็อกเอ้าท์

        // เพิ่มเหตุการณ์เมื่อกดปุ่ม "ยกเลิก"
        document.getElementById("cancelLogout").onclick = function() {
            closeWarning();     // ปิด Popup
            clearTimeout(warningTimeout);   // ยกเลิก timer สำหรับการล็อกเอ้าท์
            resetTimeout();     // รีเซ็ต timer
        };
    }
}

function closeWarning() {
    document.getElementById("warningModal").style.display = "none"; // ซ่อน Popup ที่แสดงการแจ้งเตือน
}

function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUserId");
    alert("You're locked out due to inactivity.");
    location.href = "./login.html";
}