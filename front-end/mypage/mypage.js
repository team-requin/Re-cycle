const ProfileImg = document.querySelector("#profileImg img")
const Name = document.getElementById("name");
const Rank = document.getElementById("rank");

    axios({
        method:"POST",
        url:"http://18.216.67.134:5000/User/login/refresh",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
        }
    }).then((e)=>{
        localStorage.setItem("token",e.data.access_token);
        axios({
            method : "GET",
            url : "http://18.216.67.134:5000/User/My",
            headers :{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((e)=>{
            ProfileImg.src = `http://18.216.67.134:5000/${e.data.ImageUrl}`;
            Name.innerText = e.data.name;
            Rank.innerText = e.data.rank;
        })
    });


const header = document.getElementById("header");

const test = header.getBoundingClientRect();