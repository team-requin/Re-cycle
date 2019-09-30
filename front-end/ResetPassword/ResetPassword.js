function checkPassword() {
    const password = document.getElementById('password').value;
    const checkPassword = document.getElementById('checkPassword').value;
    const token = localStorage.getItem("token");

    if(password === checkPassword) {
        axios({
            method: "PUT",
            url: "http://18.216.67.134:5000/User/signup",
            data: {
                "password": password,
                "password_check": checkPassword
            },
            headers: {
                "Authorization": "Bearer " + token
            } 
        }).then((e) => {
            alert("비밀번호가 재설정되었습니다.");
            location.href = "./main.html";
        }).catch((e) => {
            alert("비밀번호가 일치하지 않습니다.\n다시 확인해주세요."); 
        })
    } else {
        return alert("비밀번호가 일치하지 않습니다.\n다시 확인해주세요.");
    }
}
const button = document.getElementById('ResetPasswordButton');
button.addEventListener("click", checkPassword);