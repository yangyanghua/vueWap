<template>
	<section id="logo">
		<div class="logo">
			<img src="../../assets//images/logo-copy-6__3x.png" alt="">
		</div>
		<div class="content">
			<ul>
				<li><input type="number" class="lphone" v-model="identify" placeholder="请输入手机号" /></li>
				<li class="list">
				<input type="password" id="loginPwd" class="password"  v-model="loginPwd" @keyup.enter="loginEnter"  placeholder="请输入密码" /> <!--@blur="onPassword()"-->
				<p class="login_ico" @click="onloginPwdSwitch()" id="loginPwd_ico" >
					<img :src="imgUrl" alt="">
				</p>
				<p class="login_zi" @click="$router.push({path:`/forgot_pwd/${productId}`})">
					忘记密码
				</p>
				<p class="line"></p>
				</li>
			</ul>
			<div>
				<button class="login" @click="loginBtn()">
					登录
				</button>
				<p class="signUp" @click="$router.push({path:`/registration/${productId}`})">立即注册</p>
			</div>
		</div>
		<div class="footer" v-show="isOriginHei">
			登录即表示您同意 <span @click="protocol()">《用户服务协议》</span>
		</div>
		<!-- <div class="error" v-if="err">
			{{message}}
		</div> -->

	</section>

</template>
<script>
import {login} from './service.js'; /*接口数据*/
  export default {
    data() {
      return {
      		identify:'',
      		loginPwd:'',
      		message:'',
      		imgUrl:require('../../assets/images/cansee__3x.png'),
      		err:false,
      		second:2,
      		pwdSwitch:false,
      		isOriginHei:true,
      		screenHeight: document.body.clientHeight,// 这里是给到了一个默认值 （这个很重要），
    		originHeight: document.body.clientHeight,//默认高度在watch里拿来做比较
    		productId: ''
      }
    },

    methods: {


    	/*封装提示窗*/
   //  	promptBox(name){
   //  		var _this = this;
			// this.errSecond = 2;
			// var timer = setInterval(function(){
		 // 		if(_this.errSecond>0){
		 // 			_this.errSecond--
		 // 			_this.err=true;
		 // 			_this.message = name
		 // 		}else{
		 // 		  clearInterval(timer);
		 // 		  _this.err=false;
		 // 		  return false;
		 // 		}
		 // 	},1000);
   //  	},
    	/*密文转明文*/
    	onloginPwdSwitch(){
    		// console.log(!this.loginPwd)
    		var pwdSwitch = this.pwdSwitch;
			var pwdin = document.getElementById("loginPwd");
			var ico = document.getElementById("loginPwd_ico");
    		if(!this.loginPwd==''){
    			if (!pwdSwitch) {
					pwdin.type = "text"; 
					this.imgUrl = require('../../assets/images/psnosee__3x.png');
					this.pwdSwitch = true;
				}else{
					pwdin.type = "password";
					this.imgUrl = require('../../assets/images/cansee__3x.png');
					this.pwdSwitch = false;
				}
    		}
    	},
    	/*失去焦点验证 新密码*/
   //  	onPassword(){
   //  		var reg = /^[0-9a-zA-Z]+$/;
			// var str = this.loginPwd;
			// if(!reg.test(str)){
			// 	this.$message('请输入的密码不正确');
			// }
   //  	},
    	/*失去焦点验证 手机号*/
   //  	onPhone(){
   //  		var reg =/^1[\d]{10}$/;
			// var str = this.identify;
			// if(!reg.test(str)){
			// 	this.$message('请输入的正确的手机号码');
			// }
   //  	},
    	loginBtn(){
    		this.$loading.start();
    		let productId = this.$route.params.productId; //通过产品详细传过的商品ID
    		let password = this.$md5(this.loginPwd+'chinawidth');
    		login({
    			identify:this.identify,
    			loginPwd:password
    		}).then(res=>{
    			this.$message(res.message);
				this.$loading.end();
				sessionStorage.setItem('user', JSON.stringify(res.data));
				// console.log('susccss-----',productId);
				if(productId){
					this.$router.push({
						path: `/productDetail/${productId}`
						
					});
				}
			     
    		}).catch((err)=>{
    			this.$message(err.message);
    			this.$loading.end();
    		})
    	},
    	/*回车触发登录*/
    	loginEnter(){
    		this.$loading.start();
    		let password = this.$md5(this.loginPwd+'chinawidth');
    		login({
    			identify:this.identify,
    			loginPwd:password
    		}).then(res=>{
    			this.$message(res.message);
				this.$loading.end();
				sessionStorage.setItem('user', JSON.stringify(res.data));
				
    		}).catch((err)=>{
    			this.$message(err.message);
    			this.$loading.end();
    		})
    	},
    	protocol(){
    		 this.$router.push({path:'/protocol'})
    	}

    },
    watch: {
        screenHeight(val) {
            this.screenHeight= val
        }
    },
    watch: {
        screenHeight (val) {
            if(this.originHeight != val) {
                this.isOriginHei = false;
            }else{
                this.isOriginHei = true;
            }
        }
    },
    mounted() {
   		const that = this;
   		console.log('router----',this.$route.params);
   		this.productId = this.$route.params.productId;

        window.onresize = () => {
            return (() => {
                window.screenHeight= document.body.clientHeight
                that.screenHeight= window.screenHeight
            })()
        }

 	},
    
  }

</script>

<style lang="scss" scoped>
	.logo{
		width:232px;
		height: 70px;
		margin: 100px auto 50px auto;
		img{
			width: 100%;
		}

	}
	.content{
		padding: 50px 74px;
		li{
			width: 100%;
			height:104px;
			border-bottom: 1px solid #eee;
			font-size: 28px;
		}
		.list{
			position: relative;
			.login_ico{
				position: absolute;
				top: 25px;
				right: 140px;
				width: 36px;
				height: 12px;
			}
			.login_zi{
				position: absolute;
				top:25px;
				right: 0px;
				color: #6F7DD8;
				
			}
			.line{
				position: absolute;
				top:35px;
				right: 125px;
				border-left: 1px solid #D8D8D8;
				height: 30px;
			}
		}
		.lphone{
			border: none;
			padding-top: 35px;
			color: #515151;
			width: 100%;
		}
		.password{
			border: none;
			padding-top: 35px;
			color: #515151;
			width: 70%;
		}
	}
	.login{
		width: 100%;
		height: 80px;
		background: #6F7DD8;
		border-radius: 2px;
		color: #fff;
		text-align: center;
		margin-top: 150px;
		border: none;
		cursor: pointer;
		font-size: 28px;
	}
	.footer{
		position: fixed;
		bottom: 20px;
		text-align: center;
		width: 100%;
		font-size: 26px;
		span{
			color: #6F7DD8;
		}
	}
	.signUp{
		text-align: right;
		position: relative;
		top: 15px;
		color: #6F7DD8;
		font-size: 26px;
		cursor: pointer;
	}
	.error{
		position: fixed;
		z-index: 2;
		width: 368px;
		height: 102px;
		line-height: 102px;
		text-align: center;
		background: #E8E8E8;
		border-radius: 2px;
		top: 32%;
		left: 50%;
		margin-left: -184px;
		font-size: 24px;
	}

</style>
