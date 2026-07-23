let admin = JSON.parse(localStorage.getItem("loggedInAdmin"));

if (!admin) {

    alert("Please Login to Access Admin Panel");

    window.location.href = "../frontend/login.html";

}

else {

    let actions = document.getElementById("actions");

    actions.innerHTML = `
        <div class="container">

            <div class="profile">
                ${admin.email.charAt(0).toUpperCase()}
            </div>

            <div class="dropdown">
                <i class="bi bi-box-arrow-right" onclick="logout()"></i>
            </div>

        </div>
    `;

}

function logout() {

    localStorage.removeItem("loggedInAdmin");

    window.location.href = "../frontend/login.html";

}



async function loadCourses() {

    let res = await fetch("https://learnflow-backend-dg4d.onrender.com/courses");

    let data = await res.json();

    let course = document.getElementById("course");

    course.innerHTML = `
        <option value="">Select Course</option>
    `;

    data.forEach(ele => {

        course.innerHTML += `
            <option value="${ele.id}">
                ${ele.title}
            </option>
        `;

    });

}



async function saveAssignment() {

    let courseId = document.getElementById("course").value;

    let title = document.getElementById("title").value;

    let description = document.getElementById("description").value;

    let dueDate = document.getElementById("dueDate").value;

    let link = document.getElementById("file").value;

    let res = await fetch(`https://learnflow-backend-dg4d.onrender.com/courses/${courseId}`);

    let course = await res.json();

    if (!course.assignments) {
        course.assignments = [];
    }

    let obj = {

        id: course.assignments.length + 1,

        title: title,

        description: description,

        dueDate: dueDate,

        link: link

    };

    course.assignments.push(obj);

    await fetch(`https://learnflow-backend-dg4d.onrender.com/courses/${courseId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(course)

    });

    alert("Assignment Added Successfully");

    document.getElementById("course").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("file").value = "";

    getAssignments();

}



async function getAssignments() {

    let res = await fetch("https://learnflow-backend-dg4d.onrender.com/courses");

    let courses = await res.json();

    let cont = document.getElementById("assignmentContainer");

    cont.innerHTML = "";

    courses.forEach(course => {

        if (course.assignments.length == 0) {
            return;
        }

        course.assignments.forEach(assignment => {

            let card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `

                <h2>${assignment.title}</h2>

                <p><b>Course :</b> ${course.title}</p>

                <p>${assignment.description}</p>

                <p><b>Due Date :</b> ${assignment.dueDate}</p>

                <a href="${assignment.link}" target="_blank">
                    Open Assignment
                </a>

                <br><br>

                <button onclick="editAssignment('${course.id}','${assignment.id}')">
                    Edit
                </button>

                <button onclick="deleteAssignment('${course.id}','${assignment.id}')">
                    Delete
                </button>

            `;

            cont.appendChild(card);

        });

    });

}


async function deleteAssignment(id) {

    await fetch(`https://learnflow-backend-dg4d.onrender.com/assignments/${id}`, {

        method: "DELETE"

    });

    alert("Assignment Deleted Successfully");

    getAssignments();

}



loadCourses();

getAssignments();