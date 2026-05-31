function register(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {
        username: username,
        email: email,
        password: password
    };

    // Save user in browser
    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");

    // redirect to login page
    window.location.href = "Login.html";
}