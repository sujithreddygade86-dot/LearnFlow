let user = JSON.parse(localStorage.getItem("loggedInUser"));

let actions = document.getElementById("actions");

actions.innerHTML = `
    <div class="container">

        <div class="profile" >
            ${user.email.charAt(0).toUpperCase()}
        </div>
        

        <div class="dropdown">


        <i class="bi bi-box-arrow-right" onclick="logout()"></i>

        </div>

    </div>
`;


function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

}


async function getMyCourses() {

    if (user == null) {
        alert("Please Login");
        window.location.href = "login.html";
        return;
    }

    let res = await fetch(`http://localhost:3000/users/${user.id}`);
    let currentUser = await res.json();

    let cont = document.getElementById("container1");
    cont.innerHTML = "";

    currentUser.enrolledCourses.forEach(course => {

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${course.image}" alt="${course.title}">

            <span class="category">${course.category}</span>

            <h2>${course.title}</h2>

            <div class="rating">
                ⭐ ${course.rating}
                &nbsp;&nbsp;
                👨‍🎓 ${course.students} Students
            </div>

            <div class="details">
                ⏱ ${course.duration}
                <br>
                📚 ${course.lessons} Lessons
            </div>

            <div class="level">
                🎯 ${course.level}
            </div>

            <button type="submit" onclick = "continueLearning(${course.id})">Continue Learning</button>
        `;

        cont.appendChild(card);

    });

}

async function continueLearning(id){
    
    localStorage.setItem("currentCourseId", id);

    window.location.href = "player.html";
}


function openCourses(){

    window.location.href = "course.html";

}

getMyCourses();