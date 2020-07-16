//取得DOM
var selectEl = document.querySelector('.selectdist');
var hotArea = document.querySelector('.hotdist');
var list = document.querySelector('.content');
//空陣列 存放過濾後的站存資料，每次渲染完清空
var filterArr = [];
//用來存放AJAX回傳陣列
var data;

//使用AJAX串接DATA
axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
  .then(function (response) {
    // handle success
    //console.log(response.data.result.records);
    data = response.data.result.records;
    console.log(typeof data);
    initRender();
    selectEl.addEventListener('change',filterData,false);
    hotArea.addEventListener('click',filterData,false);
  })

//被呼叫更新時渲染畫面
function updateRender(){
    let zoneStr = '';
    let contentStr = '';
    let picUrl = '';
    
    filterArr.forEach(function(item){
      zoneStr = item.Zone;
      picUrl = `url('${item.Picture1}') no-repeat center`;
     
      contentStr +=   `<li>
                          <div class="picblock" style="background:${picUrl}; background-size: cover;">
                              <span class="name">${item.Name}</span>
                              <span class="zone">${item.Zone}</span>
                          </div>
                          <div class="infoblock">
                              <div class="contact">
                                  <span><img src="img/icons_clock.png" alt="clock">${item.Opentime}</span>
                                  <span><img src="img/icons_pin.png" alt="pin">${item.Add}</span>
                                  <span><img src="img/icons_phone.png" alt="phone">${item.Tel}</span>
                              </div>
                              <div class="tag">
                                  <span><img src="img/icons_tag.png" alt="tag">${item.Ticketinfo}</span>
                              </div>
                          </div>
                      </li>`;
    })
    list.innerHTML =  `<h2>${zoneStr}</h2>
                      <ul class="showlist">
                          ${contentStr}
                      </ul>`;
}

//資料判斷過濾，並呼叫更新渲染
function filterData(e){
    if(e.target.nodeName == 'INPUT' || e.target.nodeName == 'SELECT'){
        data.forEach(function(item){
            if(item.Zone == e.target.value){
                filterArr.push({
                    Name:item.Name,
                    Zone:item.Zone,
                    Opentime:item.Opentime,
                    Add:item.Add,
                    Tel:item.Tel,
                    Ticketinfo:item.Ticketinfo,
                    Picture1:item.Picture1
                })
            }
            else{

            }
        })
        updateRender();
        filterArr = [];
    }else{
        return;
    }
}

//網頁載入時渲染畫面
function initRender(){
    let contentStr = '';
    let picUrl = '';

    data.forEach(function(item){
        picUrl = `url('${item.Picture1}') no-repeat center`;
   
        contentStr += `<li>
                          <div class="picblock" style="background:${picUrl}; background-size: cover;">
                              <span class="name">${item.Name}</span>
                              <span class="zone">${item.Zone}</span>
                          </div>
                          <div class="infoblock">
                              <div class="contact">
                                  <span><img src="img/icons_clock.png" alt="clock">${item.Opentime}</span>
                                  <span><img src="img/icons_pin.png" alt="pin">${item.Add}</span>
                                  <span><img src="img/icons_phone.png" alt="phone">${item.Tel}</span>
                              </div>
                              <div class="tag">
                                  <span><img src="img/icons_tag.png" alt="tag">${item.Ticketinfo}</span>
                              </div>
                          </div>
                      </li>`;
    })
    list.innerHTML =  `<h2>${"全部資料"}</h2>
                      <ul class="showlist">
                          ${contentStr}
                      </ul>`;
}