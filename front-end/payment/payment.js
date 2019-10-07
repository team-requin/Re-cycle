let items = "";
let test = document.getElementById("test");

window.onload = async ()=>{
    await axios({
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

    await axios({
        method:"GET",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        url:"http://18.216.67.134:5000/User/Payment",
    }).then((e)=>{
        items = e.data;
        createNode(items);
    })
}


async function createNode(e){
    let count = 0;
    for(let i in items){
        let IsBorrow = items[i].type;
        let title = items[i].title;
        let img = items[i].url;
        let html = createHTML(IsBorrow,title,img,count);
        await test.insertAdjacentHTML('beforeend',html);
        count++;
    }
    setEvent();
}

function createHTML(IsBorrow,title,img,count){
    let html = "";
    if(IsBorrow === "구매"){
        html = `
        <div class="paymentItem">
            <div class="itemImg">
                <img src="http://18.216.67.134:5000/${img}"/>
            </div>
            <div class="itemInfo">
                <div>
                    <p class="name">${title}</p>
                    <input type="button" value="구매물품" count="${count}" class="none">
                </div>
            </div>
        </div>
        `
    }
    else{
        html = `
        <div class="paymentItem">
            <div class="itemImg">
                <img src="http://18.216.67.134:5000/${img}"/>
            </div>
            <div class="itemInfo">
                <div>
                    <p class="name">${title}</p>
                    <input type="button" value="반납" id="${count}" name="${img}"class="true">
                </div>
            </div>
        </div>
        `
    }
    return html;
}

function setEvent(){
    let item = document.getElementsByClassName("true");
    for(let i=0;i < item.length;i++){
        item[i].addEventListener("click",returnCheck)
    }
}

async function returnCheck(e){
    axios({
        method:"DELETE",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        url:"http://18.216.67.134:5000/Cloth/Borrow",
        data:{
            url:e.target.name,
        }
    }).then(()=>{
        alert("성공적으로 반납 확인 되었습니다.");
    }).catch(()=>{
        alert("반납확인 되지 않았습니다.");
    })
}