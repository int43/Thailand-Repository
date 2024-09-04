async function fetchUsers() {
    const users = await fetch("http://localhost:8080/users/register");
    if (!users.ok) {
        throw new Error("Could not fetch users");
    }
    const usersJson = await users.json();
    console.log(usersJson);
    renderUsers(usersJson);
}

function renderUsers(usersJson) {
    const users = document.getElementById("user-list");
    if (!users) {
        throw new Error("Could not find users element");
    }
    users.innerHTML = "";
    const userDiv = document.createElement("table");
    userDiv.innerHTML = "<th>User ID</th><th>User Name</th><th>User Password</th>";
    usersJson.users.forEach((user) => {
        userDiv.innerHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.password}</td>
        </tr>
        `;
        users.appendChild(userDiv);
    });
}

async function handleRegisterUser(event) {
    event.preventDefault();
    const form = event.target.form;
    const formData = new FormData(form);
    const user = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
    }
    fetchUsers();
}