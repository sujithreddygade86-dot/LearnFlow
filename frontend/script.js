async function registerUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;

    let res = await fetch("http://localhost:3000/users");
    let users = await res.json();

    let duplicate = false;

    users.forEach(ele => {
        if (ele.email.toLowerCase() == email.toLowerCase()) {
            alert("Email Already Exists");
            duplicate = true;
        }

        if (ele.name.toLowerCase() == name.toLowerCase()) {
            alert("Username Already Exists");
            duplicate = true;
        }
    });

    if (duplicate) {
        return;
    }

    let obj = {
        name: name,
        email: email,
        password: password,
        enrolledCourses: [],
        submittedAssignments: []
    };

    let response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });

    let newUser = await response.json();

    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    console.log(localStorage.getItem("loggedInUser"));
    

        window.location.href = "index.html";

    
}