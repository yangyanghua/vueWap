/* 1.state在vuex中用于存储数据 */
var state={
    isLoading:false,
    download_show:false
}
/* 2.mutations里面放的是方法，方法主要改变state里面的数据 */

var mutations={
    refresh(){
        state.download_show=true;
    },
    loading(){
        state.isLoading=!state.isLoading;
    },
    
}

var actions={
    refresh(context){
        context.commit('refresh');
    },

    
}

export default{
    state,
    mutations,
    actions
}