<template>
	<section>
    	<header-section title="收货地址"></header-section>		
		<div class="content">
			<div class="contImg" v-if="isEmpty">
				<img src="../../assets/images/Maddress_mpty.png"/>
			</div>
			<div class="addListCont" v-if="!isEmpty">
				<ul class="addList">
					<li class="addItem" v-for="item in addListData">
						<div class="addInfo" @click="selectAdd(item.id)">
							<div class="userInfo">
								<p class="name">{{item.linkman}}</p>
								<p class="phone">{{item.mobile}}</p>
							</div>
							<p class="adddetail">{{item.province}}&nbsp;{{item.city}}&nbsp;{{item.area}}&nbsp;{{item.address}}</p>
						</div>
						<div class="options">
							<div class="setDuf">
								<button class="btnD setDufBtn" v-if="item.isdefault=='0'||item.isdefault=='Y'"  @click="setDuf(item.id)" >设置为默认地址</button>
								<button class="btnD setDufBtn isDuf" v-if="item.isdefault=='1'" >设置为默认地址</button>
							</div>
							<div class="editdele">
								<button class="btnD edit" @click="toAdd(item.id)">编辑</button>
								<button class="btnD delete" @click="deleteAdd(item.id)">删除</button>
							</div>
						</div>
						<div class="dufBoder" v-if="item.isdefault==='1'"></div>
					</li>
				</ul>
			</div>
			<div class="toaddBtnBox" >
				<button class="btnC" @click="$router.push({path:'/addedit'})"><span>＋</span>添加新地址</button>
			</div>

		</div>
		
	</section>
</template>

<script>
 import headerSection from '@/components/headerSection';
 import {getAddressList,setdefault,deleteAddr,doSelectAdd} from './service.js';
  export default {
    data() {
      return {
      	isEmpty:false,
		addListData:[],
      }
    },
    components: {
       headerSection,
    },
    methods: {
		toAdd(id){

		this.$router.push({path:'/addedit',query:{addId:id}})

		},
		setDuf(id){
			setdefault({id:id}).then((res)=>{
				
				if(res.code==0){
					this._getAddressList();
					this.$message('设置成功');
				}
				
			}).catch((res)=>{
				 this.$message('网络错误！');
			})
		},
		selectAdd(id){
			let opt = {
				buyDirect:1,
				addrId:id,
				secKill:0,
				sysid:'sg',
				version:'8.9.0'		
			};
			doSelectAdd(opt).then((res)=>{
				this.$router.push({path:'/fillorder'});
			}).catch((res)=>{
				this.$message('网络错误！');
			})
		},
		deleteAdd(id){
              this.$alert.show({modelTitle:"提示",modelContent:'确定删除该地址？',callBack:()=>{
                   deleteAddr({id:id}).then((res)=>{
                   		if(res.data.state==0){
                   			 this._getAddressList();
                   			 this.$message(res.data.message);
                   		}else{
                   			 this.$message('删除失败，请重试。');
                   		}
                   	
                   }).catch((res)=>{
                   		 this.$message(res.msg);	
                   })
                   
               }}) 			
		},
		_getAddressList(){
			getAddressList().then((res)=>{
				if(res.data.length>0){
					this.addListData = res.data;
				}else{
					this.isEmpty = true;
				}
				
			}).catch((res)=>{
				 this.$message('网络错误！');	
			})

		}

    },

    mounted() {
		this._getAddressList();

 }
  }	
</script>

<style lang="scss" scoped="scoped">	
	.content{
		padding-bottom: 98px;
	}

	.contImg{
		text-align: center;
		margin-top: 35%;
		img{
			width: 502px;
		}
	}
	.addListCont{
		width: 100%;
		background: #F9F9F9;
		height: 100%;
		padding-bottom: 30px;
		border-top:1px solid  #F9F9F9;
		.addList{
			width: 100%;
			height: 100%;
			.addItem{
				padding-top: 20px;				
				background: #FFFFFF;
				min-height: 200px;
				margin-top: 16px;
				.addInfo{
					width: 100%;
					height: auto;
					.userInfo{
						padding: 0 30px;
						height: 60px;
						line-height: 60px;
						@include fontsz(16px);
						color: #333;
						display: flex;
						p{
							flex: 1;
							text-align: left;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;							
						}
					}
					.adddetail{
						padding: 0 30px;
						margin-top: 10px;
						padding-bottom: 20px;
						@include fontsz(12px);
						color: #333333;	
						border-bottom: 1px solid  #EFEFF4;					
					}
				}
				.options{
					padding: 0 30px;
					height:90px;
					display: flex;
					width: 100%;
					.setDuf{
						flex: 1;
						.setDufBtn{
							background: url(../../assets/images/check.png) no-repeat 0 50%;
							background-size:35px 35px;
							&.isDuf{
							background: url(../../assets/images/checked.png) no-repeat 0 50%;
							background-size:35px 35px;								
							}
						}
					}
					.editdele{
						flex: 1;
						text-align: right;
						.edit{
							margin-right: 10px;
							background: url(../../assets/images/Medit__3x.png) no-repeat 0 50%;
							background-size:35px 35px;
						}
						.delete{
							background: url(../../assets/images/Mdelete__3x.png) no-repeat 0 50%;
							background-size:35px 35px;
						}
					}
					.btnD{
						height: 90px;
						border: none;
						padding-left: 45px;
						@include fontsz(12px);
						color: #333333;						
					}
					
					
				}
				.dufBoder{
					height: 5px;
					width: 100%;
					background: url(../../assets/images/xuxian.png);
					background-size:cover;
				}
			}
		}
	}
	
	
	.toaddBtnBox{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 98px;
		.btnC{
			height: 98px;
			width: 100%;
			line-height: 98px;
			text-align: center;
			color: #fff;
			@include fontsz(16px);
			background:#6F7DD8;
			outline: none;
			border: none;
		}
	}
	
</style>