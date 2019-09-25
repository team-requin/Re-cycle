const login = document.getElementById("login");
const password = document.getElementById("password");

function loginClick(){
    location.href="./login.html";
}

function passwordClick(){
    location.href="./password.html";
}

login.addEventListener("click",loginClick);
password.addEventListener("click",passwordClick);