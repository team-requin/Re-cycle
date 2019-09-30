window.onload = ()=>{
    axios({
        method:"POST",
        url:"http://18.216.67.134:5000/User/login/refresh",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("refreshToken")}`,
        }
    }).then((e)=>{
        localStorage.setItem("token",e.data.access_token);
    });
}

const titleInput = document.querySelector(".itemTitle input");

const sizeButtons = document.querySelectorAll(".sizeButtons label");
const sizeInput = document.querySelectorAll(".sizeButtons label input");

const stateButtons = document.querySelectorAll(".stateButtons label");
const stateInput = document.querySelectorAll(".stateButtons label input");

const priceInput = document.querySelector("#Price input");

const explainInput = document.getElementById("itemExplainArea");

const mainImgInput = document.querySelector("#itemMainImgDiv div input");
const mainImgDiv = document.getElementById("itemMainImgDiv"); 
const mainImgOutPut = document.querySelector("#itemMainImgDiv div img");

const submitButton = document.querySelector("#submitButton input");


const categoryButton = document.querySelectorAll(".categoryButtons label img");
let title = ""
let state = "";
let size = "";
let price = 0;
let explain = "";
let category = "";
let url = "";
let FILE = "";

function titleChange(e){
    title = titleInput.value;
}

function mainImgUpload(e){
    mainImgInput.click();
}

function mainImgInputChange(e){
    let fileList = e.target;
    let reader = new FileReader();
    reader.onload = ()=>{
        url = reader.result;
        FILE = fileList.value;
        mainImgOutPut.src = url;
        mainImgOutPut.style.display = "block";
        let q = document.querySelectorAll("#itemMainImgDiv div p");
        for(let i of q){
            i.style.display = "none";
        }
    }
    reader.readAsDataURL(fileList.files[0]);
}

function explainInputChange(e){
    explain = e.target.value;
}

function priceInputChange(e){
    price = parseInt(e.target.value);
}

function sizeInputChange(e){
    size = e.target.value;
}

function stateInputChange(e){
    state = e.target.value;
}

function sizeButtonsClick(e){
    if(e.target.tagName !== "LABEL"){
        return;
    }
    for(let i of sizeButtons){
        i.style.color = "#4AB781";
        i.style.backgroundColor = "#F3F3F3";
    }
    e.target.style.backgroundColor = "#4AB781";
    e.target.style.color = "white";
}

function stateButtonsClick(e){
    if(e.target.tagName !== "LABEL"){
        return;
    }
    for(let i of stateButtons){
        i.style.color = "#4AB781";
        i.style.backgroundColor = "#F3F3F3";
    }
    e.target.style.backgroundColor = "#4AB781";
    e.target.style.color = "white";
}

function categoryButtonClick(e){
    console.log(e);
    for(let i of categoryButton){
        i.src = `../img/${i.id}_off.png`;
    }
    e.target.src = `../img/${e.target.id}_on.png`;
    category = e.target.id;
}

function submitButtonClick(){
    let data = {
        "file" : "C:\\Users\\user\\Desktop\\sw개발자대회\\front-end\\img\\Shoes_on ",
        "title" : title,
        "description" : explain,
        "size" : size,
        "first_date" : "",
        "price" : price,
    };
    axios({
        url:`http://18.216.67.134:5000/Cloth/Register/${category}`,
        data:data,
        method:"POST",
        headers : {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },  
    })
}

for(let i of sizeInput){
    i.addEventListener("change",sizeInputChange);
}

for(let i of sizeButtons){
    i.addEventListener("click",sizeButtonsClick);
}

for(let i of stateButtons){
    i.addEventListener("click",stateButtonsClick);
}

for(let i of stateButtons){
    i.addEventListener("click",stateInputChange);
}

for(let i of categoryButton){
    i.addEventListener("click",categoryButtonClick);
}

priceInput.addEventListener("change",priceInputChange);

explainInput.addEventListener("change",explainInputChange);

mainImgDiv.addEventListener("click",mainImgUpload);

mainImgInput.addEventListener("change",mainImgInputChange);

submitButton.addEventListener("click",submitButtonClick);

titleInput.addEventListener("change",titleChange);

