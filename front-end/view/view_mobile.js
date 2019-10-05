const item = document.querySelectorAll(".item");
let more = document.getElementsByClassName("more");
let LastestItemImg;
let recommendItemImg;

window.onload = async ()=>{
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
    await getItem();
    setEvent();
}


function createNode(url,index){
    let items = document.createElement("div");
    let img = document.createElement("img");
    img.src = url;
    items.classList.add("itemDiv");
    items.appendChild(img);
    item[index].appendChild(items);
}

async function getItem(){
    await axios({
            method:"GET",
            url:"http://18.216.67.134:5000/Cloth/Latest",
        }).then((e)=>{  
            LastestItemImg = e.data;
            for(let i in LastestItemImg){
                createNode(`http://18.216.67.134:5000/${LastestItemImg[i].image_url}`,0,LastestItemImg[i].title);
            }
        })

    await axios({
        method:"GET",
        url:"http://18.216.67.134:5000/Cloth/Random"
    }).then((e)=>{
        recommendItemImg = e.data;
        for(let i in recommendItemImg){
            createNode(`http://18.216.67.134:5000/${recommendItemImg[i].image_url}`,1,recommendItemImg[i].title);
        }
    })
}

function itemClick(e){
    let imgUrl = e.target.src;
    let Expression = /http.*Image/;

    imgUrl = imgUrl.split(Expression);
    setLocalStorage(imgUrl[1])
    console.log(imgUrl);
    goDetail();
}

function setEvent(){
    let items = document.querySelectorAll(".itemDiv");
    for(let i of items){
        i.addEventListener("click",itemClick);
    }
    for(let i of more){
        i.addEventListener("click",moreClick);
    }
}

function setLocalStorage(url){
    // location.href= `../itemDetail/itemDetail.html${url}`;
    localStorage.setItem("imgUrl",url);
}

function goDetail(){
    location.href="../itemDetail/itemDetail_mobile.html";
}

function moreClick(){
    location.href="../more/more.html";
}