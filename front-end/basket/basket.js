let items = "";
let test = document.getElementById("test");
let checkedList = {};
let priceList = {};
let totalPrice = 0;
let allPrice = document.getElementById("allPrice");
let buy = document.getElementById("buy");
let deleteNode = document.getElementById("delete");

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
        url:"http://18.216.67.134:5000/Cloth/Basket"
    }).then((e)=>{
        items = e;
        // test.insertAdjacentHTML('beforeend', content);
        createNode(items.data);
    })
}


async function createNode(e){
    let count = 0;
    for(let i in e){
        let title = e[i].title;
        let price = e[i].price;
        let img = e[i].image_url;
        await test.insertAdjacentHTML('beforeend',createHTML(title,price,img,count));
        setPrice(count,price);
        count++;
    }
    await setEvent();
}

function createHTML(title,price,img,count){
    let html = `
    <div class="basketItem">
        <div class="itemCheckBoxDiv">
            <input type="checkbox" class="itemCheckBox" id="${img}" name="${count}">
        </div>
        <div class="itemImg">
            <img src="http://18.216.67.134:5000/${img}"/>
        </div>
        <div class="itemInfo">
            <div>
                <p class="name">${title}</p>
                <p class="price">상품금액 : ${price}</p>
            </div>
        </div>
    </div>
    `
    return html;
}

function setEvent(){
    let basketItem = document.querySelectorAll(".basketItem .itemImg img");
    let checkBox = document.querySelectorAll(".itemCheckBox");
    for(let i=0;i < basketItem.length;i++){
        basketItem[i].addEventListener("click",itemClick);
    }
    for(let i=0;i < checkBox.length;i++){
        checkBox[i].addEventListener("change",checkBoxClick);
    }
}

function itemClick(e){
    let url = e.target.src.split(/http.*Image/);
    localStorage.setItem("imgUrl",url[1]);
    location.href="../itemDetail/itemDetail_mobile.html";
}

function checkBoxClick(e){
    if(e.target.value == "on"){
        e.target.value = "off"
        checkedList[e.target.name] = e.target.id;
        totalPrice += priceList[e.target.name];
    }
    else{
        e.target.value = "on";
        delete checkedList[e.target.name];
        totalPrice -= priceList[e.target.name];
    }
    allPrice.innerText = `${totalPrice}원`
}

function setPrice(id,price){
    priceList[id] = price;
}

async function goBuy(){
    let flag = 0;
    for(let i in checkedList){
        await axios({
            method:"POST",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            data:{
                url:checkedList[i],
            },
            url:"http://18.216.67.134:5000/Cloth/Buy",
        }).then(async ()=>{
            flag++;
            if(checkFlag(flag)){
                alert("구매에 성공하였습니다.");
                await goDelete();
                location.href="../basket/basket.html";
            }
        })
    }
}

async function goDelete(){
    let flag = 0;
    for(let i in checkedList){
        await axios({
            method:"DELETE",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            data:{
                url:checkedList[i],
            },
            url:"http://18.216.67.134:5000/Cloth/Basket",
        }).then(()=>{
            flag++;
            if(checkFlag(flag)){
                location.href="../basket/basket.html";
            }
        })
    }
}

function checkFlag(flag){
    if(flag == Object.keys(checkedList).length){
        return true;
    }
}

buy.addEventListener("click",goBuy);
deleteNode.addEventListener("click",goDelete);