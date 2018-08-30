<template>
	<section>
		<div class="heaser">
			<div class="logo" style="background-size: contain;" v-bind:style="{backgroundImage: 'url(' + card.logo + ')'}"></div>
			<p class="name">{{card.realname}}</p>
			<p class="entName">{{card.companyName}}&nbsp;&nbsp; / &nbsp;&nbsp;{{card.post}}</p>
			<p class="add">{{card.companyAddress.province}}&nbsp;&nbsp; / &nbsp;&nbsp;{{card.companyAddress.city}}</p>
		</div>
		<div class="cardInfo wap">
			<h2 class="title">名片信息</h2>
			<ul class="infolist">
				<li class="infoItem phone">{{card.phone}}</li>
				<li class="infoItem email">{{card.email}}</li>
				<li class="infoItem add">{{card.companyAddress.province+card.companyAddress.city+ card.companyAddress.district+card.companyAddress.details}}</li>
			</ul>
			
		</div>
		
		<div class="service wap">
			<h2 class="title">产品&nbsp;&nbsp;/&nbsp;&nbsp;服务</h2>
			<ul class="productlist">
				<li class="proItem" v-for="(item,index) in servList" :key ="index" style="background-size: cover;" v-bind:style="{backgroundImage: 'url(' + item.images.split(',')[0] + ')'}" @click="$router.push({path:'/leaflets',query:{id:item.id}})"  >
					<p class="name">{{item.descr}}</p>
				</li>			
			</ul>
			
		</div>		
		
		<!--<div class="ad wap">
			<h2 class="title">广告位</h2>
			<ul class="adlist">
				<li class="adItem"></li>			
			</ul>
		</div>			-->
		

		<div class="qecode wap">
			<p class="codename">{{card.realname}}的二维码</p>
			<div class="codeImg" style="background-size: contain;" v-bind:style="{backgroundImage: 'url(' + card.qrcode + ')'}"></div>
			<p class="codefooter">使用微信扫一扫保存我的名片夹</p>
		</div>		
		
		
		
		
	</section>
</template>

<script>
	import {cardGet,listByCard } from './server.js'
	export default {
		data(){
			return {
				card:{
					companyAddress:{}
				},
				servList:[],
				
			}
		},
		computed: {},
		filters: {},
		watch: {},
		methods: {
			_cardGet(id){			
				cardGet({id:id}).then((res)=>{
					this.card = res;
					console.log(res);
					
				}).catch((res)=>{

				})
			},
			_listByCard(id){
				listByCard({cardId:id}).then((res)=>{
					this.servList = res;
					
				}).catch((res)=>{
					
				})
			}
			
			
		},
		mounted(){
			this._cardGet('964');
			this._listByCard('964');
		}

	}
</script>


<style lang="scss" scoped>
.heaser{
	min-height: 167px;
	height: auto;
	padding-top: 10px;
	padding-bottom: 20px;
	border-bottom: 5px solid #EEEEEE;
	.logo{
		height: 68px;
		width: 95px;
		margin: auto;
	}
	p{
		width: 80%;
		line-height: 18px;
		@include fontsz(12px);
		margin: auto;
		color: #666666;	
		text-align: center;	
	}
	
	.name{
		margin-top: 12px;
	}
	
	
}

.wap{
	padding: 10px;
	border-bottom: 5px solid #EEEEEE;
	.title{
		height: 30px;
		line-height: 20px;
		@include fontsz(13px);
		color: #333333;
		text-align: left;		
		border-bottom:1px  solid #E1E1E1;/*no*/
	}	
}
.cardInfo{
	.infolist{
		width: 100%;
		.infoItem{
			width: 100%;
			padding: 5px 26px;
			@include fontsz(15px);
			color: #666666;
			&.phone{
				background: url(../../assets/images/phone.png) no-repeat 0% 50%;
				background-size:18px 16px;
			}
			&.email{
				background: url(../../assets/images/email.png) no-repeat 0% 50%;
				background-size:20px 15px;				
			}
			&.add{
				background: url(../../assets/images/add.png) no-repeat 0% 50%;
				background-size:20px 18px;						
			}			
		}
	}
}

.service{
	width: 100%;
	.productlist{
		width: 100%;
		padding-top: 5px;
		.proItem{
			position: relative;
			width: 49%;
			height: 89px;
			margin: 0;
			padding: 0;
			display: inline-block;
			background: #eee;
			.name{
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 1;
				width: 100%;
				height: 24px;
				line-height: 24px;
				padding: 0 10px;
				text-align: center;
				@include fontsz(12px);
				color: #fff;
				background: rgba(0,0,0,.5);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				
			}
		}
		.proItem:nth-child(2n){
			float: right;
			margin-left: 1%;
		}
	}
	
}

.adlist {
	width: 100%;
	padding-top: 5px;
	.adItem{
		width: 100%;
		height: 89px;
		background: deepskyblue;
	}
}

.qecode{
	p{
		width: 100%;
		height: 30px;
		line-height: 30px;
		@include fontsz(13px);
		text-align: center;
		color: #6DC10D;
	}
	.codeImg{
		width: 164px;
		height: 164px;
		border: 1px solid #EEEEEE;
		margin: 5px auto;
	}
		
}



</style>