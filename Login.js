function login(){

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if(username === "" || password === ""){

        msg.innerHTML = "Please fill all fields";
        msg.style.color = "red";

        return;
    }

    if(username === "admin" && password === "1234"){

        msg.innerHTML = "Login Successful";
        msg.style.color = "green";

        setTimeout(() => {

            window.location.href = "Index.html";

        }, 1500);

    }else{

        msg.innerHTML = "Invalid Username or Password";
        msg.style.color = "red";

    }

}
