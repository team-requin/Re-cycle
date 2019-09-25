const id= document.getElementById("id");
const password = document.getElementById("password");
const button = document.getElementById("loginButton");
const missingPassword = document.getElementById("missingPassword");

function loginClick(){

    if(idIsEmpty()){
        alert("아이디가 비어있습니다.");
        return;
    }
    else if(passwordIsEmpty()){
        alert("비밀번호가 비어있습니다.");
        return;
    }

    axios({
        method:"POST",
        url:"http://18.216.67.134:5000/User/login",
        data:{
            "email" : id.value,
            "password" : password.value,
        }
    }).catch((e)=>{
        alert("로그인에 실패하였습니다.");
    }).then(e=>{
        localStorage.setItem("token",e.data.access_token);
        location.href="./main.html";
    })
}

function missingPasswordClick(){
    location.href="./ResetPassword.html";    
}

function idIsEmpty(){
    if(!id.value){
        return true;
    }
}

function passwordIsEmpty(){
    if(!password.value){
        return true;
    }
}

button.addEventListener("click",loginClick);
missingPassword.addEventListener("click",missingPassword);
