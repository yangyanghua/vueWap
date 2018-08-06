<template>
  <div id="app">

    <router-view></router-view>

  </div>
  
</template>

<script>
  import Vue from 'vue'	
  import {bus} from '@/common/js/bus.js';

  export default {
    name: 'app',
    data() {
      return {

      }
    },
    components: {

    },
    mounted() {

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
