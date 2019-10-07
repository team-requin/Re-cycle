const ProfileImg = document.querySelector("#profileImg img")
const Name = document.getElementById("name");
const Rank = document.getElementById("rank");
const list = document.getElementsByClassName("menuContent")[0];
// const upload = document.getElementsByClassName("menuContent")[1];
const upload = document.getElementsByClassName("menuContent")[2];
const basket = document.getElementsByClassName("menuContent")[3];
window.onload = ()=>{
    axios({
        method:"POST",
        url:"http://18.216.67.134:5000/User/login/refresh",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
        }
    }).then((e)=>{
        localStorage.setItem("token",e.data.access_token);
    }).catch((e)=>{
        alert("다시 로그인을 해주세요.");
        location.href="../login/login.html";
    })
}
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

basket.addEventListener("click",()=>{
    location.href="../basket/basket.html";
})

list.addEventListener("click",()=>{
    location.href="../payment/payment.html";
})

upload.addEventListener("click",()=>{
    location.href="../uploadItem/uploadItem_mobile.html";
})