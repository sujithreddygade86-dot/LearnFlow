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


async function getAssignments() {

    let res = await fetch(`http://localhost:3000/users/${user.id}`);
    let currentUser = await res.json();

    let courseRes = await fetch("http://localhost:3000/courses");
    let courses = await courseRes.json();

    let cont = document.getElementById("assignmentContainer");

    cont.innerHTML = "";

    courses.forEach(course => {

        let enrolled = false;

        currentUser.enrolledCourses.forEach(ele => {

            if (ele.id == course.id) {
                enrolled = true;
            }

        });

        if (!enrolled) {
            return;
        }

        if (!course.assignments) {
            return;
        }

        course.assignments.forEach(assignment => {

            let submitted = false;

            currentUser.submittedAssignments.forEach(ele => {

                if (ele.assignmentId == assignment.id) {

                    submitted = true;

                }

            });

            let card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `

                <h2>${assignment.title}</h2>

                <p><b>Course :</b> ${course.title}</p>

                <p>${assignment.description}</p>

                <p><b>Due :</b> ${assignment.dueDate}</p>

                <a href="${assignment.link}" target="_blank">
                    Open Assignment
                </a>

                <br><br>

                <input
                    type="text"
                    id="link${assignment.id}"
                    placeholder="Paste Google Docs Link"
                    ${submitted ? "disabled" : ""}
                >

                <br><br>

                <button
                    onclick="submitAssignment('${assignment.id}')"
                    ${submitted ? "disabled" : ""}
                >

                    ${submitted ? "Submitted" : "Submit Assignment"}

                </button>

            `;

            cont.appendChild(card);

        });

    });

}



async function submitAssignment(id) {

    let link = document.getElementById("link" + id).value;

    if (link == "") {

        alert("Paste Google Docs Link");

        return;

    }

    let res = await fetch(`http://localhost:3000/users/${user.id}`);

    let currentUser = await res.json();

    let already = false;

    currentUser.submittedAssignments.forEach(ele => {

        if (ele.assignmentId == id) {

            already = true;

        }

    });

    if (already) {

        alert("Already Submitted");

        return;

    }

    let obj = {

        assignmentId: id,

        submissionLink: link

    };

    currentUser.submittedAssignments.push(obj);

    await fetch(`http://localhost:3000/users/${user.id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(currentUser)

    });

    alert("Assignment Submitted Successfully");

    getAssignments();

}

function openCourses(){

    window.location.href = "course.html";

}

getAssignments();