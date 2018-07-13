<template>
  <transition name="fade">
    <div class="kiko-message" v-if="isShow">
      {{message}}
    </div>
  </transition>
</template>

<script type="text/javascript">
  export default {
    name: 'kiko-message',
    data () {
      return {
        message: '',
        time: 3000,
        isShow: true
      }
    },
    mounted () {
      this.close()
    },
    methods: {
      close () {
        var that = this
        window.setTimeout(function() {
          that.isShow = false
        }, this.time);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .kiko-message {
    position: fixed;
    padding: 10px 30px;
	color: #333333;
	background: #E8E8E8;
    border-radius: 4px;
    @include fontsz(12px);
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999999
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
