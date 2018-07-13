<template>
	<section id="logo">
		<div class="logo">
			<img src="../../assets/images/logo-copy-6__3x.png" alt="">
		</div>
		<div class="content">
			<ul>
				<li><input type="text" id="buyer_phone" class="lphone" v-model="identify" placeholder="请输入手机号" /></li> <!--@blur="onPhone()"-->
				<li class="list">
				<input type="text" class="password" v-model="code" placeholder="请输入验证码" />
				<p class="login_zi"  @click="sendeCheckCode" v-if="!isSendCode">
					获取验证码
				</p>
				<p class="login_zi" v-else>
					<span style="color: #F87E5B;">{{second}}s</span>后重新发送
				</p>
				</li>
				<li class="list">
				<input type="password" id="loginPwd" class="lphone" v-model="loginPwd" placeholder="请输入新密码" />
				<p class="login_ico" @click="onloginPwdSwitch()" id="loginPwd_ico" style="right:20px">
					<img :src="imgUrl" alt="">
				</p>
				</li>
			</ul>
			<div>
				<button class="login" @click="loginBtn()">
					注册
				</button>
				<p class="signUp" > 已有账号在此   <span @click="$router.push({path:`/login/${productId}`})">登录</span></p>
			</div>
		</div>
		<div class="footer" v-show="isOriginHei">
			客服电话： <span > <a href="tel:400-850-6055">400-850-6055</a></span>
		</div>
		<!-- <div class="error" v-if="err">
			{{message}}
		</div> -->
	</section>

</template>
<script>
import {register,getMobileVerifyCode} from './service.js'; /*接口数据*/
  export default {
    data() {
      return {
      		identify:'',
      		loginPwd:'',
      		type:'1',
      		message:'',
      		imgUrl:require('../../assets/images/cansee__3x.png'),
      		code:'',
      		second:60,
			isSendCode:false,
			err:false,
			errSecond:2,
			pwdSwitch:false,
			isOriginHei:true,
      		screenHeight: document.body.clientHeight,// 这里是给到了一个默认值 （这个很重要），
    		originHeight: document.body.clientHeight,//默认高度在watch里拿来做比较
    		productId: '',
      	
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
    	/*失去焦点验证 新密码*/
    	onPassword(){
    		var reg = /^[a-zA-Z0-9]*([a-zA-Z][0-9]|[0-9][a-zA-Z])[a-zA-Z0-9]*$/;  //必须带有数字和字母，但是不能有特殊符号。
			var str = this.loginPwd;
			
			var num = 0;
		    var rule1 = /[\D]+/;
		    var rule2 = /[^(a-zA-Z)]+/;
		    var rule4 = /[^(\~\!\@\#\$\%\^\&\*\{\}\;\,\.\?\/\'\")]/;
		    var rule5 = /^.{6,20}$/;
		    var flag1 = rule1.test(str);
		    var flag2 = rule2.test(str);
		    var flag4 = rule4.test(str);
		    var flag5 = rule5.test(str);
		    
		    console.log(str)
		    console.log(flag4)
		    if(!flag1){
		    	num= num+1
		    	if(!(num>2)){
		    		console.log(num)
		    		this.$message('密码不能是纯数字');
		    		return false
		    	}
		    }
		    if(!flag2){
		    	num= num+1
		    	if(!(num>2)){
		    		console.log(num)
		    		this.$message('密码不能是纯字母');
		    		return false
		    	}
		    }
		    if(!flag4){
		    	num= num+1
		    	if(!(num>2)){
		    		console.log(num)
		    		this.$message('密码不能是纯特殊符号');
		    		return false
		    	}
		    }
		    if(!flag5){
		    	num= num+1
		    	if(!(num>2)){
		    		console.log(num)
		    		this.$message('密码必须为6-20位字符');
		    		return false
		    	}
		    }
		    return true
    	},
    	/*密文转明文*/
    	onloginPwdSwitch(){
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
    	/*失去焦点验证 手机号*/
    	onPhone(){
    		var reg =/^1[\d]{10}$/;
			var str = this.identify;
			if(!reg.test(str)){
				// this.promptBox('请输入的正确的手机号码');
				this.$message('请输入的正确的手机号码');
				return false;
			}
			return true;
    	},
    	/*获取手机验证代码*/
    	sendeCheckCode(){	
		 	if(!this.onPhone()){
		 		// console.log(636)
		 		return false
		 	}else{
		 		// alert('111')
		 		var _this = this;
			 	this.second = 60;
			 	this.isSendCode=true;
			 	var timer = setInterval(function(){
			 		if(_this.second>0){
			 			_this.second--;
			 		}else{
			 		  clearInterval(timer);
			 		  _this.isSendCode=false;
			 		}
			 	},1000)
			 	/*接口请求*/
			 	getMobileVerifyCode({
	 				mobile:this.identify,
	 				type:this.type
	 			}).then(res=>{

	 				this.$message(res.message);

	 			}).catch((err)=>{
	 				// alert('11111',err)
	 				this.$message(err.message);
	 			});	
		 	}
		 },
		 /*提交注册*/
		 loginBtn(){
		 	if(!this.onPassword()){
		 		return false
		 	}else{
		 		this.$loading.start();
	    		let password = this.$md5(this.loginPwd+'chinawidth');
	    		register({
	    			identify:this.identify,
	    			loginPwd:password,
	    			registerCode:this.code
	    		}).then(res=>{
	    			this.$message(res.message);
					this.$loading.end();
					this.$router.push(`/login/${this.productId}`);
	    		}).catch((err)=>{
	    			this.$message(err.message);
	    			this.$loading.end();
	    		})
		 	}
    	},
		 
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
   		this.productId = this.$route.params.productId; //从产品详细带来的商品ID
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
		margin: 50px auto;
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
			line-height: 100px;
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
			a{
				color: #6F7DD8;
			}
		}
	}
	.signUp{
		text-align: right;
		position: relative;
		top: 15px;
		font-size: 26px;
		span{
			color: #6F7DD8;
		}
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
