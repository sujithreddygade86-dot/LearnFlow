let admin = JSON.parse(localStorage.getItem("loggedInAdmin"));
let editCourseData = {};
let videos = [];

if (!admin) {
    alert("please Login to Access Admin Panel")
    window.location.href = "../frontend/login.html";

}

else {

    let actions = document.getElementById("actions");

    actions.innerHTML = `
    <div class="container">

        <div class="profile" >
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


async function getdata() {
    let res = await fetch("https://learnflow-backend-dg4d.onrender.com/users")
    let data = await res.json();
    let cont = document.getElementById("container")
    let search = document.getElementById("search").value.toLowerCase();
    cont.innerHTML = "";
    data.forEach(ele => {
        let found = false;

        if (ele.name.toLowerCase().includes(search)) {
            found = true;
        }

        if (ele.email.toLowerCase().includes(search)) {
            found = true;
        }

        if (search != "" && found == false) {
            return;
        }

        let card = document.createElement('div')
        card.className="card"
        card.innerHTML = `
            <div class="up">
                <div class="round">
                    <h1>${ele.name.charAt(0).toUpperCase()}</h1>
                </div>
            </div>

            <div class="down">
                <h2>${ele.name}</h2>
                <h2>${ele.email}</h2>
                <p>Enrolled Courses : ${ele.enrolledCourses.length}</p>
                <p>Submitted Assignments : ${ele.submittedAssignments.length}</p>
                <button onclick="viewStudent('${ele.id}')">View</button>
            </div>

            
        `;

        cont.appendChild(card)
    });

}

async function viewStudent(id){

    let res = await fetch(`https://learnflow-backend-dg4d.onrender.com/users/${id}`);

    let student = await res.json();

    document.getElementById("popup").style.display = "flex";

    document.getElementById("studentName").innerHTML =
    student.name;

    document.getElementById("studentEmail").innerHTML =
    student.email;

    document.getElementById("totalCourses").innerHTML =
    "Total Courses : " + student.enrolledCourses.length;

    document.getElementById("totalAssignments").innerHTML =
    "Assignments Submitted : " + student.submittedAssignments.length;

    let courseList = document.getElementById("courseList");

    courseList.innerHTML="";

    student.enrolledCourses.forEach(ele=>{

        courseList.innerHTML += `

            <div class="item">

                ${ele.title}

            </div>

        `;

    });

    let assignmentList=document.getElementById("assignmentList");

    assignmentList.innerHTML="";

    student.submittedAssignments.forEach(ele=>{

        assignmentList.innerHTML += `

            <div class="item">

                Assignment ID : ${ele.assignmentId}

                <br><br>

                <a href="${ele.submissionLink}" target="_blank">

                    View Submission

                </a>

            </div>

        `;

    });

}

function closePopup(){

    document.getElementById("popup").style.display="none";

}  

getdata();