const price = document.getElementById("price");
const state = document.getElementById("state");
const size = document.getElementById("size");
const seller = document.getElementById("seller");
const title = document.getElementById("title");
const itemImg = document.querySelector("#itemImg img");
const explain = document.getElementById("explain");
const basket = document.querySelectorAll("#itemButtons input")[0];
const borrow = document.querySelectorAll("#itemButtons input")[1];
const buy = document.querySelectorAll("#itemButtons input")[2];

window.onload = async ()=>{
    let imgUrl = localStorage.getItem("imgUrl");
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
        url:`http://18.216.67.134:5000/Cloth/Specific${imgUrl}`
    }).then((e)=>{
        setData(e.data);
    })
    .catch(()=>{
        alert("옷을 고르고 접근해주세요.");
        location.href="../view/view_mobile.html";
    });

}



function setData(e){
    title.innerText = e.title;
    itemImg.src = `http://18.216.67.134:5000/${e.image_url}`; 
    seller.innerText = e.name;
    size.innerText = `사이즈 : ${e.size}`;
    explain.innerText = e.description;
    price.innerText = `${e.price}원`
    state.innerText = `상태 : ${e.status}`;
}

function goBasket(){
    let url = localStorage.getItem("imgUrl");
    axios({
        method:"POST",
        data:{
            url:`Cloth/Image${url}`,
        },
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        url:"http://18.216.67.134:5000/Cloth/Basket"
    }).then(()=>{
        alert("장바구니에 물건이 담겼습니다.");
    }).catch((e)=>{
        let a = /Request.*code /;
        let code = e.message.split(a)[1];
        if(code === "413"){
            alert("이미 물건이 장바구니에 있습니다");
        }
        else{
            alert("오류가 났습니다");
        }
    })
}

function goBuy(){
    let url = localStorage.getItem("imgUrl");
    axios({
        method:"POST",
        url:"http://18.216.67.134:5000/Cloth/Buy",
        data:{
            url:`Cloth/Image${url}`,
        },
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    }).then(()=>{
        alert("구매 되었습니다.");
        location.href="../view/view_mobile.html";
    }).catch(()=>{
        alert("구매 중 오류가 발생했습니다.");
    })
}

function goBorrow(){
    let url = localStorage.getItem("imgUrl");
    axios({
        method:"POST",
        url:"http://18.216.67.134:5000/Cloth/Borrow",
        data:{
            url:`Cloth/Image${url}`,
        },
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    }).then(()=>{
        alert("대여 되었습니다.");
        location.href="../view/view_mobile.html";
    }).catch(()=>{
        alert("대여 중 오류가 발생했습니다.");
    })
}

basket.addEventListener("click",goBasket);
buy.addEventListener("click",goBuy);
borrow.addEventListener("click",goBorrow);