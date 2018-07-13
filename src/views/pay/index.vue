<template>
	<section>
    	<header-section title="订单支付"></header-section>		
		<div class="payContent">
			<div class="needPay">
				<p class="labelTxt">需支付金额：</p>
				<p class="o_price"><span class="yangjiao">¥</span>140.00</p>
			</div>
			<div class="logobanner">
				<img src="../../assets/images/mshlogo__3x.png"/>
				<h2>官方支付，安全快捷</h2>
			</div>
			<div class="payTypec">
				<ul class="paylist">
					<li class="payItem">
						<div class="b_logo longka">
							<img src="../../assets/images/longLOGO__3x.png"/>
						</div>
						<div class="b_txt">
							<p class="payName">建行支付</p>
							<p class="instructions">储蓄卡/信用卡</p>
						</div>
						<div class="b_checkBox">
							
							<span @click="checkPayType(0)" v-bind:class="{'avtive':payType===0}" class="checkType"></span>	
							
						</div>
					</li>
					<li class="payItem">
						<div class="b_logo">
							<img src="../../assets/images/ccbLOGO__3x.png"/>
						</div>
						<div class="b_txt">
							<p class="payName">建行分期</p>
							<p class="instructions">快速分期，便捷购物</p>							
						</div>
						<div class="b_checkBox">
							
							<span @click="checkPayType(1)" v-bind:class="{'avtive':payType===1}" class="checkType"></span>	
														
						</div>
					</li>
					<li class="fenqiCheck" >
						<div class="fenqiItem" v-bind:class="{'avtive':qishu===0}"  @click="checkQishu(0)">
							<p class="qishu">不分期</p>
							<p class="price">无需手续费</p>
						</div>

						<div class="fenqiItem" v-bind:class="{'avtive':qishu===1}" @click="checkQishu(1)">
							<p class="qishu">不分期</p>
							<p class="price">无需手续费</p>
						</div>

						<div class="fenqiItem" v-bind:class="{'avtive':qishu===2}" @click="checkQishu(2)">
							<p class="qishu">不分期</p>
							<p class="price">无需手续费</p>
						</div>

						<div class="fenqiItem" v-bind:class="{'avtive':qishu===3}" @click="checkQishu(3)">
							<p class="qishu">不分期</p>
							<p class="price">无需手续费</p>
						</div>
					</li>		
					<li class="otherPay">
						其他支付
					</li>

					<li class="payItem">
						<div class="b_logo">
							<img src="../../assets/images/weixin__3x.png"/>
						</div>
						<div class="b_txt">
							<p class="payName">微信支付</p>
							<p class="instructions">微信安全支付</p>							
						</div>
						<div class="b_checkBox">
							
							<span @click="checkPayType(2)" v-bind:class="{'avtive':payType===2}" class="checkType"></span>	
							
						</div>
					</li>
					<li class="payItem">
						<div class="b_logo">
							<img src="../../assets/images/yinlian__3x.png"/>
						</div>
						<div class="b_txt">
							<p class="payName">银联支付</p>
							<p class="instructions">方便快捷，安全可靠</p>							
						</div>
						<div class="b_checkBox">
							
							<span @click="checkPayType(3)" v-bind:class="{'avtive':payType===3}" class="checkType"></span>	
							
						</div>
					</li>
				</ul>
			</div>
			
			<div class="topay">
				<button class="toPayBtn">立即付款</button>
			</div>
			
		</div>
	</section>
</template>

<script>
 import headerSection from '@/components/headerSection';	
  export default {
    data() {
      return {
      	activeIndexs:1,
      	payType:'',
      	qishu:'',
      }
    },
    components: {
       headerSection,
    },
    methods: {
		checkPayType(type){
			console.log(type);
		let fenqiCheck = document.getElementsByClassName('fenqiCheck')[0];	
		console.log(fenqiCheck)			
			this.payType = type;
			if(type==1){
				fenqiCheck.style.height = 0.5+5+"rem";
			}else{
				fenqiCheck.style.height = "0";
			}
			
		},
		checkQishu(num){
			this.qishu = num;
		}
		
    },

    mounted() {
    var self = this;



 }
  }	
</script>

<style lang="scss" scoped="scoped">
.payContent{
	padding-bottom: 98px;
}
	.needPay{
		padding: 0 30px;
		height:96px;
		line-height: 96px;
		width: 100%;
		display: flex;
		background: #F9F9F9;
		.labelTxt{
			flex: 3;
			text-align: left;
			@include fontsz(16px);
		}
		.o_price{
			flex: 4;
			text-align: right;
			color: #FF2C68;
			@include fontsz(16px);
			.yangjiao{
				@include fontsz(12px);
			}
		}
	}
	.logobanner{
		border-top:20px solid  #EEEEEE;
		height: 124px;
		line-height: 124px;
		padding: 0 30px;
		background: #F9F9F9;
		img{
			width: 150px;
			height: 35px;
			float: left;
			margin-top:33px;
		}
		h2{
			float:left;		
			@include fontsz(14px);
			height: 100%;
			margin-left: 20px;
			line-height: 108px;
			color: #333333;	
		}
	}
	.payTypec{
		background: #fff;
		
		height: auto;
		.paylist{
			width: 100%;
			height: auto;
			.payItem{
				padding: 0 30px;
				height: 145px;
				border-bottom: 1px solid #CECED2;/*no*/
				display: flex;
				.b_logo{
					flex: 0 0 100px;
					img{
						margin-top: 37px;
						width: 64px;
						width: 64px;
					}
					&.longka{
						img{
							margin-top: 28px;
							width: 82px;
							width: 82px;
						}						
					}
				}
				.b_txt{
					flex: 1;
					text-align: left;
					.payName{
						@include fontsz(14px);
						color: #333333;
						margin-top: 25px;						
					}
					.instructions{
						@include fontsz(12px);
						color: #999999;						
					}
				}
				.b_checkBox{
					flex: 0 0  100px;
					position: relative;
					.checkType{
						
						position: absolute;
						display: block;
						height: 50px;
						width: 50px;
						top: 50%;
						margin-top: -25px;
						right: 0;
						background: url(../../assets/images/check.png) no-repeat 50% 50%;
						background-size:35px 35px;
						&.avtive{
							background: url(../../assets/images/checked.png) no-repeat 50% 50%;
							background-size:35px 35px;
						}
					}
				}
			}
			.otherPay{
				height: 70px;
				line-height: 70px;
				text-align: left;
				padding: 0 30px;
				background: #EEEEEE;
				@include fontsz(14px);
				color: #333333;				
			}
			.fenqiCheck{
				height: auto;
				background: #fff;
				text-align: center;
				height: 0;
				transition: all 0.4s;
				overflow: hidden;
				.fenqiItem{
					position: relative;
					display: inline-block;
					height: 152px;
					width: 292px;
					padding: 30px;
					margin-top: 30px;
					background: #F9F9F9;
					border: 1px solid #E7E7E9;
					.qishu{
						position: relative;
						z-index: 10;						
						@include fontsz(14px);
						text-align: center;
						color: #1A1A1A;						
					}
					.price{
						position: relative;
						z-index: 10;
						@include fontsz(12px);
						color: #999;	
						text-align: center;					
					}
					&.avtive{
						border: 1px solid #FF2C68;
					}
					&.avtive::before{
						content: '';
						position: absolute;
						bottom: 0;
						right: 0;
						height: 100%;
						width: 100%;
						background: url(../../assets/images/fenqi__3x.png) no-repeat 50% 50%;
						background-size:100% 100%;
						z-index: 5;
					}
				}
				.fenqiItem:nth-child(2n){ 
					margin-left: 30px;
				}
			}
		}
	}
	.topay{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 100;
		height:98px;
		.toPayBtn{
			border: none;
			outline: none;
			width: 100%;
			height: 98px;
			line-height: 98px;
			text-align: center;
			background: #6F7DD8;
			color:#fff;
			@include fontsz(15px);
		}
	}	
	

</style>