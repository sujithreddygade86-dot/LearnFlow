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


async function getData() {
    let res = await fetch("https://learnflow-backend-dg4d.onrender.com/courses");
    let data = await res.json();

    let cont = document.getElementById("container1");
    cont.innerHTML = "";

    data.forEach(ele => {

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

            <div class="level">🎯 ${ele.level}</div>
            <div class="btns">
            <button type="button" onclick="editCourse('${ele.id}')">
                Edit
            </button>
            <button type="button" onclick="deleteCourse('${ele.id}')">
                Delete
            </button

            </div>
        `;

        cont.appendChild(card);
    });
}


async function deleteCourse(id) {
    await fetch(`http://localhost:3000/courses/${id}`, {
        method: "DELETE",
    });
    getData()
    alert("Course Deleted Successfully")
}

async function editCourse(id) {

    document.getElementById("overlay").style.display = "flex";

    let res = await fetch(`http://localhost:3000/courses/${id}`);

    editCourseData = await res.json();

    videos = editCourseData.videos;

    document.getElementById("id").value = editCourseData.id;
    document.getElementById("title").value = editCourseData.title;
    document.getElementById("category").value = editCourseData.category;
    document.getElementById("level").value = editCourseData.level;
    document.getElementById("duration").value = editCourseData.duration;
    document.getElementById("lessons").value = editCourseData.lessons;
    document.getElementById("students").value = editCourseData.students;
    document.getElementById("rating").value = editCourseData.rating;
    document.getElementById("image").value = editCourseData.image;
    document.getElementById("description").value = editCourseData.description;

    showVideos();

}

function showVideos() {

    let list = document.getElementById("videoList");

    list.innerHTML = "";

    videos.forEach(video => {

        list.innerHTML += `

        <div class="videoCard">

            <div>

                <h3>${video.title}</h3>

                <small>${video.video}</small>

            </div>

            <div class="videoBtns">

                <button onclick="editVideo(${video.id})">
                    Edit
                </button>

                <button onclick="deleteVideo(${video.id})">
                    Delete
                </button>

            </div>

        </div>

        `;

    });

}

function addVideo() {

    let title = document.getElementById("videoTitle").value;

    let path = document.getElementById("videoPath").value;

    videos.push({

        id: videos.length + 1,

        title: title,

        video: path

    });

    document.getElementById("videoTitle").value = "";

    document.getElementById("videoPath").value = "";

    showVideos();

}

function deleteVideo(id){

    videos = videos.filter(video => video.id != id);

    showVideos();

}
function editVideo(id){

    videos.forEach(video=>{

        if(video.id==id){

            document.getElementById("videoTitle").value = video.title;

            document.getElementById("videoPath").value = video.video;

            deleteVideo(id);

        }

    });

}

async function updateCourse(){

    editCourseData.id = document.getElementById("id").value;
    editCourseData.title = document.getElementById("title").value;
    editCourseData.category = document.getElementById("category").value;
    editCourseData.level = document.getElementById("level").value;
    editCourseData.duration = document.getElementById("duration").value;
    editCourseData.lessons = document.getElementById("lessons").value;
    editCourseData.students = document.getElementById("students").value;
    editCourseData.rating = document.getElementById("rating").value;
    editCourseData.image = document.getElementById("image").value;
    editCourseData.description = document.getElementById("description").value;

    editCourseData.videos = videos;

    await fetch(`http://localhost:3000/courses/${editCourseData.id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(editCourseData)

    });

    alert("Course Updated Successfully");

    document.getElementById("overlay").style.display="none";

    getData();

}

getData()