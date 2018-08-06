<template>
	<section>
		<div class="header">
			<div class="headPortrait">
				<span class="himg"></span>
			</div>
			<div class="userinfo">
				<p class="name">孙悟空</p>
				<p class="tiem">8小时前 &nbsp;&nbsp;•&nbsp;&nbsp;好日子生化管理有限公司</p>
			</div>
		</div>
		
		<div class="leaContent">
			<p class="text">
				如果有一天，突然来了一个闪电，然后突然实物拍摄。
				裙长请参考出目标，裙子可以前面俩面」+哦如果有一
				天，突然来了一个闪电，然后突然实物拍摄。裙长请
				参考出目标，裙子可以前面俩面穿哦				
			</p>
				<ul class="imgList">
					<li class="imgItem"><img src="../../assets/images/erc.jpg"/></li>
					<li class="imgItem"><img src="../../assets/images/erc.jpg"/></li>
					<li class="imgItem"><img src="../../assets/images/erc.jpg"/></li>
					<li class="imgItem"><img src="../../assets/images/erc.jpg"/></li>
				</ul>

		</div>
		
		<div class="footer">
			<ul class="f-list">
				<li class="f-item zan">赞999+</li>
				<li class="f-item buy">购买量999+</li>
			</ul>
		</div>
		
		<div class="comments">
			<ul class="commentsList">
				<li class="commentsItem">
					<div class="commenter">
						<div class="haerImg">
							<span class="haer"></span>
						</div>
						<div class="info">
							<p class="name">王多鱼</p>
						</div>
					</div>
					<div class="commentsContent">
						<p class="contentTxt">
							如果有一天，突然来了一个闪电，然后突然实物拍摄。
							裙长请参考出目标，裙子可以前面俩面」+哦如果有一
							天，突然来了一个闪电，然后突然实物拍摄。裙长请
							参考出目标，裙子可以前面俩面穿哦									
						</p>
						<p class="time">2小时前</p>
					</div>
				</li>

				<li class="commentsItem">
					<div class="commenter">
						<div class="haerImg">
							<span class="haer"></span>
						</div>
						<div class="info">
							<p class="name">王多鱼</p>
						</div>
					</div>
					<div class="commentsContent">
						<p class="contentTxt">
							如果有一天，突然来了一个闪电，然后突然实物拍摄。
							裙长请参考出目标，裙子可以前面俩面」+哦如果有一
							天，突然来了一个闪电，然后突然实物拍摄。裙长请
							参考出目标，裙子可以前面俩面穿哦									
						</p>
						<p class="time">2小时前</p>
					</div>
				</li>
				
				<li class="commentsItem">
					<div class="commenter">
						<div class="haerImg">
							<span class="haer"></span>
						</div>
						<div class="info">
							<p class="name">王多鱼</p>
						</div>
					</div>
					<div class="commentsContent">
						<p class="contentTxt">
							如果有一天，突然来了一个闪电，然后突然实物拍摄。
							裙长请参考出目标，裙子可以前面俩面」+哦如果有一
							天，突然来了一个闪电，然后突然实物拍摄。裙长请
							参考出目标，裙子可以前面俩面穿哦									
						</p>
						<p class="time">2小时前</p>
					</div>
				</li>				

			</ul>
			
			
		</div>
		
		
		
	</section>
</template>

<script>
//	import { } from './server.js'
	export default {
		data(){
			return {
				
				
			}
		},
		computed: {},
		filters: {},
		watch: {},
		methods: {},
		mounted(){}

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
				background: url(../../assets/images/erc.jpg) no-repeat 50% 50%;
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
			.imgItem{
				margin: 0;
				margin-bottom: 3px;
				box-sizing: border-box;
				display: inline-block;
				width: 49%;
				img{
					width: 100%;
				}
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
					@include fontsz(15px);
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