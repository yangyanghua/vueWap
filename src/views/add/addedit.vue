<template>
	<section>
    	<header-section title="收货地址"></header-section>		
		<div class="content">
			<div class="formContent">
				<ul class="infoList">
					<li class="infoItem">
						<span class="f_label">收货人姓名：</span>
						<p class="inputBox">
							<input type="text" name="" id="" v-model="formdata.linkman" placeholder="收货人姓名" />
						</p>		
					</li>
					<li class="infoItem">
						<span class="f_label">手机号码：</span>
						<p class="inputBox">
							<input type="text" name="" id="" v-model="formdata.mobile"  placeholder="手机号码" />
						</p>						
					</li>
					<li class="infoItem">
						<span class="f_label">所在地区：</span>
						<p class="inputBox chooseAdd" @click="chooseAdd">
							<input type="text" name="" id="region" v-model="RegionDetail" readonly="readonly"  placeholder="请选择地区"  />
						</p>						
					</li>
					<li class="infoItem f_textarea">
						<span class="f_label">街道地址：</span>
						<p class="inputBox">
							<textarea name="" rows="3" v-model="formdata.address" cols="" placeholder="街道地址" ></textarea>
						</p>						
					</li>
				</ul>
				<div class="setDuf">
					<p  class="setDufTxt">设置为默认地址</p>
					<div class="swich" v-bind:class="{'active':setDuf}" @click="setDefault" >
						<span class="swichBtn"></span>
					</div>
					
				</div>
			</div>
		</div>
		<div class="addListContent" v-bind:class="{'editIng':choose}">
			<div class="a_options">
				<button class="btnD no" @click="cosle">取消</button>
				<button class="btnD yes" @click="getChooseRegion" >确定</button>
			</div>
			<div class="chooseboder"></div>
			<div class="provs swiper">
				<div class="swiper-provs swiper-container">
				  <div class="swiper-wrapper">
				    <div class="swiper-slide" v-for="item in provsData">{{item.name}}</div>
				  </div>
				</div>				
			</div>

			<div class="provs swiper">
				<div class="swiper-citys swiper-container">
				  <div class="swiper-wrapper">
				    <div class="swiper-slide" v-for="item in citysData">{{item.name}}</div>
				  </div>
				</div>				
			</div>

			<div class="provs swiper">
				<div class="swiper-dists swiper-container">
				  <div class="swiper-wrapper">
				    <div class="swiper-slide" v-for="item in distsData">{{item.name}}</div>
				  </div>
				</div>				
			</div>
		</div>
		<div class="make" v-if="choose"></div>
			<div class="toaddBtnBox" >
				<button class="btnC" @click="submit">保存</button>
			</div>
	
	</section>
</template>

<script>
 import headerSection from '@/components/headerSection';
 import {getRegion,addAddr,getAddbuyId,updateAddr} from './service.js';
  export default {
    data() {
      return {
      	isEmpty:false,
		adddetail:'',
		setDuf:false,
		ids:'',
		formdata:{
			province:'',//省
			provinceid:'',//省ID
			city:'',//市
			cityid:'',//市id
			area:'',//区
			areaId:'',//区ID，
			address:'',
			linkman:'',
			mobile:'',
			isdefault:0,//（1,0）(1-默认,0-非默认);	
		},
		errorMsg:'',
		RegionDetail:'',
		choose:false,
		provsData:[],
		citysData:[],
		distsData:[],
		swiperProvs:{},
		swiperCitys:{},
		swiperDists:{},
      }
    },
    components: {
       headerSection,
    },
    methods: {
		setDefault(){
			
			if(this.setDuf){
				this.formdata.isdefault = 0;
			}else{
				this.formdata.isdefault = 1;
			}
			this.setDuf = !this.setDuf;			
		},
		checkFormdata(){
			let check1=true,check2=true,check3=true,check4=true;
			this.errorMsg = '请输入';
			if(this.formdata.linkman===''){
				check1=false;
				this.errorMsg += '收货人姓名、';
			}
			if(this.formdata.mobile===''){
				check2=false;
				this.errorMsg += '收货人手机号、';
			}else{
				if(this.formdata.mobile.length!=11){
					check2=false;
					this.errorMsg += '格式正确的手机号码、';
				}					
			}			
			if(this.RegionDetail===''){
				check4=false;
				this.errorMsg += '所在地区、';
			}
			if(this.formdata.address===''){
				check3=false;
				this.errorMsg += '街道地址。';
			}			
			return check1&&check2&&check3&&check4;
			
		},
		submit(){
			let vm = this;
			if(!this.checkFormdata()){
				this.$message(this.errorMsg);
				return false;
			}
			if(this.formdata.id){
				updateAddr(this.formdata).then((res)=>{
				   	this.$message('更新成功');
					setTimeout(function(){
						history.go(-1);
					},500)					   	
   	
				}).catch((res)=>{
				   this.$message('网络错误！');
				})
			}else{
				addAddr(this.formdata).then((res)=>{
				   	this.$message('新增成功');
					setTimeout(function(){
						history.go(-1);
					},500)			
				}).catch((res)=>{
					
					this.$message('网络错误！');
					
				})				
			}
			
			
			
		},
		chooseAdd(){
			this.choose = true;
		},
		cosle(){
			this.choose = false;
		},
		_getAddbuyId(id){
			getAddbuyId({id:id}).then((res)=>{
				let vm = this;
				if(res.status==0){
					this.formdata = res.data;
					this.RegionDetail = res.data.province+','+ res.data.city+','+ res.data.area;
					let pIndex = 0,cIndex = 0,dIndex = 0;
					if(res.data.isdefault==1){
						this.setDuf = true;
					}
					this.provsData.forEach((item,index)=>{
						if(vm.formdata.provinceid==item.id){
							pIndex = index;
						}
					});
					this.citysData.forEach((item,index)=>{
						if(vm.formdata.cityid==item.id){
							cIndex = index;
						}
					})
					this.distsData.forEach((item,index)=>{
						if(vm.formdata.areaId==item.id){
							dIndex = index;
						}
					})					
					this.swiperProvs.slideTo(pIndex);
					this.swiperCitys.slideTo(cIndex);
					this.swiperDists.slideTo(dIndex);				
				}				
			}).catch((res)=>{
				this.$message('网络错误！');
			})
		},
		getChooseRegion(){
			this.RegionDetail = '';
			let provsIndex = this.swiperProvs.activeIndex;
			let citysIndex = this.swiperCitys.activeIndex;
			let distsIndex = this.swiperDists.activeIndex;
			
			this.formdata.provinceid = this.provsData[provsIndex].id;
			this.formdata.province = this.provsData[provsIndex].name;
			this.RegionDetail += this.provsData[provsIndex].name;
			
			this.formdata.cityid = this.citysData[citysIndex].id;
			this.formdata.city = this.citysData[citysIndex].name;
			this.RegionDetail +=',' + this.citysData[citysIndex].name;
			
			this.formdata.areaId = this.distsData[distsIndex].id;
			this.formdata.area = this.distsData[distsIndex].name;
			this.RegionDetail +=',' + this.distsData[distsIndex].name;			
			
			this.choose = false;
			
		},
		_getRegion(){
			getRegion().then((res)=>{
				this.provsData = res.data;
				this.citysData = this.provsData[0].cityList;
				this.distsData = this.citysData[0].districtList;
				let vm = this;
				let addId = this.$route.query.addId;
				setTimeout(function(){
					vm.swiperProvs.update();
					vm.swiperCitys.update();
					vm.swiperDists.update();
					if(addId){
						vm._getAddbuyId(addId);
					}
				},30)			
				
			}).catch((res)=>{
				this.$message('网络错误！');
			})
		}
    },

    mounted() {
    	let vm = this;
    	
		this.swiperProvs =  new Swiper('.swiper-provs', {
			direction : 'vertical',
			onTransitionEnd: function(swiper){			

				vm.citysData = vm.provsData[swiper.activeIndex].cityList;
				vm.distsData = vm.citysData[0].districtList;
				setTimeout(function(){
						vm.swiperCitys.update();
						vm.swiperCitys.slideTo(0);
						vm.swiperDists.update();
						vm.swiperDists.slideTo(0);
					},30)
			
			}
						
			});

		this.swiperCitys =  new Swiper('.swiper-citys', {
			direction : 'vertical',
			onTransitionEnd: function(swiper){

				vm.distsData = vm.citysData[swiper.activeIndex].districtList;
				setTimeout(function(){
						vm.swiperDists.update();
						vm.swiperDists.slideTo(0);
					},30)	
	        }		
		
		});
		this.swiperDists =  new Swiper('.swiper-dists', {
			direction : 'vertical',
			onTransitionEnd: function(swiper){	
	        }			
		});
		
		this._getRegion();

 }
  }	
</script>

<style lang="scss" scoped="scoped">	
	.formContent{
		width: 100%;
		height: 100%;
		.infoList{
			width: 100%;
			height: 100%;
			.infoItem{
				width: 100%;
				height: 92px;
				padding: 0 30px;
				border-bottom: 1px solid #EFEFF4;
				display: flex;
				&.f_textarea{
					height: 140px;
				}
				.f_label{
					flex: 0 0 200px;
					height: 92px;
					line-height: 92px;
					overflow: hidden;
					@include fontsz(14px);
					color: #979797;					
				}
				.inputBox{
					flex: 1;
					text-align: left;
					line-height: 92px;
					&.chooseAdd{
						background: url(../../assets/images/Mmore__3x.png) no-repeat 100% 50%;
						background-size:35px 35px;
					}
					input{
						border: none;
						background: none;
						height: 92px;
						width: 100%;
						line-height: 92px;
						@include fontsz(14px);
						color: #979797;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;																				
					}
					textarea{
						@include fontsz(14px);
						color: #979797;							
						line-height: 30px;
						width: 100%;
						height: 100%;
						margin-top: 30px;
						border: none;
					}
				}
			}			
		}
	}
	
	.setDuf{
		position: relative;
		border-top:20px solid #F9F9F9;
		border-bottom:20px solid #F9F9F9;
		height: 124px;
		padding: 0 30px;
		.setDufTxt{
			height: 84px;
			line-height: 84px;
			@include fontsz(14px);
			color: #333333;			
		}
		.swich{
			position: absolute;
			top: 50%;
			margin-top: -24px;
			right: 30px;
			height:48px;
			width: 96px;
			padding: 5px;
			border-radius:100px;
			background:#DCDCDC;
			transition: all 0.3s;
			.swichBtn{
				display: block;
				height:38px;
				width: 38px;
				border-radius:50%;
				background: #fff;
				margin-left: 0;
				transition: all 0.3s;
			}
			&.active{
				background:#6F7DD8;
				.swichBtn{
					margin-left: 48px;
				}
				
			}			
		}
	}
	
	.addListContent{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		border-top:1px solid #FFFFFF;/*no*/
		width: 100%;
		height: 0;
		text-align: center;
		overflow: hidden;
		background: #FFFFFF;
		transition: all 0.4s;
		&.editIng{
			height: 500px;
		}
		.chooseboder{
			position: absolute;
			top: 220px;
			width: 100%;
			left: 0;
			height: 1rem;
			border-bottom: 1px solid #CCCCCC;
			border-top: 1px solid #CCCCCC;
		}
		.provs{
			display: inline-block;
			width:32%;
			margin-top: 220px;
			height: 1rem;
		}
		.swiper-container{
			width:100%;
			height: 100%;
			overflow: inherit;
			.swiper-slide{
				@include fontsz(14px);
				text-align: center;
				line-height: 1rem;
			}
		}
		.a_options{
			position: absolute;
			top: -1px;
			z-index: 200;
			left: 0;
			height: 80px;
			background: #F9F9F9;
			padding: 0 30px;
			width: 100%;
			.btnD{
				background: none;
				color: #6F7DD8;
				@include fontsz(14px);
				border: none;
				height: 80px;
				line-height: 80px;
				&.no{
					float: left;
				}
				&.yes{
					float: right;
				}
			}
		}
	}
	.toaddBtnBox{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 98px;
		.btnC{
			height: 98px;
			width: 100%;
			line-height: 98px;
			text-align: center;
			color: #fff;
			@include fontsz(16px);
			background:#6F7DD8;
			outline: none;
			border: none;
		}
	}	
	.make{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 90;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.4);
	}
</style>