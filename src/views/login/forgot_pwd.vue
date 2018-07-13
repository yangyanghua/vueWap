<template>
	<section id="logo">
		<div class="logo">
			<img src="../../assets/images/logo-copy-6__3x.png" alt="">
		</div>
		<div class="content">
			<ul>
				<li><input type="text" class="lphone" id="buyer_phone"  maxLength=11 v-model="identify" placeholder="请输入手机号" /></li> <!--@blur="onPhone()"-->
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
				<input type="password" id="loginPwd" class="lphone" @blur="onPassword()"  v-model="loginPwd" placeholder="请输入新密码" /> <!--@blur="onPassword()"-->
				<p class="login_ico" @click="onloginPwdSwitch()" id="loginPwd_ico" style="right:20px">
					<img :src="imgUrl" alt="">
				</p>
				</li>
				<li class="list">
				<input type="password" class="lphone" id="loginPwdNew" v-model="loginPwdNew" placeholder="请再次输入新密码" />
				<p class="login_ico" @click="onPwdSwitch()" id="login_ico" style="right:20px">
					<img :src="imgUrlNes" alt="">
				</p>
				</li>
			</ul>
			<div>
				<button class="login" @click="loginBtn()">
					确认
				</button>
				<p class="signUp" > 已有账号在此   <span @click="$router.push({path:`/login/${productId}`})">登录</span></p>
				
			</div>
		</div>
		<div class="footer" v-show="isOriginHei">
			客服电话： <span>400-850-6055</span>
		</div>
		<!-- <div class="error" v-if="err">
			{{message}}
		</div> -->
	</section>

</template>
<script>
import {getMobileVerifyCode,changePsw} from './service.js'; /*接口数据*/
  export default {
    data() {
      return {
      		identify:'',
      		loginPwd:'',
      		loginPwdNew:'',
      		message:'',
      		isForgetPsw:'Y',
      		code:'',
      		imgUrl:require('../../assets/images/cansee__3x.png'),
      		imgUrlNes:require('../../assets/images/cansee__3x.png'),
      		second:60,
			isSendCode:false,
			err:false,
			type:'2',
			errSecond:2,
			pwdSwitch:false,/*密文转明文 开关*/ 
			isOriginHei:true,
      		screenHeight: document.body.clientHeight,// 这里是给到了一个默认值 （这个很重要），
    		originHeight: document.body.clientHeight,//默认高度在watch里拿来做比较
    		productId: '', //商品ID
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
    	/*失去焦点验证 新密码*/
    	onPassword(){
    		var reg = /^[0-9a-zA-Z]+$/;
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
    	/*失去焦点验证 确认密码*/
    	onPwdNew(){
    		var reg = this.loginPwd;
			var str = this.loginPwdNew;
			if(str!=reg){
				// this.promptBox('你输入的密码跟上面的不一样');
				this.$message('两次密码输入不一致');
				return false;
			}
			return true;
    	},
    	/*密文转明文*/
    	onPwdSwitch(){
    		var pwdSwitch = this.pwdSwitch;
			var pwdin = document.getElementById("loginPwdNew");
			var ico = document.getElementById("login_ico");
			if(!this.loginPwdNew==''){
				if (!pwdSwitch) {
					pwdin.type = "text"; 
					this.imgUrlNes = require('../../assets/images/psnosee__3x.png');
					this.pwdSwitch = true;
				}else{
					pwdin.type = "password";
					this.imgUrlNes = require('../../assets/images/cansee__3x.png');
					this.pwdSwitch = false;
				}	
			}
    	},
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
    	/*获取手机验证*/
    	sendeCheckCode(){
		 	if(!this.onPhone()){
			 	return false;
		 	}else{
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
			 	},1000);
			 	/*接口请求*/
			 	getMobileVerifyCode({
	 				mobile:this.identify,
	 				type:this.type
	 			}).then(res=>{
	 				this.$message(res.message);
	 			}).catch((err)=>{
	 				this.$message(err.message);
	 			});
		 	}
		 },
		 /*提交忘记密码*/
		 loginBtn(){
			if(!this.onPassword()){
				return false
			}else if(!this.onPwdNew()){
				return false
			}
			else{
				this.$loading.start();
	    		let password = this.$md5(this.loginPwdNew+'chinawidth'); // md5密码加密
	    		changePsw({
	    			identify:this.identify,
	    			loginPwdNew:password,
	    			registerCode:this.code,
	    			isForgetPsw:this.isForgetPsw
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
 	}
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
