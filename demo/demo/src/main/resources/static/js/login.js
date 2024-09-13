async function LoginUser() {
    const users = await fetch("http://localhost:8080/users/register");
    if (!users.ok) {
        throw new Error("Could not fetch users");
    }
    const usersJson = await users.json();
    console.log(usersJson);

    setTimeout(function(){
        location.href = "./index.html"
    }, 1050)
}