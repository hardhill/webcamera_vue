<template>
  <app-main-menu/>
  <router-view/>
</template>
<script>
import AppMainMenu from '@/components/AppMainMenu.vue'
export default {
  components:{
    AppMainMenu
  },
  setup() {
    
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
body{
  font-family: 'Roboto', sans-serif;
}

</style>
