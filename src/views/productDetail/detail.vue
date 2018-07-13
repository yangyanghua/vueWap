<template>
	<div>
		<div class="delBox" id="delBox">
			<div class="delHeader clearfix" v-if="showHeader" id="delHeader">
				<div class="fl lt">
					<p class="p1">打开码上花App</p>
					<p class="p2">新用户专享优惠</p>
					<img src="../../assets/images/defaultImg.png" class="mshPic pos">
					<span class="dele pos" @click="deleHeader"></span>
				</div>
				<div class="fr rt" @click="toDownLoad">立即打开</div>
			</div>
			<div class="delMain" ref="delMain" id="delMain" @scroll="test($event)" >
				<section id="del-main-content">
					<div class="banner">
						<div class="swiper-container" style="height: 100%;" v-show="imgLoadFinished">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="img in goodItem.images" v-if="goodItem.images.length > 0">
									<!-- <img :src="img.url" alt="" v-if="img.url" v-imgLoad="{url: img.url,showImg: isShow}" style="display: none;"> -->
									<img :src="img.url" alt="" v-if="img.url">
								</div>
								<!-- <div class="swiper-slide">
									<img src="../../assets/images/Hydrangeas.jpg" alt="">
								</div> -->
								<!-- <div class="swiper-slide">
									<img src="../../assets/images/Jellyfish.jpg" height="768" width="1024" alt="">
								</div>
								<div class="swiper-slide">
									<img src="../../assets/images/Koala.jpg" height="768" width="1024" alt="">
								</div> -->
							</div>
							<div class="swiper-pagination"></div>
						</div>
						<div class="yImg" v-show="!imgLoadFinished">
							<img src="../../assets/images/loadingLogo.jpg" alt="">
						</div>
						<img class="back spanIcon" src="../../assets/images/backof.png" @click="backof"></img>
						<img class="person spanIcon" src="../../assets/images/Group-4-Copy-2.png" @click="toPerson"></img>
					</div>
					<div class="delMain-msg">
						<div class="padd msg bg">
							<p class="price">¥&nbsp;&nbsp;{{currentGoodData.price}}</p>
							<!-- <p class="description" v-description>古井贡酒年份原浆 献礼版 50度 整箱装白酒 口感浓香型(新老包装随机分配)</p> -->
							<!-- <p class="description">{{name | desc}}</p> -->
							<p class="description">{{goodItem.name | desc}}</p>
						</div>
						<!-- <div class="bg">&nbsp;</div> -->
						<div class="certification padd bg" v-if="goodItem.traceUrl" @click="toTrace(goodItem.traceUrl)">
							<div class="content">
								<p class="top">已通过真知码品质认证</p>
								<ul>
									<li>
										<i></i>真知码认证
									</li>
									<li><i class="ic2"></i>工厂溯源</li>
									<li><i class="ic3"></i>真品保证</li>
								</ul>
							</div>
							<i class="arrow-right"></i>
							<img src="../../assets/images/pzlm.png" alt="" class="pz-logo">
						</div>
						<!-- <div class="bg">&nbsp;</div> -->
						<div class="offer sec bg" @click="showItem(0)" ref="offer" v-if="goodItem.feeInfo.length > 0" v-for="info in sliceFee">
							<span class="tips label">店铺优惠</span>
							<!-- <p :class="{'minp':!showDel[0], 'msg': 1}">满100元减10元，满200元减20元，满500减100元，满1000元减200元，满100元减10元，满200元减20元，满500减100元，满1000元减200元</p> -->
							<p :class="{'minp':!showDel[0], 'msg': 1}">{{feeing}}</p>
							<i :class="{'arrow-right': 1, 'arrow-down': showDel[0]}"></i>
						</div>
						<div class="sec bg" @click="showItem(1)" ref="msf">
							<span class="label">码上分期</span>
							<p class="msg">{{goodItem.stagingInfo.desc[goodItem.stagingInfo.desc.length -1]}}</p>
							<i :class="{'arrow-right': 1, 'arrow-down': showDel[1]}"></i>
						</div>
						<ul :class="{'staging': 1, 'disappear': !showDel[1], 'bg': 1}" ref="staging">
							<!-- <li>
								<p class="p1">不分期</p>
								<p class="p2">无服务费</p>
							</li>
							<li>
								<p class="p1">￥170.01×3期</p>
								<p class="p2">含手续费：每期￥3.34</p>
							</li>
							<li>
								<p class="p1">￥170.01×3期</p>
								<p class="p2">含手续费：每期￥3.34</p>
							</li>
							<li class="none">
								<p class="p1">￥170.01×3期</p>
								<p class="p2">含手续费：每期￥3.34</p>
							</li> -->
							<li v-for="(detail,index) in goodItem.stagingInfo.detail">
								<p class="p1">{{detail.indexOf(',') > -1 ? detail.split(',')[0] : detail.split('，')[0]}}</p>
								<p class="p2">{{detail.indexOf(',') > -1 ? detail.split(',')[1] : detail.split('，')[1]}}</p>
							</li>
						</ul>
						<!-- <div class="bg">&nbsp;</div> -->
						<div class="specification sec bg delMargin" @click="showItem(2)" ref="specification" v-if="showAttr.length > 0">
							<span class="label">选择规格</span>
							<p class="msg">请选择商品规格</p>
							<i :class="{'arrow-right': 1, 'arrow-down': showDel[2]}"></i>
						</div>
						<ul :class="{'sku': 1, 'bg': 1, 'disappear': !showDel[2]}" ref="sku">
							<li v-for="(item,index) in showAttr" class="guige">
								<!-- <h3>{{getKey(item).substr(-2,2)}}</h3> -->
								<h3>{{getKey(item)}}</h3>
								<div>
									<span v-for="(itemAttr,idx) in getSkuList(item,index)" @click="selectKeyId(index,itemAttr,idx)" :class="{disable: (stockList[index] ? stockList[index][idx][itemAttr] : 1) == 0 }">{{item[getKey(item)][itemAttr]}}</span>
								</div>
							</li>
							<li>
								<!-- <h3>数量<i>(库存 2件)</i></h3> -->
								<h3>库存{{stock}}件</i></h3>
								<div>
									<i class="inblk" @click="decrease">-</i>
									<!-- <input type="text" class="inblk" :value="goodsQty" v-model="goodsQty"> -->
									<input type="text" class="inblk" v-model="goodsQty" @blur="testVal" ref="goodsQty">
									<i class="inblk" @click="increase">+</i>
								</div>
							</li>
						</ul>
						<div class="bgLine"></div>
					</div>
					<div class="delMain-pic">
						<p class="p1" id="graphicDel"><i></i>&nbsp;&nbsp;上拉查看图文详情</p>
						<!-- <iframe :src="detailUrl + '&sharingType=mshH5' " v-if="detailUrl"></iframe> -->
						<iframe :src="goodItem.detailUrl+ '&sharingType=mshH5' " v-if="goodItem.detailUrl && isLoad" ref="iframe"></iframe>
					</div>
				</section>
			</div>
			<div class="delFooter" @click="purchase" id="delFooter" v-if="hasSku">一键购买</div>
			<div class="delFooter" @click="rackOff" id="delFooter" v-if="!hasSku">一键购买</div>
			<div class="wx-tip" v-if="showWxTip" @click="shutDownTips">
				<img src="../../assets/images/wx_tip.png" alt="请点击右上角选择在浏览器打开" class="wx">
				<p class="wx">请点击右上角</br>选择在浏览器中打开</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {deltailPro, deltailSku, deltailPurchase, chectProduct } from './server.js'
	export default {
		data(){
			return {
				showDel: [false,false,false],
				productId: '',
				currentShowId: 100,
				currentShow: false,
				showHeader: true,
				hasSku: false,
				showWxTip: false,
				// isShow: false,
				skuAttrList:[],
				skuList: [],
				stock: 0,
				idList: [], //规格的id集合
				selectedId: [],
				stockList: [],
				goodData: '',
				goodDataList: [],
				currentGoodData: {
					attrInfo: '',
					id: '',
					img: '',
					name: '',
					price: 0,
					stock: '',
				},
				goodItem: {
					name: '',
					traceUrl: '',
					feeInfo: [],
					stagingInfo: {
						desc: ['分期'],
						detail: []
					},
					images: [],
					detailUrl: '',
					entId: ''
				},
				// name: '',
				// traceUrl: '', //溯源地址
				// feeInfo: [], //优惠信息
				// stagingInfo: {
				// 	desc: ['分期'],
				// 	detail: []
				// },
				goodsQty: 1,
				unitPrice: '', //单价
				// imgList: [], //图片集合
				userInfo: JSON.parse(sessionStorage.getItem('user')),
				// detailUrl: '',
				isLoad: false,
				count: 0,
				imgLoadFinished: false,
			}
		},
		computed: {
			showAttr: function(){
				return this.skuAttrList
			},
			feeing: function(){
				if(this.goodItem.feeInfo.length > 0){
					let arr = [];
					this.goodItem.feeInfo.forEach(x => {
						arr.push(x.desc);
					});
					return arr.join(',')
				}
				return '';
			},
			sliceFee: function(){
				let arr = [];
				return arr.push(this.goodItem.feeInfo[0])
			}
		},
		filters: {
			desc: function(val){
				// console.log('value----',val.length);
				if(val.length >= 38){
					return val.slice(0,35) + '...'
				}
				return val;
			}
		},
		watch: {
			count(val,oldVal){
				// console.log('count----',val,oldVal);
				if(val === this.goodItem.images.length){
					this.imgLoadFinished = true;
					var mySwiper = new Swiper('.swiper-container',{
						autoplay: 3000,
						loop: true,
						pagination: '.swiper-pagination',
						observer:true,//修改swiper自己或子元素时，自动初始化swiper 
					    observeParents:true,//修改swiper的父元素时，自动初始化swiper 
					    // onSlideChangeEnd: function(swiper){ 
					    //     swiper.update(); //swiper更新
					    // } 
					})
				}
			}
		},
		methods: {
			test(el){
				let element = el.target;
				let delHeaderHeight = document.getElementById('delHeader') ? document.getElementById('delHeader').offsetHeight : '0';
			 	let delFooterHeight = document.getElementById('delFooter').offsetHeight;
			 	 let delMainContentHeight = document.getElementById('del-main-content').offsetHeight;
				// console.log(element.target.offsetHeight);
				let windowHeight = document.body.offsetHeight;
				let height = element.offsetHeight;
				// console.log('height',delHeaderHeight,delMainContentHeight,delFooterHeight,height,element.scrollTop,delMainContentHeight-height)
				let setTop;
				let paddingBottom;
				let marginBottom;
				let requestFram;
				let oldScrollTop;

				// element.addEventListener('scroll',() => {
				//     height = element.offsetHeight;
				//     console.log('scrol-----',document.documentElement.dataset.dpr)
				//    loadMore();
				// }, false)
				//运动开始时获取元素 高度 和 offseTop, pading, margin
				element.addEventListener('touchstart',() => {
				    height = element.offsetHeight;
				    setTop = element.offsetTop;
				    paddingBottom = this.getStyle(element,'paddingBottom');
				    marginBottom = this.getStyle(element,'marginBottom');
				},{passive: true})

				//运动过程中保持监听 scrollTop 的值判断是否到达底部
				element.addEventListener('touchmove',() => {
				   loadMore();
				},{passive: true})

				//运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
				element.addEventListener('touchend',() => {
				    oldScrollTop = element.scrollTop;
				    moveEnd();
				},{passive: true})

				const moveEnd = () => {
				    requestFram = requestAnimationFrame(() => {
				        if (element.scrollTop != oldScrollTop) {
				            oldScrollTop = element.scrollTop;
				            loadMore();
				            moveEnd();
				        }else{
				            cancelAnimationFrame(requestFram);
				            //为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
				            height = element.offsetHeight;
				            loadMore();
				        }
				    })
				}
				// console.log(element.scrollTop,delMainContentHeight, height, delMainContentHeight-height);
				const loadMore = () => {
				    if (element.scrollTop >= delMainContentHeight-height ) {
				    	// console.log('has start ',element.scrollTop,delMainContentHeight-height,delMainContentHeight, height );
				    	// this.$loading.start();
				    	setTimeout(() => {
				    		// this.$loading.end();
					        this.isLoad = true;
					        document.querySelector('#graphicDel').innerHTML = '图文详情';
				    	},200);
				    }
				}
				loadMore();
			},
			getStyle(element,attr,NumberMode = 'int'){
				let target;
				// scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
				if (attr === 'scrollTop') {
				    target = element.scrollTop;
				}else if(element.currentStyle){
				    target = element.currentStyle[attr];
				}else{
				    target = document.defaultView.getComputedStyle(element,null)[attr];
				}
				//在获取 opactiy 时需要获取小数 parseFloat
				return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
			},
			purchase(){
				// console.log('you have touched!',this.selectedId,this.skuList,this.skuAttrList);
				let filSelected = this.selectedId.filter(x => Boolean(x));
				if(filSelected.length < this.skuAttrList.length){
					this.$message({
				     	message: '请选择规格！',
				     	time: 1000
				   	})
					return false;
				}else if(this.stock <= 0){
					this.$message({
				     	message: '该商品库存不足',
				     	time: 1000
				   	});
				   	return false;
				}
				if(!this.userInfo){
					// this.$router.push({
					// 	// path: '/login',
					// 	name: 'login',
					// 	params: {
					// 		productId: this.productId
					// 	}
					// });
					this.$router.push({
						path: `/login/${this.productId}`
						
					});
					return false;
				}
				this.$loading.start();
				let params = {
					saleEntId: this.goodItem.entId,
					time: new Date().getTime(),
					productId: this.productId,
					goodsid: this.currentGoodData.id,
					count: Number(this.goodsQty),
					imei: this.userInfo.imei,
					key: this.userInfo.key,
					sysid: 'sg',
					v: '8.8.9',
					version: '8.8.9',
					s: 0
				}
				let checkPar = {
					goodsId: this.currentGoodData.id,
					count: Number(this.goodsQty),
					time: new Date().getTime(),
					imei: this.userInfo.imei,
					key: this.userInfo.key,
					version: '8.9.0'
				}
				// console.log('params----',params,checkPar,this.goodItem)
				

				chectProduct(checkPar).then(res => {
					console.log('res-----',res);
					this.$loading.end();
					if(res.code == 0){
						deltailPurchase(params).then( result => {
							// console.log('result2-----------',result);
							if(result.code == '0'){
								this.$router.push({path: '/fillorder'});
							}
						})
						.catch(err => {
							this.$message({
								message: err.message,
								time: 1000
							});
						})
						
					}
					// else if(result.code == '1'){
					// 	this.$message({
					//      	message: result.data,
					//      	time: 1000
					//    	});
					// }
				})
				.catch(error => {
					this.$loading.end();
					this.$message({
				     	message: error.message,
				     	time: 1000
				   	});
				});

				// console.log('current-----',this.currentGoodData,this.userInfo,params);
				
			},
			backof(){
				this.$store.commit('refresh');
			},
			toTrace(url){
				location.href = url;
			},
			increase(){
				let arr = this.selectedId.filter(x => Boolean(x));
				if(arr.length !== this.skuAttrList.length ){
					this.$message({
				     	message: '请选择规格！',
				     	time: 1000
				   	})
					return false;
				}
				if(this.goodsQty >= this.stock){
					this.$message({
				     	message: '已到达最大库存！',
				     	time: 1000
				   	});
					return false;
				}
				this.goodsQty = this.goodsQty*1 + 1;
				let num = ((this.goodsQty * 10000) * this.unitPrice )/ 10000;
				this.currentGoodData.price = num.toFixed(2);
			},
			decrease(){
				let arr = this.selectedId.filter(x => Boolean(x));
				if(arr.length !== this.skuAttrList.length ){
					this.$message({
				     	message: '请选择规格！',
				     	time: 1000
				   	})
					return false;
				}
				if(this.goodsQty <= 1){
					
					return false;
				}
				this.goodsQty -= 1;
				let num = ((this.goodsQty * 10000) * this.unitPrice )/ 10000;
				this.currentGoodData.price = num.toFixed(2);
			},
			showItem(id){
				//id 0为满减优惠 1为分期付款 2规格选择
				// console.log(id);
				let _this = this;
				// let show = false;
				this.showDel = this.showDel.map(function(item,idx){
					if(idx !== id){
						return false;
					}else if(idx == id && _this.currentShowId == id){
						_this.currentShow = !_this.currentShow;
						if(_this.currentShow){
							return false;
						}
						return true;
					}else{
						_this.currentShow = false;
						return true;
					}
				});
				// console.log(id,_this.currentShow);
				// sku展开时请求
				if(id == 2 && !_this.currentShow){
					_this.skuAttrList.forEach(function(item,index){
						let arr = _this.getSkuList(item);
						_this.stockList[index] = new Array();
						arr.forEach(y => {
							_this.stockList[index].push(y);
						})
						
					});

					_this.stockList.forEach(function(item,index){
						item.forEach(function(x,n){
							let obj = {};
							obj[x] = _this.sumStock([x],1);
							_this.stockList[index].splice(n,1,obj);
						});
					});

					console.log('stockList---------',_this.stockList);
				}
				this.currentShowId = id;
				
			},
			deleHeader(){
				this.showHeader = false;
				this.$refs.delMain.classList.add('noneTop');
			},
			getKey(obj){
				return obj ? Object.keys(obj)[0] : '';
			},
			getKeys(obj){
				return obj ? Object.keys(obj) : [];
			},
			getSkuList(obj,index){
				let name = this.getKey(obj);
				let arrKey = this.getKeys(obj[name]);
				// console.log('arrKey---',arrKey);
				return arrKey;
			},
			sumStock(arr,idx,isSum){
				let _this = this;
				let num = 0;
				arr = arr ? arr : [];
				let copy = [];
				// 去除空字符
				arr = arr.filter(x => Boolean(x));
				// console.log('qu chu hou ----',arr,arr.length);
				_this.skuList.forEach(function(item,idx){
					// console.log(JSON.parse(item.attrInfo));
					let findIndexList = [];
					if(arr.length < JSON.parse(item.attrInfo).length){
						JSON.parse(item.attrInfo).forEach(function(x,index){
							arr.forEach(function(y,ind){
								if(y == x.vid){
									num += item.stock; 
								}
							})
						});
					}else if(arr.length == JSON.parse(item.attrInfo).length){
						arr.forEach(function(x,n){
							let findIndex = JSON.parse(item.attrInfo).findIndex(it => it.vid == x);
							findIndexList.push(findIndex);
						});
						let result = findIndexList.every(function(y){
							return y !== -1; 
						});
						// console.log('result-----',result,item,findIndexList);
						if(result){
							num = item.stock;
							copy = item;
							_this.unitPrice = item.price;
							_this.currentGoodData = Object.assign({},_this.currentGoodData,item );
							// console.log('result-----',arr,JSON.parse(item.attrInfo));
							if(isSum){
								// 是否计算总价
								_this.totalPrice(num);
							}
							// let lanNum = ((_this.goodsQty * 10000) * _this.unitPrice )/ 10000;
							// _this.currentGoodData.price = lanNum.toFixed(2);
						}
					}
				});
				// console.log('num-----',num,copy);
				return idx ? num : JSON.parse(JSON.stringify(copy));
			},
			selectKeyId(idx,id,ids){
				// idx为(规格中的)第几项,id为该项规格中的其中一个key值(为id数字),ids为第几个span
				let _this = this;
				let pnt = document.querySelectorAll('.guige')[idx];
				let childs = pnt.querySelectorAll('span');
				let currentChild = childs[ids];
				// console.log(pnt,childs,currentChild.classList.contains('disable'));
				// console.log(idx,id,Boolean(_this.selectedId[0]));
				if(!currentChild.classList.contains('disable')){

					// childs.forEach(x => {
					// 	x.classList.remove('active');
					// });
					for(var i=0;i < childs.length;i++){
						childs[i].classList.remove('active');
					}
					currentChild.classList.add('active');
					_this.selectedId.splice(idx,1,id);
					_this.stock =this.sumStock(_this.selectedId,1);
					// console.log('dsda',_this.selectedId);
					let filSelected = _this.selectedId.filter(x => Boolean(x));
					let len = filSelected.length;
					// if(len !== _this.stockList.length){
						// 自动获取下一级sku的数量
						_this.stockList.forEach(function(item,index){
							// if(index !== idx && (!_this.selectedId[index])){
							if(index !== idx){
								item.forEach(function(x,n){
									let obj = {};
									let copyId = _this.selectedId[index];
									let key = _this.getKey(x);
									_this.selectedId.splice(index,1,key);
									obj[key] = _this.sumStock(_this.selectedId,1);
									// console.log('obj----',_this.selectedId,x,_this.getKey(x));
									_this.stockList[index].splice(n,1,obj);
									// 恢复原来状态
									_this.selectedId.splice(index,1,copyId);
								});
							}
						});
					// }
					// else {
					// 	_this.stock =this.sumStock(_this.selectedId,1,true);
					// }
					if(len == _this.stockList.length) {
						_this.stock =this.sumStock(_this.selectedId,1,true);
					}
				}
				// console.log(_this.selectedId);
			},
			testVal(){
				this.totalPrice();
			},
			totalPrice(qty){
				console.log('totalPrice')
				qty = qty ? qty : this.stock;
				// console.log(this.goodsQty,typeof(this.goodsQty),qty);
				let arr = this.selectedId.filter(x => Boolean(x));
				if(typeof(this.goodsQty) === 'string'){
					this.goodsQty = this.goodsQty.trim();
				}
				
				if(/[^\d]+/.test(this.goodsQty)){
					this.$message({
				     	message: '请输入数字！',
				     	time: 1000
				   	})
					this.goodsQty = 1;
					this.$refs.goodsQty.focus();
				}else if(arr.length !== this.skuAttrList.length ){
					this.$message({
				     	message: '请选择规格！',
				     	time: 1000
				   	});
				   	this.$refs.goodsQty.focus();
				}else if(this.goodsQty*1 > qty){
					this.$message({
				     	message: '已超过最大库存！',
				     	time: 1000
				   	});
				   	this.$refs.goodsQty.focus();
				}else if(this.goodsQty*1 <= 0){
					this.$message({
				     	message: '请至少选择一件商品！',
				     	time: 1000
				   	});
				   	this.$refs.goodsQty.focus();
				}else{
					let num = ((this.goodsQty * 10000) * this.unitPrice )/ 10000;
					this.currentGoodData.price = num.toFixed(2);
				}
			},
			toPerson(){
				console.log('用户信息----',this.userInfo);
				this.$loading.start();
				setTimeout(() => {
					this.$loading.end();
					if(!this.userInfo){
						this.$router.push({
							path: `/login/${this.productId}`
							// name: 'login',
							// params: {
							// 	productId: this.productId
							// }
						});
					}else {
						this.$router.push({path: '/personal'});
					}
				},200);
			},
			toDownLoad(){
		        var u = navigator.userAgent;
		        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		        var isWeixin = u.toLowerCase().indexOf('micromessenger') != -1;
		        if (isWeixin) {
		            this.showWxTip = true;
		        } else if (isIOS) {
		            // window.location.href = 'https://itunes.apple.com/cn/app/id1367130251';
		            window.location.href = 'iflashbuy://iflashbuy';
		            setTimeout(()=>{
		            	// window.location.href = 'iflashbuy://iflashbuy';
		            	window.location.href = 'https://itunes.apple.com/cn/app/id1367130251';
		            },1500)
		        } else {
		        	window.location.href = 'iflashbuy://iflashbuy';
		        	setTimeout(()=> {
		        		window.location.href = 'http://msh.z-code.cn/download/softfiles/mashanghua_8.8.8_s25.apk';
		        	},2000);
		           
		        }
			},
			shutDownTips(){
				this.showWxTip = false;
			},
			getDetailPro(){
				let params = {
					method: "getProduct",
					system: "",
					id: this.productId,
					version: "8.8.9"
				};
				let pas = {
					iflashbuyPlatform: 'iflashbuy',
					para: JSON.stringify(params)
				};
				this.$loading.start();
				// debugger;
				deltailPro(pas).then(res => {
					this.$loading.end();
					if(res.state == 0){
						console.log('res-----',res.page.datas);
						this.goodData = res.page.datas;
						this.goodDataList = this.goodData.items;
						this.currentGoodData.price = this.goodData.items[0].price;
						// this.name = this.goodData.items[0].name;
						// this.traceUrl = this.goodData.items[0].traceUrl;
						// this.stagingInfo = this.goodData.items[0].stagingInfo;
						// this.imgList = this.goodData.items[0].images;
						// this.feeInfo = this.goodData.items[0].fee;
						// this.detailUrl = this.goodData.items[0].detailUrl;
						// 
						// 
						this.goodItem = Object.assign({},this.goodItem,this.goodData.items[0]);
						this.goodItem.images.forEach(x => {
							let img = new Image();
							img.onload = () => {
								this.count++;
							}
							img.src = x.url; 
						});
						

					}
					else if(res.state == 1){
						this.$message({
					     	message: res.message,
					     	time: 1000
					   	})
					}
					// console.log('goodDataList----',this.goodDataList);
				})
				.catch(err => {
					this.$loading.end();
					this.$message({
				     	message: err.message || err,
				     	time: 1000
				   	})
				})
			},
			getProductSku(){
				let _this = this;
				this.$loading.start();
				let skuParams = {
					// productId: 1301967
					productId: this.productId
				};

				deltailSku(skuParams).then(res => {
					console.log('res--delsku',res.data);
					this.$loading.end();
					res.data.attrListVO.length > 0 ? _this.hasSku = true : _this.hasSku = false;
					res.data.attrListVO.forEach(function(item,idx){
						_this.skuAttrList.push(item);
						_this.selectedId.push('');
						for(var attr in item){
							for(var at in item[attr]){
								_this.idList.push(at);
							}
						}
					});
					res.data.skuListVO.forEach(function(item,idx){
						_this.skuList.push(item);
					})

					// _this.idList.forEach(item => {
					// 	let obj = {};
					// 	obj[item] = _this.sumStock([item],1)
					// 	_this.stockList.push(obj);
					// })

					// this.sumStock();
					_this.stock = res.data.totalStock;
					console.log('skuList------', _this.skuList,_this.skuAttrList,_this.idList,_this.stockList);
				})
				.catch(err => {
					this.$loading.end();
					this.$message({
				     	message: err.message || err,
				     	time: 1000
				   	})
				})

			},
			rackOff(){
				this.$message({
					message: '该商品已下架！',
					time: 1000
				})
			}
		},
		mounted(){
			let _this = this;
			// console.log('router----',this.$route.params);
			 this.productId = this.$route.params.productId;
			 this.getDetailPro();
			 this.getProductSku();
		}

	}
</script>


<style lang="scss" scoped>
	#del-main-content{
		// overflow-y: auto;
	}
	.delBox{
		.clearfix::after {
		  display: block;
		  content: "";
		  height: 0;
		  clear: both;
		  overflow: hidden;
		  visibility: hidden;
		  zoom: 1;
		}
		.fl {
			float: left;
		}
		.fr {
			float: right;
		}
		// min-height: 100vh;
		// position: relative;
		position: fixed;
		left: 0;
	    top: 0;
	    bottom: 0;
	    right: 0;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		-webkit-flex-direction: column;
    	flex-direction: column;
    	-webkit-overflow-scrolling: touch;
    	// overflow: scroll;
    	.delHeader{
    		height: 100px;
    		width: 100%;
    		// position: fixed;
    		// top: 0;
    		// left: 0;
    		// right: 0;
    		z-index: 1000;
    		// background: #6F7DD8;
    		@include fontsz(18px);
    		.lt{
    			width: 530px;
    			height: 100px;
    			background-color: #3C3D41;
    			@include fontsz(13px);
    			padding-left: 176px;
    			position: relative;
    			.pos{
    				position: absolute;
    				display: block;
    				top: 50%;
    				transform: translateY(-50%);
    			}
    			.mshPic {
    				height: 64px;
    				width: 64px;
    				left: 100px;
    			}
    			.dele {
    				// height: 30px;
    				// width: 30px;
    				border-radius: 50%;
    				left: 40px;
    				// background-color: #fff;
    				// text-align: center;
    				// line-height: 35px;
    				@include icon(35px,35px,'../../assets/images/shutDown');
    			}
    			.p1 {
    				color: #fff;
    				height: 50px;
    				line-height: 76px;
    			}
    			.p2 {
    				color: #999999;
    				height: 40px;
    				@include fontsz(12px);
    			}
    		}
    		.rt{
    			width: 220px;
    			height: 100px;
    			background-color: #6F7DD8;
    			text-align: center;
    			line-height: 100px;
    			color: #fff;
    			@include fontsz(14px);
    		}
    	}
		.delMain {
			display: flex;
			display: -webkit-flex;
			flex: 1;
			-webkit-flex: 1;
			-webkit-flex-direction: column;
    		flex-direction: column;
    		// padding-top: 100px;
    		// padding-bottom: 100px;
    		overflow-y: auto;
    		&.noneTop {
    			padding-top: 0;
    		}
    		.delMain-msg{
    			background-color: #EFEFF4;
    		}
    		.staging {
    			margin-bottom: 16px;
    			padding-left: 20px;
    			li {
    				border-bottom: 2px solid #EFEFF4;
    				padding-left: 30px;
    				// height: 120px;
					.p1{
						@include fontsz(14px);
						color: #4A4A4A;
						line-height: 70px;
					}
					.p2{
						@include fontsz(12px);
						color: #999999;
						line-height: 30px;
					}
					p {
						height: 60px;
					}
    				&.none {
    					border: none;
    				}
    			}
    			&.disappear {
    				display: none;
    			}
    		}
			.banner {
				height: 720px;
				width:100%;
				position: relative;
				.spanIcon {
					display: block;
					position:absolute;
					height: 50px;
					width: 50px;
					border-radius: 50%;
					top: 60px;
					z-index: 100;
					&.back{
						left: 28px;
					}
					&.person {
						right: 28px;
					}
				}
				.swiper-container{
					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.yImg {
					height: 100%;
					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
			.padd{
				padding: 0 30px;
				margin-bottom: 16px;
			}
			.bg {
				background-color: #fff;
			}
			.msg{
				.price {
					height: 80px;
					color: #404040;
					@include fontsz(22px);
					line-height: 80px;
				}
				.description {
					@include fontsz(16px);
					line-height: 36px;
					height: 84px;
					color: #4E4E4E;
					// white-space: nowrap;
					// text-overflow:ellipsis; 
					// overflow:hidden;
				}
			}
			.certification {
				height: 160px;
				position: relative;
				.content {
					padding-left: 130px;
					.top {
						@include fontsz(14px);
						height: 80px;
						line-height: 100px;
						color: #585858;
					}
					ul {
						li {
							float: left;
							width: 180px;
							height: 34px;
							text-align: center;
							@include fontsz(12px);
							color: #8D8D8D;
							position: relative;
							i {
								@include icon(28px,28px,'../../assets/images/btn_black');
								position: absolute;
								left: -10px;
								top: 50%;
								margin-top: -10px;
								&.ic2 {
									left: 4px;
								}
								&.ic3 {
									left: 3px;
								}
							}
						}
					}
				}
				.pz-logo {
					position: absolute;
					display: block;
					top: 50%;
					transform: translateY(-50%);
					width: 80px;
					height: 80px;
					left: 56px;
				}
			}
			.sec {
				min-height: 120px;
				position: relative;
				padding-top: 42px;
				margin-bottom: 16px;
				padding-bottom: 20px;
				.label {
					position: absolute;
					width: 140px;
					height: 36px;
					text-align: center;
					line-height: 36px;
					left: 30px;
					color: #FF3772;
				}
				.msg {
					line-height: 35px;
					// padding-left: 150px;
					padding-left: 180px;
					padding-right: 40px;
				}
				&.delMargin {
					margin: 0;
				}
			}
			.bgLine{
				height: 16px;
				width: 100%;
				background-color: #EFEFF4;
			}
			.offer {
				// border-bottom: 2px solid #cccccc;
				.tips {
					border: 1px solid #FF3772;
					border-radius: 3px;
					border-top-width: 2px;
    				border-bottom-width: 2px;
				}
				.minp {
					white-space: nowrap;
					text-overflow:ellipsis; 
					overflow:hidden;
				}
			}
			.delMain-pic {
				min-height: 120px;
				.p1{
					height: 120px;
					text-align: center;
					color: #8D8D8D;
					line-height: 120px;
					i {
						@include icon(28px,28px,'../../assets/images/btn_refresh');
					}
				}
			}
			.sku {
				padding-left: 30px;
				li {
					padding-bottom: 30px;
					h3 {
						height: 80px;
						color: #666666;
						line-height: 90px;
						@include fontsz(14px);
					}
					span {
						display: inline-block;
						// min-width: 96px;
						// height: 48px;
						padding: 8px 14px;
						border: 1px solid #CCCCCC;
						border-radius: 4px;
						text-align: center;
						line-height: 48px;
						@include fontsz(14px);
						margin-right: 40px;
						margin-bottom: 26px;
						color: #333;
						&.active {
							color: #fff;
							background-color: #6F7DD8;
							border: 1px solid #fff;
						}
						&.disable {
							color: #ccc;
							background-color: #F5F5F5;
							border: none;
						}
					}
					.inblk {
						display: inline-block;
						text-align: center;
						line-height: 42px;
						height: 42px;
						width: 66px;
					}
					input {
						background: #F5F5F5;
						border: 0 solid #CCCCCC;
						color: #6F7DD8;
					}
				}
				&.disappear {
					display: none;
				}
			}
		}
		.arrow-right {
			position: absolute;
			top: 50%;
			transform: translateY(-50%) rotate(0);
			right: 30px;
			@include icon(28px,28px,'../../assets/images/arrow_right');
		}
		.arrow-down {
			transform: translateY(-50%) rotateZ(90deg);
		}
		.delFooter {
			height: 100px;
			width: 100%;
			text-align: center;
			line-height: 100px;
			@include fontsz(14px);
			background-color: #FF2C68;
			color: #fff;
			// position: fixed;
			// bottom: 0;
		}
		.wx-tip {
			position: fixed;
		    top: 0;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    z-index: 10000;
		    background: rgba(0, 0, 0, 0.8);
		    text-align: right;
		    padding: .80645161rem;
		    p.wx {
		    	color: #FFF;
		    	text-align: center;
		    	font-size: .46774194rem;
		    	letter-spacing: .12096774rem;
		    }
		    img.wx {
		    	width: 1.62903226rem;
		    	height: 2.53225806rem;
		    }
		}
	}

	iframe li {
		font-size:30px !important;
		
	}
	iframe {
		width: 100%;
		height: 100vh;
		border: none;
	}
</style>