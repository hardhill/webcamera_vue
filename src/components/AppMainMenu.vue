<template>
  <nav class="menu">
    <div class="logo">WebCam Easy</div>
    <div class="switcher">
      <app-switcher/>
    </div>
  </nav>
</template>

<script setup lang="ts">
import AppSwitcher from '@/components/AppSwitcher.vue'

   
</script>

<style scoped>
.menu{
  display: flex;
  justify-content: space-between;
}

.logo{
  font-size: 24px;
  font-weight: 400;
}
</style>
