//取得DOM
var selectEl = document.querySelector('.selectdist');
var hotArea = document.querySelector('.hotdist');
var list = document.querySelector('.content');
//空陣列 存放過濾後的站存資料，每次渲染完清空
var filterArr = [];

function render(){
    let zoneStr = '';
    let contentStr = '';
    let picUrl = '';
  
    filterArr.forEach(function(item){
       zoneStr = item.Zone;
       picUrl = `url('${item.Picture1}') no-repeat center`;
      
       contentStr +=    `<li>
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
    
    list.innerHTML = `<h2>${zoneStr}</h2>
                      <ul class="showlist">
                         ${contentStr}
                      </ul>`;
}

function filterData(e){
    if(e.target.nodeName == 'INPUT' || e.target.nodeName == 'SELECT'){
        dataAll.forEach(function(item){
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
                return;
            }
        })
        render();
        filterArr = [];
    }else{
        return;
    }
}

selectEl.addEventListener('change',filterData,false);
hotArea.addEventListener('click',filterData,false);
render();