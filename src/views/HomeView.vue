<template>
  <div class="home">
    <app-web-camera/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppWebCamera from '@/components/AppWebCamera.vue'

export default {
  name: 'HomeView',
  components: {
    AppWebCamera
  }
}
</script>
