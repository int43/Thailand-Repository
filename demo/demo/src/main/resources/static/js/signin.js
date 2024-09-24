async function LoginUser(event) {
    event.preventDefault();
    const users = await fetch("http://localhost:8080/users");
    if (!users.ok) {
        throw new Error("Could not fetch users");
    } 
    const usersJson = await users.json();
    console.log(usersJson);

    const checkuser = document.getElementById("username").value;
    console.log("user = " + checkuser);
    const resultuser = usersJson.users.find(data => data.username === checkuser)
    
    const checkpass = document.getElementById("password").value;
    console.log("pass = " + checkpass);
    const resultpass = usersJson.users.find(data => data.password === checkpass)

    console.log("result = , " + resultuser, resultpass);
    if (!resultuser || !resultpass) {
        alert("Please fill username and password again.");
    }
    else(setTimeout(function(){
        location.href = "./index.html"
    }, 1050))
}