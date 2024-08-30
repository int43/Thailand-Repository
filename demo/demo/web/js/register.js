function regis(){
   let username = document.getElementById("username").value;
   let password = document.getElementById("password").value;
    
   if (username=="") {
     alert("Please fill username.");
   }
   if (password=="") {
     alert("Please fill password.");
   }
};

//korn
document.querySelector('.register-container').addEventListener('submit', async function(e){
  const formData = new FormData(this)
  const data = {
      username: formData.get("username"),
      password: formData.get("password")
  };
  e.preventDefault()

  const response = await postData(data, "http://192.168.56.104:8080/user/register")
  if (!response) {
      console.log("error  ")
  }
})
