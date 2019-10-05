const login = document.getElementById("login");
const signup = document.getElementById("signup");
const inputDiv = document.getElementById("inputDiv");
const mainButton = document.getElementById("mainButton");
function accessTokenCheck(){
    const token = localStorage.getItem("token");
    if(token){
        inputDiv.style.display = "none";
        mainButton.style.display = "block";
    }
}
function loginClick(){
    location.href="../login/login.html";
}

function signupClick(){
    location.href="../signup/signup.html";
}

function mainButtonClick(){
    location.href="../view/view_mobile.html";
}

login.addEventListener("click",loginClick);
signup.addEventListener("click",signupClick);
mainButton.addEventListener("click",mainButtonClick);

window.onload = ()=>{
    accessTokenCheck();
}