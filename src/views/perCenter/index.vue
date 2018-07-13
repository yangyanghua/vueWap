<template>
	<section>	
		<div class="header" id="heaer" >
			<button class="btnE" @click="showDownload" >下载码上花</button>
			<a class="brack" href="javascript:history.go(-1)"></a>
		</div>
		<div class="content">
			<div class="banner">
				
				<div class="portrait" v-if="user.image" style="background-size:cover ;" v-bind:style="{backgroundImage: 'url(' + user.image + ')'}"></div>
				<div class="portrait" v-else></div>
				<h2 class="userName">{{user.mobilePhone}}</h2>
			</div>
			<p class="my_order">我的订单</p>			
			<div class="orderListContent">
				<ul class="orderList" id="orderList" >
					<li class="orderItem" v-for="item in orderData" >
						<div class="orderHeader">
							<p class="shopName">{{item.storeNm}}</p>
							<p class="orderStatus">{{item.orderState | orderStatus}}</p>
						</div>
						<div class="proListContent">
							<ul class="porList">
								<li class="proItem" v-for="pro in item.orderItems" @click="showDownload">
									<div class="proImgBox">
										<span class="proImg" style="background-size:cover ;" v-bind:style="{backgroundImage: 'url(' + pro.productImages + ')'}" ></span>
									</div>
									<div class="proInfo">
										<p class="proName">{{pro.productName}}</p>
										<p class="proSku">{{pro.productSku}}</p>
										<p class="proPrice">¥{{pro.amount}}</p>
									</div>
									<div class="proTotal">
										<p class="total">×&nbsp;{{pro.quantity}}</p>
									</div>
								</li>
							<div class="proFoter">
								<p class="allproTotal">共{{item.productQuantity}}件商品 </p>
								<p class="totalPrice">合计：¥{{item.amount}}</p>
							</div>	
							</ul>
						</div>
						<div class="orderFoter" v-if="item.orderState==12">
							<button class="btnF" @click="showDownload" >立即付款</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>
<script>
 import headerSection from '@/components/headerSection';
 import {getCustomerOrderList} from './service.js';
  export default {
    data() {
      return {
      	isEmpty:false,
      	loading:true,
      	loadAll:false,
      	orderData:[],
      	user:{},
      }
    },
    components: {
       headerSection,
    },
		filters: {
			orderStatus: function(StatusCode) {
				let status = '';
				switch(StatusCode) {
					case 0:
						status = '已处理';
						break;
					case 1:
						status = '正在处理';
						break;
					case 2:
						status = '待处理';
						break;
					case 3:
						status = '已取消';
						break;
					case 4:
						status = '已删除';
						break;
					case 5:
						status = '已确认';
						break;
					case 6:
						status = '已废弃';
						break;						
					case 7:
						status = '配货中';
						break;						
					case 8:
						status = '待收货';
						break;	
					case 9:
						status = '已签收';
						break;						
					case 10:
						status = '过期';
						break;						
					case 11:
						status = '待发货';
						break;						
					case 12:
						status = '待付款';
						break;						
					case 13:
						status = '已退货';
						break;						
					case 14:
						status = '待审核';
						break;						
					case 15:
						status = '海关已审核';
						break;						
					case 16:
						status = '已保留';
						break;						
					case 18:
						status = '订单逾期取消';
						break;
					case 21:
						status = '部分发货';
						break;
					case 22:
						status = '母订单全部出库';
						break;
					case 23:
						status = '母订单取消细项生成的子单';
						break;
					case 31:
						status = '待退款';
						break;
					case 32:
						status = '己退款';
						break;
					case 33:
						status = '己拒签';
						break;
					default:
						break;
				}
				return status;
			}

		},    
    methods: {
    	showDownload(){
    	   this.$store.commit('refresh');
    	},
		_getCustomerOrderList(page){
			this.$loading.start();
			let opt = {
				page:page,
				pageSize:'10'	
			}
			getCustomerOrderList(opt).then((res)=>{
				if(res.data.data.length==0){
					this.loadAll = true;
				}else{
					this.orderData = this.orderData.concat(res.data.data);
				}
				if(this.orderData.length==0){
					this.isEmpty = true;  
				}
				this.$loading.end();
			}).catch((res)=>{
				this.$message(res.message);
				this.$loading.end();
			})
		}
		
    },

    mounted() {
    	let page = 1;
		this.user  = JSON.parse(sessionStorage.getItem('user'))||{};    	
		this._getCustomerOrderList(page);
		let heaer = document.getElementById('heaer');
		let body = document.body;
		let vm = this; 
		window.onscroll = function(){
			heaer.style.backgroundColor = 'rgba(111,125,216,'+(body.scrollTop)/250+')';
			let startLoad = window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight ;
			if(startLoad&&!vm.loadAll){
				page++;
				vm._getCustomerOrderList(page);
			}		
		};
 	}
  }	
</script>

<style lang="scss" scoped="scoped">	
	.header{
		position: fixed;
		z-index: 1000;
		height: 80px;
		width: 100%;
		line-height: 80px;
		text-align: center;
		background: none;
		.btnE{
			@include fontsz(18px);
			color: #fff;
			float: right;
			margin-right: 30px;
			height: 80px;
			background: none;
			border: none;
			outline: none;
			line-height: 80px;			
		}
		.brack{
			position: absolute;
			display: block;
			height: 80px;
			width: 80px;
			top: 0;
			left: 0;
			background:url(../../assets/images/brack.png) no-repeat 50% 50%;
			background-size:20px 34px;
		}
	}
	
	.banner{
		height: 375px;
		padding-top: 100px;
		background: url(../../assets/images/bg__3x.png) no-repeat 50% 50%;
		background-size:cover;
		.portrait{
			height: 132px;
			width: 132px;
			margin: auto;
			border-radius:50%;
			background: url(../../assets/images/defaultImg__3x.png) no-repeat 50% 50%;
			background-size:cover;
		}
		.userName{
			width: 100%;
			text-align: center;
			@include fontsz(17px);
			color: #FFFFFF;	
			margin-top: 15px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;						
		}
	}
	.my_order{
		padding: 0 30px;
		height: 64px;
		line-height: 64px;
		@include fontsz(14px);
		color: #333333;		
	}
	
	.orderListContent{
		width: 100%;
		padding-bottom: 20px;
		background: #F9F9F9;
		border-top:1px solid  #F9F9F9;/*no*/
		.orderList{
			width: 100%;
			height: auto;
			background: none;
			.orderItem{
				min-height: 200px;
				background: #fff;
				margin-top: 20px;
				p{
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;									
				}				
				.orderHeader{
					padding: 0 30px;
					height: 80px;
					width: 100%;
					border-bottom: 1px solid #EFEFF4;
					display: flex;
					p{
						height: 80px;
						line-height: 80px;
						@include fontsz(13px);
						color: #333333;
					}		
					.shopName{
						flex: 1;
						padding-left: 40px;
						background: url(../../assets/images/Mshop__3x.png) no-repeat 0 50%;
						background-size: 30px 30px;
					}
					.orderStatus{
						flex: 0 0  150px;
						text-align: right;
						color: #FF2C68;
					}
				}
				.proListContent{
					width: 100%;
					height: auto;
					.porList{
						position: relative;
						width: 100%;
						/*height: 274px;*/
						overflow: hidden;
						padding-bottom: 64px;
						.proItem{
							display: flex;
							height: 212px;
							border-bottom: 1px solid #EFEFF4;
							padding: 0 30px;
							.proImgBox{
								flex: 0 0 212px;
								.proImg{
									display: block;
									height: 168px;
									width: 168px;
									background: url(../../assets/images/com_img__3x.png) no-repeat 50% 50%;
									background-size:cover;
									margin-top: 22px;
								}
							}
							.proInfo{
								flex: 1;
								.proName{margin-top: 22px;@include fontsz(14px);color: #333333;width: 400px;}
								.proSku{@include fontsz(13px);color: #999;width: 400px;}
								.proPrice{@include fontsz(15px);color: #FF2C68;width: 400px;}
							}
							.proTotal{
								flex: 0 0 80px;
								.total{margin-top: 22px;@include fontsz(13px);color: #999;text-align: right;}
							}
						}
					}
					.proFoter{
						height: 64px;
						width: 100%;
						padding: 0 30px;
						display: flex;
						position: absolute;
						bottom: 0;
						left: 0;
						p{
							@include fontsz(13px);
							color: #333333;							
						}
						.allproTotal{
							position: relative;
							flex: 1;
							height: 64px;
							line-height: 64px;
							text-align: left;
						}
						.totalPrice{
							flex: 1;
							height: 64px;
							line-height: 64px;
							text-align: right;
						}
					}
				}
			}
			.orderFoter{
				position: relative;
				height: 80px;
				width: 100%;
				padding: 0 30px;
				border-top:1px solid #EFEFF4;				
				.btnF{
					position: absolute;
					top: 50%;
					margin-top: -26px;
					right: 30px;
					height: 52px;
					line-height: 52px;
					color:#FF2C68;
					outline: none;
					background: #fff;
					border: 1px solid #FF2C68;/*no*/
					border-radius: 4px;
					padding: 0 20px;
				}
			}
		}
	}

</style>