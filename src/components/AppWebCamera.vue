<script setup lang="ts">
import { watch } from "@vue/runtime-core";
import { computed,  } from "vue";
import { useStore } from "vuex";

const store = useStore()
const screenOn = computed(()=>{
    return store.getters.getCameraActive
})
   
</script>
<template>
    <div class="video" v-if="screenOn"></div>
</template>
<style scoped>
.video{
    height: 400px;
    width: 640px;
    background-color: rgb(126, 120, 97);
}
</style>