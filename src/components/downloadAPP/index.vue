<template>
	<section id="downloadApp" >
		<div class="shade" @click="$store.state.app.download_show = false"></div>
        <div class="main locate">
            <div class="top">
                <img src="@/assets/images/mshlogo__2x.png" class="logo" />
                <img src="@/assets/images/mshTitle__2x.png" class="title" />
            </div>
            <div class="bottom">
                <button class="cancel" @click="$store.state.app.download_show = false">取消</button>
                <button class="goto" @click="gotoDown">前去下载</button>
            </div>
        </div>
        <div class="pop-wx-mask js-wx-pop" v-if="wxMask" @click="wxMask=false">
            <img src="@/assets/images/wx_tip.png" class="wx">
            <p>请点击右上角<br/>选择在浏览器打开</p>
        </div>
	</section>
</template>

<script>
  export default {
    name:'downloadApp',
    data() {
      return {
        wxMask:false
      }
    },
    methods: {

        gotoDown(){
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var isWeixin = u.toLowerCase().indexOf('micromessenger') != -1;
            if (isWeixin) {
                this.wxMask = true;
            } else if (isIOS) {
                window.location.href = 'https://itunes.apple.com/cn/app/id1367130251';
            } else {
                window.location.href = 'http://msh.z-code.cn/download/softfiles/mashanghua_8.8.8_s25.apk';
            }
        }
    },
    mounted() {
		let s =  document.getElementById('downloadApp');
		s.ontouchmove = function(e){ 		
    		let event = window.event || e;
    		event.stopPropagation();
    		event.preventDefault(); 		
		}
    }
  }	
</script>

<style lang="scss" scoped>
    #downloadApp{
        .shade{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:1000;}
        .main{
            width:500px;height:490px;background: url(../../assets/images/bg-img__2x.png) no-repeat 0 0;background-size:contain;padding:0;border:0 none;z-index:10000;
            .top{
                height: 319px;padding-top: 70px;
                img{margin: 0 auto;display: block;}
                img.logo{margin-bottom: 50px;width: 217px;}
                img.title{width: 336px;}
            }
            .bottom{
                padding-top: 60px;
                button{width: 180px;height: 70px;background: #CDCFDE;color:#fff;border:0 none;border-radius:40px;@include fontsz(16px);margin-left: 42px;}
                button.goto{background: #FF2C67;}
            }
        }
        .pop-wx-mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000000;
            background: rgba(0, 0, 0, 0.8);
            text-align: right;
            padding: .80645161rem;
            box-sizing: border-box;
            p{
                color: #FFF;
                text-align: center;
                font-size: .46774194rem;
                letter-spacing: .12096774rem;
            }

            img.wx{
                width: 1.62903226rem;
                height: 2.53225806rem;
            }
        }
    }
	
</style>