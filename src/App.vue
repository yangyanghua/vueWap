<template>
  <div id="app">

    <router-view></router-view>
    <loading ref='loading'></loading>
    <download-app v-if="$store.state.app.download_show"></download-app>
    <alert ref='alert'></alert>
  </div>
  
</template>

<script>
  import Vue from 'vue'	
  import {bus} from '@/common/js/bus.js';
  import downloadApp from '@/components/downloadAPP';
  
  export default {
    name: 'app',
    data() {
      return {

      }
    },
    components: {
      downloadApp,
    },
    mounted() {
			 Vue.prototype.$alert = this.$refs.alert;
			 Vue.prototype.$loading = this.$refs.loading;
      // let vm = this;
      // bus.$on('loading', function (showLoading) {
      //     vm.isLoading = showLoading? true: false;
      //     console.log('loading: ', vm.isLoading);
      // })
    }
  }

</script>

<style lang="scss">
@import './assets/css/basic.scss';
  body,html {
    position: relative;
    height: 100%;
    overflow: auto;
  }

  #app {
    min-height: 100vh;
    overflow: auto;
    overflow-x: hidden;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter,
  .fade-leave-to
  /* .fade-leave-active in below version 2.1.8 */

  {
    opacity: 0
  }

</style>
