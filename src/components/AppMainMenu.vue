<template>
  <nav class="menu">
    <div class="logo">WebCam Easy</div>
    <div class="switcher">
      <app-switcher @change="onChangeSwitcher($event)"/>
    </div>
  </nav>
</template>

<script setup lang="ts">
import AppSwitcher from '@/components/AppSwitcher.vue'
import { useStore } from 'vuex'
const store = useStore()
function onChangeSwitcher(event:any){
  store.dispatch('changeStateCamera',event)
}
   
</script>

<style scoped>
.menu{
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 1rem;
}

.logo{
  font-size: 24px;
  font-weight: 400;
}
</style>
