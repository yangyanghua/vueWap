<template>
	<section>
		<div class="header">
			<h1 class="h_title">{{title}}</h1>
			<a class="brack" href="javascript:history.go(-1)"></a>
		</div>
	</section>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
            title: {
                required: true,
                type: String
            }
        },
    methods: {


    },
    mounted() {

    }

  }	
</script>

<style lang="scss" scoped>
	.header{
		position: relative;
		height: 80px;
		line-height: 80px;
		text-align: center;
		box-shadow: 0 0 30px -6px #ccc;
		background: #fff;
		.h_title{
			@include fontsz(18px);
			color: #000;
			height: 80px;
			line-height: 80px;			
		}
		.brack{
			position: absolute;
			display: block;
			height: 80px;
			width: 80px;
			top: 0;
			left: 0;
			background:url(../../assets/images/return__3x.png) no-repeat 50% 50%;
			background-size:50px 50px;
		}
	}
	
</style>