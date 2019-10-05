const searchButton = document.getElementById("inputIcon");
const input = document.getElementById("input");
const wrap = document.getElementById("wrap");
let test;

function search(){
    let word = input.value;
    server(word);
}

function returnUrl(word){
    let url = encodeURI(word);
    return `http://18.216.67.134:5000/Cloth/Search/${url}`
}

function server(word){
    let url = returnUrl(word);
    axios({
        method:"GET",
        url:url,
    }).then(e=>{
        if(Object.keys(e.data).length === 0){
            alert("검색결과가 없습니다.")
        }
        setItem(e.data);
    })
}

function setItem(items){
    deleteNode();
    for(let i in items){
        createNode(items[i].image_url);
    }
    setEvent();
}

function createNode(img){
    let items = document.createElement("div");
    let itemImg = document.createElement("img");
    itemImg.src = `http://18.216.67.134:5000/${img}`;
    items.classList.add("item");
    items.appendChild(itemImg);
    wrap.appendChild(items);
}

function setEvent(){
    test = document.querySelectorAll(".item img");
    for(let i=0;test.length > i;i++){
        test[i].addEventListener("click",()=>{
            goDetail(test[i].src);
        });
    }
}

function goDetail(url){
    let Expression = /http.*Image/;
    let imgUrl = url.split(Expression);
    localStorage.setItem("imgUrl",imgUrl[1]);
    location.href="../itemDetail/itemDetail_mobile.html";
}

function deleteNode(){
    test = document.querySelector(".item");
    if(test){
        while(wrap.hasChildNodes()){
            wrap.removeChild(wrap.childNodes[0]);
        }
    }
}

searchButton.addEventListener("click",search);