<template>
	<section>
		<h1>123</h1>

	</section>

</template>
<script>
  export default {

    data() {
      return {
      	activeIndexs:1,
      }
    },
    components: {
    },
    methods: {
    	handelPalyend(){
		this.mySwiper.startAutoplay();
    	},
    	handelPaly(){
    		this.mySwiper.stopAutoplay();
    	},
		handleTonewsList(type){
			this.$router.push({path:'newslist',query:{type:type}})

		},
    },

    mounted() {
    var self = this;
	this.mySwiper = new Swiper('.swiper-container',{
		 loop : true,
		 autoplay:2000,
		 speed:400,
		 pagination : '.swiper-pagination',
	});

 }
  }

</script>

<style lang="scss" scoped>
	h1{
		@include fontsz(18px);
		width: 600px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		margin: auto;
		background: #6F7DD8;
		border-radius: 2px;
		color: #fff;
	}

</style>
