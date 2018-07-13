<template>
	<section id="fillorder">
		<header-section title="订单填写"></header-section>
        <div class="main" v-if="dataset">
            <div class="addrEntry">
                <div class="content content2" v-if="address.areaId == 0">
                    <router-link to="/addlist">
                        <img src="@/assets/images/Maddress__2x.png" class="fl" />
                        <span class="fl">请选择收货地址</span>
                        <i class="right_icon fr"></i>
                    </router-link>
                </div>
                <div class="content content1" v-else>
                    <router-link to="/addlist">
                        <div class="top">
                            <b class="username">{{address.linkman}}</b>
                            <b class="tel">{{address.mobile.substr(0,3)+"****"+address.mobile.substr(7)}}</b>
                        </div>
                        <div class="bottom clfix">
                            <img src="@/assets/images/Maddress__2x.png" class="fl" />
                            <span class="fl detail">{{address.province}} {{address.city}} {{address.area}} {{address.address}}</span>
                        </div>
                    </router-link>
                </div>
                <div class="line"><img src="@/assets/images/Mdashed__2x.png"/></div>
            </div>
            <div class="goodslist">
                <div class="top">
                    <img src="@/assets/images/Mshop__2x.png"/>
                    <span class="company">{{order.entName}}</span>
                </div>
                <div class="detail clfix">
                    <div class="fl img" ><img :src="order.orderItems[0].image" class="locate" /></div>
                    <div class="detail_right fr">
                        <p class="name">{{order.orderItems[0].name}}</p>
                        <span class="color" v-show="order.orderItems[0].skuName">{{order.orderItems[0].skuName}}</span>
                        <div class="clfix"><span class="price fl">￥{{order.orderItems[0].priceFormat}}</span><span class="qty fr">&times;{{order.orderItems[0].quantity}}</span></div>
                    </div>
                </div>
            </div>
            <div class="invoice">
                <div class="check"><label for="invoice_check"><input type="checkbox" id="invoice_check"  @click="invoice_check = !invoice_check"/> 我要开发票</label></div>
                <div class="switch" v-if="invoice_check">
                    <div class="type">
                        <h5>发票类型</h5>
                        <ul>
                            <li class="self" @click="invoice_type=0"><i :class="{check_icon:true,checked:invoice_type == 0}"></i>个人</li>
                            <li class="company" @click="invoice_type=1"><i :class="{check_icon:true,checked:invoice_type == 1}"></i>公司</li>
                        </ul>
                    </div>
                    <div class="title">
                        <h5>发票抬头</h5>
                        <input type="text" placeholder="请填写发票抬头" v-model="invoice_msg.title" ref="title"/>
                    </div>
                    <div class="identify" v-if="invoice_type == 1">
                        <h5>纳税人识别号</h5>
                        <input type="text" placeholder="请填写纳税人识别号" v-model="invoice_msg.identify" ref="identify"/>
                    </div>
                </div>
            </div>
            <div class="other">
                <ul>
                    <li><span class="fl">店铺优惠</span><span class="fr sale">{{ruleInfo || '无优惠'}}</span></li>
                    <li><span class="fl">商品金额</span><span class="fr price">￥{{dataset.productTotalPrice.toFixed(2)}}</span></li>
                    <li><span class="fl">运费</span><span class="fr freight">￥{{dataset.amountFreight.toFixed(2)}}</span></li>
                    <li><span class="fl">立减</span><span class="fr sub">-￥{{dataset.amountPreferential.toFixed(2)}}</span></li>
                </ul>
            </div>
        </div>
        <div class="footer" v-if="dataset">
            <div class="left fl"><b>实付款：<span class="realpay">￥{{dataset.totalAmountFormat}}</span></b></div>
            <button class="btn fr" @click="submitorder">提交订单</button>
        </div>
        <!-- <form action="${iflashbuy_wap_outerurl}/app/regOrder.json" name="wapForm" id="wapForm" method="post">
            <input type="hidden" id="parameter" name = "parameter" value=""/>
            <input type="hidden" id="f" name = "f" value="1"/>
            <input type="hidden" id="s" name = "s" value=""/>
            <input type="hidden" id="count" name = "count" value=""/>
            <input type="hidden" :value="dataset.buyUrl"  name="buyUrl" />
            <input type="hidden" :value="dataset.sysid"  name="sysid" />
            <input type="hidden" :value="order.settleItemPrice.promotionItemPrices.entCode"  name="entCode" />
        </form> -->
	</section>
</template>
<script>
    import './fillorder.scss'
    import headerSection from '@/components/headerSection';
    import {getOrderData,regOrder} from './service.js';
    export default {
        data() {
          return {
            userMsg:{},
          	invoice_check:false,
            invoice_type:0,
            invoice_msg:{title:"",identify:""},
            dataset:null,
            address:null,
            order:null,
            ruleInfo:''
          }
        },
        components: {
            headerSection
        },

        mounted(){
            if(!window.sessionStorage.user){
                this.$router.push({path:'login'});
                return false;
            }
            this.userMsg = JSON.parse(window.sessionStorage.user).data;
            
            // this.userMsg={  // 调试用！！！
            //     imei:'e80598ed3a7f389395382ad73ddca34f',
            //     key:'e80598ed3a7f389395382ad73ddca34f'
            // }
            
            // 开启loading
            this.$loading.start();
            getOrderData({}).then(res=>{
                console.log(res)
                this.$loading.end();
                if(res.result == "success"){
                    var settleOrder = res.settleOrder;
                    this.dataset = settleOrder;
                    this.address = settleOrder.address;
                    this.order = settleOrder.orders[0];
                    if(settleOrder.orders[0].ruleResults){
                        settleOrder.orders[0].ruleResults.forEach(item=>{
                            this.ruleInfo += item.ruleInfo + ','
                        })
                        this.ruleInfo = this.ruleInfo.slice(0,-1);
                    }
                }
            }).catch(err=>{
                this.$loading.end();
                console.log(err)
                this.$message({
                    message: '网络或系统错误！',
                    time: 2000
                })
            })
        },
        methods: {
            submitorder(){
                var receiptFlag,receiptType;
                if(!this.invoice_check){
                    this.invoice_msg={title:"",identify:""}
                    receiptFlag=0;receiptType=1;
                }else{
                    this.invoice_msg.title = this.invoice_msg.title.trim()
                    this.invoice_msg.identify = this.invoice_msg.identify.trim()
                    if(this.invoice_type == 0){
                        this.invoice_msg.identify = "";
                        receiptFlag=1;receiptType=1;
                        if(this.invoice_msg.title == ""){
                            this.$message({
                                message: '请填写发票抬头',
                                time: 2000
                            })
                            this.$refs.title.focus();
                            return false;
                        }
                    }else if(this.invoice_type == 1){
                        receiptFlag=1;receiptType=2;
                        if(this.invoice_msg.title == ""){
                            this.$message({
                                message: '请填写发票抬头',
                                time: 2000
                            })
                            this.$refs.title.focus();
                            return false;
                        }else if(this.invoice_msg.identify == ""){
                            this.$message({
                                message: '请填写纳税人识别号',
                                time: 2000
                            })
                            this.$refs.identify.focus();
                            return false;
                        }
                    }
                }
                if(!this.address.address || this.address.address == ''){
                    this.$message({
                        message: '请选择收货地址',
                        time: 2000
                    })
                }else{
                    var _address=this.address;

                    // 获取时间戳
                    var t = new Date();
                    t=t.getTime();

                    var params = {
                        'leaguerid':this.userMsg.id,
                        'leaguerType':2,
                        'leaguername':this.userMsg.name,
                        'name':this.userMsg.name,
                        'version':'8.9.0',
                        'secKill':0,
                        't':t,
                        'mobilechannel':this.dataset.mobileChannel,
                        'sysid':this.dataset.sysid,
                        'idCardDTO.frontImg':'',
                        'idCardDTO.backImg':'',
                        'buyUrl':this.dataset.buyUrl,
                        'address.id':_address.id,
                        'address.linkman':_address.linkman,
                        'address.phone':_address.mobile || _address.phone,
                        'address.provinceid':_address.provinceid,
                        'address.cityid':_address.cityid,
                        'address.areaId':_address.areaId,
                        'address.address':_address.address,
                        'address.province':_address.province,
                        'address.city':_address.city,
                        'address.area':_address.area,
                        'couponId':0,
                        'receipt.flag':receiptFlag,
                        'receipt.type':receiptType,
                        'receipt.name':this.invoice_msg.title,
                        'receipt.receiptCode':this.invoice_msg.identify
                    }
                    if(this.dataset.sgCouponCount>0) params['couponIdNew'] = 0;
                    this.dataset.orders.forEach((item,idx)=>{
                        params['orders['+idx+'].id'] = item.id;
                        params['orders['+idx+'].entId'] = item.entId;
                        params['orders['+idx+'].remarks'] = '';
                        if(item.isZT==1 && item.electronic!=1){
                            params['orders['+idx+'].sendMethod'] = 1;
                            params['orders['+idx+'].isZT'] = item.isZT;
                            params['orders['+idx+'].ztAddrName'] = item.ztAddrName;
                            params['orders['+idx+'].ztAddr'] = item.ztAddr;
                            params['orders['+idx+'].ztPhone'] = item.ztPhone;
                        }else if(item.isZT!=1 && item.electronic!=1){
                            params['orders['+idx+'].sendMethod'] = 2;
                        }else if(item.isZT!=1 && item.electronic==1){
                            params['orders['+idx+'].sendMethod'] = 3;
                            params['orders['+idx+'].electronic'] = item.electronic;
                        }
                    })
                    this.$loading.start();
                    regOrder(params).then(res=>{
                        this.$loading.end();
                        this.$router.push({path:'pay'});
                    }).catch(err=>{
                        this.$loading.end();
                        this.$message({
                            message: '提交失败！',
                            time: 2000
                        })
                    })
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
	
</style>
