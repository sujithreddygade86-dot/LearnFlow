async function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;

    console.log(email, password);

    let adminRes = await fetch("http://localhost:3000/admin");
    let admins = await adminRes.json();

    console.log(admins);

    let foundAdmin = null;

    admins.forEach(admin => {

        if (admin.email == email && admin.password == password) {
            foundAdmin = admin;
        }

    });

    console.log(foundAdmin);

    if (foundAdmin) {

        localStorage.setItem("loggedInAdmin", JSON.stringify(foundAdmin));

        alert("Admin Login Successful");

        window.location.href = "../admin/admin.html";

        return;
    }

    let userRes = await fetch("https://learnflow-backend-dg4d.onrender.com/users");
    let users = await userRes.json();

    let foundUser = null;

    users.forEach(user => {

        if (user.email == email && user.password == password) {

            foundUser = user;

        }

    });

    if (foundUser) {

        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        alert("User Login Successful");

        window.location.href = "index.html";

    } else {

        alert("Invalid Email or Password");

    }

}