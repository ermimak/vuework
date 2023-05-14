<template>
  <div id="app" style="position: absolute;height: 100%;width:100%;overflow-x: hidden">

    <transition :name="transitionName" mode="in-out">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: ''
      };
    },
    watch: {
      $route(to, from) {
        if (to.path === '/' && from.path === '/') {
          this.transitionName = 'show-animate';
        } else if (to.path === '/home' && from.path === '/') {
          this.transitionName = 'login-animate';
        } else if (to.path === '/') {
          this.transitionName = 'logout-animate';
        } else {
          this.transitionName = '';
        }
      }
    }
  };
</script>
<style>
</style>
