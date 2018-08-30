<template>
	<section>
		<div class="header" @click="$router.push({path:'/visCard',query:{id:leaflet.card.id}})" >
			<div class="headPortrait">
				<span class="himg" v-bind:style="{'backgroundImage': 'url('+leaflet.card.logo+')'}"  ></span>
			</div>
			<div class="userinfo">
				<p class="name">{{leaflet.card.realname}}</p>
				<p class="tiem">{{leaflet.createTime}} &nbsp;&nbsp;•&nbsp;&nbsp;{{leaflet.card.companyName}}</p>
			</div>
		</div>
		
		<div class="leaContent">
			<p class="text">
				{{leaflet.descr}}
			</p>
				<ul class="imgList">
					<li class="imgItem" v-for="(item,index) in imgs" :key="index"   v-bind:style="{'backgroundImage': 'url('+item+')'}" ></li>
				</ul>

		</div>
		
		<div class="footer">
			<ul class="f-list">
				<li class="f-item zan">赞{{leaflet.statistics.tradeCount}}</li>
				<li class="f-item buy">购买量{{leaflet.statistics.praiseCount}}</li>
			</ul>
		</div>
		
		<div class="comments">
			<ul class="commentsList">
				<li class="commentsItem" v-for="(item,index) in comments" >
					<div class="commenter">
						<div class="haerImg">
							<span class="haer" v-bind:style="{'background': '#eee url('+item.photo+') no-repeat 50% 50%'}"  ></span>
						</div>
						<div class="info">
							<p class="name">{{item.user.nickname||item.user.username}}</p>
						</div>
					</div>
					<div class="commentsContent">
						<p class="contentTxt">
							{{item.content}}
						</p>
						<p class="time">{{item.createTime}}</p>
					</div>
				</li>

			</ul>
			
			
		</div>
		
		
		
	</section>
</template>

<script>
	import {leafletGet,commentByleaflet } from './server.js'
	export default {
		data(){
			return {
				imgs:[],
				comments:[],
				leaflet:{
					statistics:{},
					card:{
						
					}
				},
				
			}
		},
		computed: {},
		filters: {},
		watch: {},
		methods: {
			_leafletGet(id){
				
				leafletGet({id:id}).then((res)=>{
		 
					this.leaflet = res;
					if(!this.leaflet.statistics){
						this.leaflet.statistics = {praiseCount:0,tradeCount:0};
					}
					
					
					
					this.imgs = res.images.split(',');
				
				
				
				}).catch((res)=>{
					
				})
				
			},
			_commentByleaflet(leafletId){
				commentByleaflet({leafletId:leafletId}).then((res)=>{
					this.comments = res.content;
					
					
					
					
					
				}).catch((res)=>{
					
				})
			}
		},

	
		mounted(){
			let id = this.$route.query.id;
			this._leafletGet(id);
			this._commentByleaflet(id);
		}

	}
</script>


<style lang="scss" scoped>
	.header{
		width: 100%;
		height: 50px;
		padding: 0 10px;
		display: flex;
		.headPortrait{
			flex: 0 0 50px;
			.himg{
				display: block;
				height: 40px;
				width: 40px;
				border-radius:50%;
				margin-top: 5px;
				background-size:cover ;
			}
		}
		.userinfo{
			flex: 0 0 300px;
			p{
				height: 20px;
				line-height: 20px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				&.name{
					margin-top: 5px;
					@include fontsz(13px);
					color: #333333;					
				}
				
				&.tiem{
					@include fontsz(12px);
					color: #A6A6A6;					
				}
			}
			
			
		}
		
	}
	
	.leaContent{
		padding: 10px;
		width: 100%;
		border-bottom: 5px solid #EEEEEE;
		.text{
			@include fontsz(15px);
			color: #333333;
			line-height: 22px;
			text-align: justify;				
		}
		.imgList{
			width: 100%;
			box-sizing: border-box;
			padding-top: 3%;
			.imgItem{
				margin: 0;
				margin-top: -1%;
				box-sizing: border-box;
				display: inline-block;
				width: 49%;
				height: 160px;
				background-color:#eee;
				background-size:cover;
				background-position:50% 0;
			}			
			.imgItem:nth-child(2n){
				margin-left: 1%;
			}
		}
		
		.imgList:nth-child(2n){
			margin-left: 1%;
		}
		
	}
	
	.footer{
		width: 100%;
		padding: 0 10px;
		height: 59px;
		.f-list{
			display: flex;
			width: 100%;
			height: 100%;
			.f-item{
				box-sizing: border-box;
				flex: 1;
				text-align: center;
				@include fontsz(12px);
				color: #A6A6A6;				
				padding-top: 30px;
				&.zan{
					background: url(../../assets/images/zan.png) no-repeat 50% 30%;
					background-size:18px 18px;
				}
				&.buy{
					background: url(../../assets/images/buy.png) no-repeat 50% 30%;
					background-size:20px 20px;
				}
			}
		}
		
	}
	
	
	.commentsList{
		width: 100%;
		padding-bottom: 40px;
		.commentsItem{
			width: 100%;
			height: auto;
			border-top:1px solid #EEEEEE;
			.commenter{
				width: 100%;
				height: 50px;
				padding: 0 10px;
				display: flex;
				.haerImg{
					flex: 0 0 50px;
					.haer{
						display: block;
						height: 40px;
						width: 40px;
						margin-top: 5px;
						border-radius:50%;
						background: url(../../assets/images/erc.jpg) no-repeat 50% 50%;
						background-size:cover ;
					}
				}
				.info{
					flex: 0 0  300px;
					.name{
						width: 100%;
						margin-top: 17px;
						@include fontsz(13px);
						color: #6DC10D;
						height: 20px;
						line-height: 20px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;						
					}				
				}
			}
			.commentsContent{
				padding-left: 60px;
				padding-right: 10px;
				.contentTxt{
					@include fontsz(13px);
					line-height: 22px;
					color: #333333;	
					text-align: justify;				
				}
				.time{
					@include fontsz(12px);
					color: #A6A6A6;					
					margin-top: 5px;
				}
			}
			
			
			
			
		}
		
		
	}
	
	
	
		
</style>