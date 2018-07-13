<template>
  <div class="alertModal" ref="alert">
    <!--social post弹框-->
      <transition name="fade">
          <div v-if="modelFlag==1" class="alertbox">
            <div class="alert-dialog">
              <div class="alert-content">
                <div class="alert-header">
                    <span  class="alertclose" @click="close">×</span>
                    <span class="alert-title">
                       {{modelTitle}}
                    </span>
                </div>
                <div class="alert-body">
                    {{modelContent}}
                </div>
                <div class="alert-footer">
                    <button class="alertbtn"  @click="close">{{modelClose}}</button>
                    <button class="alertbtn alert-info" @click="submit">{{modelSave}}</button>
                </div>
              </div>
            </div>
        </div>
      </transition>
      <div v-if="modelFlag==1" class="modal-backdrop"></div>
  </div>
</template>

<script>

export default {
	 name: 'alert',
    data(){
        return{
            modelFlag:0,//0为消失，1为显示
            modelTitle:'Alert',//弹窗标题
            modelClose:'取消',//取消按钮文字
            modelContent:'',//弹窗内容
            modelSave:'确定',//确定按钮文字
            callBack:null,//是否需要回调函数
        }
    },
    methods:{
        //回调函数
        doCallBack(){
            if(typeof this.callBack == 'function'){
                this.callBack()
                this.callBack=null;
            }
        },
        //关闭弹窗，数据重置
        close(){
           this.modelFlag=0;
           this.modelTitle='Alert';
           this.modelClose='取消';
           this.modelContent='';
           this.modelSave='确定';
           this.callBack=null;
        },
        //点击确定按钮弹窗消失
        submit(){
            this.doCallBack()
            this.close()
        },
        //显示弹窗，记性复制
        show(options){
            if(this.modelFlag==1){return};
            this.modelTitle=options.modelTitle||this.modelTitle;
            this.modelContent=options.modelContent;
            this.modelFlag=1;
            this.modelSave=options.modelSave||this.modelSave;
            this.modelClose=options.modelClose||this.modelClose;
            if(options.callBack){
                this.callBack=options.callBack;
            }
        },
    },
    watch:{
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'alert.scss'
</style>
