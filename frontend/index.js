let user = JSON.parse(localStorage.getItem("loggedInUser"));

let actions = document.getElementById("actions");

if (user) {

    actions.innerHTML = `
        <div class="container">

            <div class="profile">
                ${user.email.charAt(0).toUpperCase()}
            </div>

            <div class="dropdown">
                <i class="bi bi-box-arrow-right" onclick="logout()"></i>
            </div>

        </div>
    `;

    document.getElementById("btnss").style.display = "none";

}
else {

    actions.innerHTML = `
        <a href="login.html" class="login">Login</a>
    `;

}

let btn = document.getElementById("btnss");

if (user) {

    btn.style.display = "none";

}

function openCourses(){

    window.location.href = "course.html";

}


function logout(){

    localStorage.removeItem("loggedInUser");

    window.location.href="index.html";

}