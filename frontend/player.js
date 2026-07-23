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


let courseId = localStorage.getItem("currentCourseId");

async function getVideos() {

    let res = await fetch(`https://learnflow-backend-dg4d.onrender.com/users/${user.id}`);
    let currentUser = await res.json();

    let list = document.getElementById("videoList");
    let player = document.getElementById("player");
    let coursetitle = document.getElementById("coursetitle");

    list.innerHTML = "";

    currentUser.enrolledCourses.forEach(course => {

        let div1 = document.createElement("div");
        div1.className="title"
        div1.innerHTML = `
                    <h2>${course.title}</h2>
                `;

        if (course.id == courseId) {

            course.videos.forEach(video => {



                let div = document.createElement("div");

                div.className = "lesson";

                div.innerHTML = `
                    
                    <h3>${video.title}</h3>
                `;

                div.onclick = function () {

                    player.src = video.video;

                };

                list.appendChild(div);
                coursetitle.appendChild(div1)

            });

        }

    });

}

getVideos();