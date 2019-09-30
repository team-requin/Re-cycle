const button = document.getElementById("signupButton");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const password = document.getElementById("password");
const emailCheckButton = document.getElementById("emailCheck");
const numberCheck = document.getElementById("numberCheck");
const emailCheckNumber = document.getElementById("emailCheckNumber");

function clickSignupButton(){
    if(nameEmptyCheck()){
        return;
    }
    else if(emailEmptyCheck()){
        return;
    }
    else if(passwordEmptyCheck()){
        return;
    }
    else if(phoneEmptyCheck()){
        return;
    }

    data = {
        name : name.value,
        email : email.value,
        phone : phoneNumber.value,
        password : password.value,
    }
    axios({
        url:"http://18.216.67.134:5000/User/signup",
        data:data,
        method:"POST",
        headers : {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
            "crossDomain"  : true,
        },
    }).then((e)=>{
        alert("회원가입을 성공하였습니다");
        location.href = "./login.html";
    })
}

function emailCheck(){
    if(email.value != ""){
        data = {
            email : email.value,
        }
        axios({
            url:"http://18.216.67.134:5000/User/email",
            data : data,
            method:"POST",
            headers : {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
                "crossDomain"  : true,
            },
        }).then(()=>{
            emailCheckNumber.style.display = "block";
            numberCheck.style.display = "block";
            alert("인증번호를 보냈습니다.")
        })
    }
}

function numCheck(){
    if(emailCheckNumber.value != ""){
        data = {
            email : email.value,
            num : emailCheckNumber.value,
        }
        console.log(data);  
        axios({
            url:"http://18.216.67.134:5000/User/email/auth",
            data : data,
            method:"POST",
            headers : {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
                "crossDomain"  : true,
            },
        }).then(()=>{
            alert("email 체크에 성공하였습니다.")
        })
    }
}

function emailEmptyCheck(){
    if(!email.value){
        alert("이메일이 비어 있습니다.");
        return 1;
    }
}

function nameEmptyCheck(){
    if(!name.value){
        alert("이름이 비어 있습니다.");
        return 1;
    }
}

function passwordEmptyCheck(){
    if(!password.value){
        alert("비밀번호가 비어 있습니다.");
        return 1;
    }
}

function phoneEmptyCheck(){
    if(!phoneNumber.value){
        alert("전화번호가 비어 있습니다.");
        return 1;
    }
} 

function keyPress(e){
    if(e.key === "Enter"){
        clickSignupButton();    
    }
}

button.addEventListener("click",clickSignupButton);
emailCheckButton.addEventListener("click",emailCheck);
numberCheck.addEventListener("click",numCheck);
window.addEventListener("keypress",keyPress);