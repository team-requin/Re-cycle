const server = 'http://18.216.67.134:5000/Cloth/Random';
const webList = document.querySelector('#webList');
const wrap = document.getElementById("wrap");
function listContent(title, size,img) {
    let content = `<div class="list">
        <div class="listImage">
            <img src="http://18.216.67.134:5000/${img}" alt="t-shirts">
        </div>
        <div class="listExplore">
            <div class="listState">
                <p>${title}</p>
                <div>
                    <span>사이즈 : ${size}</span>
                    <span>상태 : A+</span>
                </div>
            </div>
            <div class="listOption">
                <div>
                    <div>
                        <img src="../img/찜목록.png" alt="dibs">
                    </div>
                    <div>
                        <img src="../img/장바구니.png" alt="basket">
                    </div>
                </div>
                <p>구매하기</p>
            </div>
        </div>
    </div>`;
    return content;
}
async function createTenList() {
    await axios({
        method: "GET",
        url: server
    }).then(e => {
        let data = e.data;
        console.log(data);
        for (let i in data) {
            let content = listContent(data[i].title, data[i].size , data[i].image_url);
            webList.insertAdjacentHTML('beforeend', content);
        }

    }).catch(() => {
        alert('페이지를 불러올 수 없습니다.');
        return;
    });
}



function setEvent(){
    test = document.querySelectorAll(".listImage img");
    console.log(test);
    for(let i=0;test.length > i;i++){
        test[i].addEventListener("click",()=>{
            goDetail(test[i].src);
        });
    }
}

function goDetail(img){
    let Expression = /http.*Image/;
    let imgUrl = img.split(Expression);
    setLocalStorage(imgUrl[1]);
    location.href="../itemDetail/itemDetail_mobile.html";
}

function setLocalStorage(url){
    localStorage.setItem("imgUrl",url);
}


document.addEventListener('scroll', () => {
    let scrollY = window.scrollY,
        innerHeight = window.innerHeight,
        bodyHeight = document.body.clientHeight;
    if ((Math.floor((scrollY + innerHeight -100) / 10)) === (Math.floor((bodyHeight -100) / 10))) {
        createTenList();
    }
});

window.onload = async () => {
    await createTenList();
    await setEvent();
}