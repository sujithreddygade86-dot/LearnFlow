let user = JSON.parse(localStorage.getItem("loggedInUser"));

let actions = document.getElementById("actions");

if (user) {

    actions.innerHTML = `
        <div class="container">

            <div class="profile">
                ${user.name.charAt(0).toUpperCase()}
            </div>

            <div class="dropdown">


        <i class="bi bi-box-arrow-right" onclick="logout()"></i>

        </div>

        </div>
    `;

} else {

    actions.innerHTML = `
        <a href="login.html" class="login">Login</a>
    `;

}



function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

}



async function getData() {

    let res = await fetch("http://localhost:3000/courses");
    let data = await res.json();

    let search = document.getElementById("search").value.toLowerCase();

    let currentUser = null;

    if (user) {
        let userRes = await fetch(`http://localhost:3000/users/${user.id}`);
        currentUser = await userRes.json();
    }

    let cont = document.getElementById("container1");
    cont.innerHTML = "";

    data.forEach(ele => {

        let found = false;

        if (ele.title.toLowerCase().includes(search)) {
            found = true;
        }

        if (ele.category.toLowerCase().includes(search)) {
            found = true;
        }

        if (ele.level.toLowerCase().includes(search)) {
            found = true;
        }

        if (search != "" && found == false) {
            return;
        }

        let isEnrolled = false;

        if (currentUser != null) {

            currentUser.enrolledCourses.forEach(course => {

                if (course.id == ele.id) {
                    isEnrolled = true;
                }

            });

        }

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${ele.image}" alt="${ele.title}">

            <span class="category">${ele.category}</span>

            <h2>${ele.title}</h2>

            <div class="rating">
                ⭐ ${ele.rating}
                &nbsp;&nbsp;
                👨‍🎓 ${ele.students} Students
            </div>

            <div class="details">
                ⏱ ${ele.duration}
                <br>
                📚 ${ele.lessons} Lessons
            </div>

            <div class="level">
                🎯 ${ele.level}
            </div>

            <button
                type="button"
                onclick="enrollCourse('${ele.id}', this)"
                ${isEnrolled ? "disabled" : ""}
            >
                ${isEnrolled ? "Enrolled" : "Enroll Now"}
            </button>
        `;

        cont.appendChild(card);

    });

}

async function enrollCourse(id, btn) {
    if (user == null) {
        alert("Please Login");
        window.location.href = "login.html"
        return;
    }
    let userRes = await fetch(`http://localhost:3000/users/${user.id}`);
    let currentUser = await userRes.json();

    let courseRes = await fetch(`http://localhost:3000/courses/${id}`);
    let course = await courseRes.json();

    let already = false;
    currentUser.enrolledCourses.forEach(ele => {
        if (ele.id == id) {
            already = true;
        }
    })
    if (already) {
        alert("Already Enrolled")
    }
    else {
        currentUser.enrolledCourses.push(course)
        await fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(currentUser)

        });
        btn.innerHTML = "Enrolled";
        btn.disabled = true;

        alert("Enrollment Successful");
    }
}

getData();
window.onload = function () {

    document.getElementById("search").focus();

}