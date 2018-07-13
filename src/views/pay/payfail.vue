<template>
	<section>
    	<header-section title="支付结果"></header-section>		
		<div class="payContent">
			<div class="staIocn">
				<img src="../../assets/images/payfail.png"/>
				<h2>订单支付失败</h2>
			</div>
			<div class="contImg">
				<img src="../../assets/images/ordersue_3__3x.png"/>
			</div>
			<div class="btnBox">
				
				<button class="btn btnA">查看订单</button>
				<button class="btn btnB">重新支付</button>

			</div>
			<p class="toDown">下载码上花APP，尊享更多优惠与体验</p>
			
		</div>
		
	</section>
</template>

<script>
 import headerSection from '@/components/headerSection';	
  export default {
    data() {
      return {
      	activeIndexs:1,

      }
    },
    components: {
       headerSection,
    },
    methods: {

		
    },

    mounted() {


 }
  }	
</script>

<style lang="scss" scoped="scoped">
	
	.staIocn{
		text-align: center;
		margin-top: 80px;
		img{
			height: 116px;
			width: 116px;
		}
		h2{
			margin-top: 40px;
			@include fontsz(16px);
			color: #333333;			
		}
	}
	.contImg{
		text-align: center;
		margin-top: 40px;
		img{
			width: 448px;
			height: 352px;
		}
	}
	.btnBox{
		text-align: center;
		margin-top: 50px;
		.btn{
			display: block;
			width: 600px;
			height: 72px;
			@include fontsz(16px);
			line-height: 72px;
			text-align: center;
			border-radius: 4px;
			background: none;
			margin: auto;
			margin-bottom: 40px;
			&.btnA{
				border: 1px solid #666666;
				color: #666;
			}
			&.btnB{
				
				border: 1px solid #6F7DD8;
				background: #6F7DD8;
				color: #fff;
				
			}			
		}
	}
		.toDown{
			width: 100%;
			text-align: center;
			@include fontsz(16px);
			color: #FF2C68;			
		}
</style>