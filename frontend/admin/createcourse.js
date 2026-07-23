let admin = JSON.parse(localStorage.getItem("loggedInAdmin"));

let videos = [];

if (!admin) {
    alert("please Login to Access Admin Panel")
    window.location.href = "../login.html";
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

    window.location.href = "../login.html";

}

function addVideo() {

    let title = document.getElementById("videoTitle").value;
    let path = document.getElementById("videoPath").value;

    let obj = {

        id: videos.length + 1,

        title: title,

        video: path

    };

    videos.push(obj);

    document.getElementById("videoList").innerHTML += `
        <p>${obj.id}. ${obj.title}</p>
    `;

    document.getElementById("videoTitle").value = "";
    document.getElementById("videoPath").value = "";

}


async function saveCourse() {

    let id = document.getElementById("id").value;
    let title = document.getElementById("title").value
    let category = document.getElementById("category").value
    let level = document.getElementById("level").value
    let duration = document.getElementById("duration").value
    let lessons = document.getElementById("lessons").value
    let students = document.getElementById("students").value
    let rating = document.getElementById("rating").value
    let image = document.getElementById("image").value
    let description = document.getElementById("description").value

    let obj = {
        
        "id": id,
        "title": title,
        "category": category,
        "level": level,
        "duration": duration,
        "lessons": lessons,
        "students": students,
        "rating": rating,
        "image": image,
        "description": description,
        videos: videos,
        assignments :[]
    }


    let res = await fetch("https://learnflow-backend-dg4d.onrender.com/courses", {
        method: "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(obj)

    })

    document.getElementById("title").value = ""
    document.getElementById("category").value = ""
    document.getElementById("level").value = ""
    document.getElementById("duration").value = ""
    document.getElementById("lessons").value = ""
    document.getElementById("students").value = ""
    document.getElementById("rating").value = ""
    document.getElementById("image").value = ""
    document.getElementById("description").value = ""

    let course = await res.json();

    alert("Course Created Successfully")

    

}