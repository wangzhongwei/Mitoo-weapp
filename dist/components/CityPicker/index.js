Component({options:{multipleSlots:!0},properties:{placeholder:{type:String,value:""},cities:{type:Object,value:{}},visible:{type:Boolean,value:!1}},data:{pinyin:[],firstChar:[],scrollTop:0,searchFlag:!1,searchCityList:[]},methods:{goChar:function(t){let e=`#view_${t.currentTarget.dataset.item}`;new Promise((t,e)=>{wx.createSelectorQuery().selectViewport().scrollOffset(e=>{t(e)}).exec()}).then(t=>{wx.createSelectorQuery().in(this).select(e).boundingClientRect(e=>{this.setData({scrollTop:t.scrollTop+e.top}),wx.pageScrollTo({scrollTop:this.data.scrollTop})}).exec()})},goTop:function(t){wx.pageScrollTo({scrollTop:0})},search:function(t){let e=t.detail.value;if(e.length){let t=[],i=this.properties.cities.data.cityList;for(let s of i)s.pinyin.length>=e.length&&s.pinyin.substring(0,e.length)===e&&t.push(s),s.name.length>=e.length&&s.name.substring(0,e.length)===e&&t.push(s);this.setData({searchCityList:t}),this.setData({searchFlag:!0})}else this.setData({searchFlag:!1})},selectItem(t){console.log(t.currentTarget.dataset.index),this.triggerEvent("select",t.currentTarget.dataset.index)},cancel(t){this.triggerEvent("cancel",t)},selectCurrentCity(){let t=this.properties.cities.data.cityList;for(let e of t)if(console.log(e.name,this.data.city),e.name===this.data.city.substring(0,e.name.length)){this.triggerEvent("select",e.id);break}}},attached(){let t={};for(let e of this.properties.cities.data.cityList)e.pinyin[0].toUpperCase()in t==!1&&(t[e.pinyin[0].toUpperCase()]=[]),t[e.pinyin[0].toUpperCase()].push(e);let e=[],i=[];for(let s=65;s<91;s++)if(void 0!==t[String.fromCharCode(s)]){i.push(String.fromCharCode(s));let a=t[String.fromCharCode(s)].sort((t,e)=>t.rank<e.rank);e.push({charCode:String.fromCharCode(s),array:a})}this.setData({pinyin:e,firstChar:i}),wx.getLocation({type:"wgs84",success:t=>{wx.request({url:`https://api.map.baidu.com/geocoder/v2/?location=${t.latitude},${t.longitude}&output=json&pois=1&ak=T7mfZA5WUbqCbxx80aP8ZXaNVS919Paw`,dataType:"json",header:{"content-type":"application/json"},method:"GET",success:t=>{this.setData({city:t.data.result.addressComponent.city})}})}})}});