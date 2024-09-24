function LogoutUser(event) {
    event.preventDefault();
    setTimeout(function(){
        location.href = "./login.html"
    }, 1050)
}

function showUsername(event) {
    event.preventDefault();
    const showuser = document.getElementById("username").value;
    console.log("user = " + showuser);
    const resultuser = usersJson.users.find(data => data.username === checkuser)
    console.log("user = " + resultuser);
    showUsername(event);
}

/*function addPostIt() {
    const postIt = document.createElement("addPostIt()");

    postIt.style.width = "200px";
    postIt.style.height = "200px";
    postIt.style.backgroundColor = "yellow";
    postIt.style.position = "absolute";
    postIt.style.top = "100px";
    postIt.style.left = "100px";
  
    document.body.appendChild(postIt);
  }
  addPostIt();*/