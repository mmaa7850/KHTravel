let data;
let area = [];
let list = document.querySelector(".viewPoint .row");
let goTop = document.querySelector(".goTop");
let zone = document.querySelector(".header select");
let hotDistrict = document.querySelector(".hotDistrict");
let pageBtn = document.querySelector(".pageBtn");
let xhr = new XMLHttpRequest();


// click function
goTop.addEventListener("click", goTOP);
hotDistrict.addEventListener("click", HotDistrict);
zone.addEventListener("change", changeZone);

xhr.open("GET", "https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c", true);
xhr.send(null);
xhr.onload = function () {
    data = JSON.parse(xhr.responseText).data.XML_Head.Infos.Info;
    loadZone();
    updateList(data);
}

// 載入行政區
function loadZone(e) {
    let result;
    for (let i = 0; i < data.length; i++) {
        let str = data[i].Add;
        let zone = str.split("")[6] + str.split("")[7] + str.split("")[8];
        area.push(zone);
        result = area.filter(function (element, index, arr) {
            return arr.indexOf(element) === index;
        });
    }
    let str = "<option>--請選擇行政區--</option>";
    for (let i = 0; i < result.length; i++) {
        str += `<option value=${result[i]}>${result[i]}</option>`;
    }
    zone.innerHTML = str;
}

// 切換行政區
function changeZone(e) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        if (area[i] == e.target.value) {
            let ticket = "";
            let ticketInfo = "";
            if (data[i].Ticketinfo == "") {
                ticket = "免費參觀";
                ticketInfo = "免費參觀";
            }
            else {
                ticket = "有額外消費資訊";
                ticketInfo = data[i].Ticketinfo;
            }
            str += `<div class="col">
        <div class="card h-100">
          <div class="card-header d-flex text-white justify-content-between align-items-end"
            style="background-image: url(${data[i].Picture1}) ;">
            <h3>${data[i].Name}</h3>
            <h4>${area[i]}</h4>
          </div>
          <div class="card-body">
            <div class="time mb-3">
              <img src="images/icons_clock.png" alt="" class="me-2">
              ${data[i].Opentime}
            </div>
            <div class="address mb-3">
              <img src="images/icons_pin.png" alt="" class="me-2">
              ${data[i].Add}
            </div>
            <div class="phone">
              <img src="images/icons_phone.png" alt="" class="me-2">
              ${data[i].Tel}
            </div>
          </div>
          <span class="tag">
            <img src="images/icons_tag.png" alt="" class="me-2">
            ${ticket}
            <span class="tagText text-center p-2 bg-primary text-white">
            ${ticketInfo}
            </span>
          </span>
        </div>
      </div>`;
        }
    }
    list.innerHTML = str;
}

// 點擊熱門景點
function HotDistrict(e){
    if(e.target.getAttribute("data-name") == null){
        return;
    }
    let str = "";
    for (let i = 0; i < data.length; i++) {
        if (area[i] == e.target.getAttribute("data-name")) {
            let ticket = "";
            let ticketInfo = "";
            if (data[i].Ticketinfo == "") {
                ticket = "免費參觀";
                ticketInfo = "免費參觀";
            }
            else {
                ticket = "有額外消費資訊";
                ticketInfo = data[i].Ticketinfo;
            }
            str += `<div class="col">
        <div class="card h-100">
          <div class="card-header d-flex text-white justify-content-between align-items-end"
            style="background-image: url(${data[i].Picture1}) ;">
            <h3>${data[i].Name}</h3>
            <h4>${area[i]}</h4>
          </div>
          <div class="card-body">
            <div class="time mb-3">
              <img src="images/icons_clock.png" alt="" class="me-2">
              ${data[i].Opentime}
            </div>
            <div class="address mb-3">
              <img src="images/icons_pin.png" alt="" class="me-2">
              ${data[i].Add}
            </div>
            <div class="phone">
              <img src="images/icons_phone.png" alt="" class="me-2">
              ${data[i].Tel}
            </div>
          </div>
          <span class="tag">
            <img src="images/icons_tag.png" alt="" class="me-2">
            ${ticket}
            <span class="tagText text-center p-2 bg-primary text-white">
            ${ticketInfo}
            </span>
          </span>
        </div>
      </div>`;
        }
    }
    list.innerHTML = str;
    
}


// 印出景點
function updateList(e) {
    let str = "";
    for (let i = 0; i < 6; i++) {
        let dataZone = data[i].Add;
        let ticket = "";
        let ticketInfo = "";
        if (data[i].Ticketinfo == "") {
            ticket = "免費參觀";
            ticketInfo = "免費參觀";
        }
        else {
            ticket = "有額外消費資訊";
            ticketInfo = data[i].Ticketinfo;
        }
        str += `<div class="col">
        <div class="card h-100">
          <div class="card-header d-flex text-white justify-content-between align-items-end"
            style="background-image: url(${data[i].Picture1}) ;">
            <h3>${data[i].Name}</h3>
            <h4>${dataZone.split("")[6] + dataZone.split("")[7] + dataZone.split("")[8]}</h4>
          </div>
          <div class="card-body">
            <div class="time mb-3">
              <img src="images/icons_clock.png" alt="" class="me-2">
              ${data[i].Opentime}
            </div>
            <div class="address mb-3">
              <img src="images/icons_pin.png" alt="" class="me-2">
              ${data[i].Add}
            </div>
            <div class="phone">
              <img src="images/icons_phone.png" alt="" class="me-2">
              ${data[i].Tel}
            </div>
          </div>
          <span class="tag">
            <img src="images/icons_tag.png" alt="" class="me-2">
            ${ticket}
            <span class="tagText text-center p-2 bg-primary text-white">
            ${ticketInfo}
            </span>
          </span>
        </div>
      </div>`;
    }
    list.innerHTML = str;

    // <div class="col">
    //         <div class="card">
    //           <div class="card-header d-flex text-white justify-content-between align-items-end"
    //             style="background-image: url(https://raw.githubusercontent.com/hexschool/KCGTravel/master/image/%E4%B8%89%E6%B0%91%E5%8D%80/%E4%B8%AD%E9%83%BD%E6%BF%95%E5%9C%B0%E5%85%AC%E5%9C%9207.jpg) ;">
    //             <h3>中都愛河濕地公園</h3>
    //             <h4>三民區</h4>
    //           </div>
    //           <div class="card-body">
    //             <div class="time mb-3">
    //               <img src="images/icons_clock.png" alt="" class="me-2">
    //               全天候開放
    //             </div>
    //             <div class="address mb-3">
    //               <img src="images/icons_pin.png" alt="" class="me-2">
    //               高雄市三民區同盟三路與十全三路交叉處
    //             </div>
    //             <div class="phone">
    //               <img src="images/icons_phone.png" alt="" class="me-2">
    //               886-7-7995678
    //             </div>
    //           </div>
    //           <span class="tag">
    //             <img src="images/icons_tag.png" alt="" class="me-2">
    //             免費參觀
    //           </span>
    //         </div>
    //       </div>
}

// 頁數控制



// 回到頁首
function goTOP(e) {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}