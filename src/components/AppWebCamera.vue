<template>
    <div class="videobg" v-if="!screenOn"></div>
    <video ref="webcam" class="video" :class="{showvideo:screenOn}"></video>
</template>

<script setup lang="ts">
import { onMounted, watch } from "@vue/runtime-core";
import { computed, ref,  } from "vue";
import { useStore } from "vuex";

const store = useStore()
const webcam = ref(null)
const screenOn = computed(()=>{
    return store.getters.getCameraActive
})
watch(screenOn,(newValue,oldValue)=>{
    
     if(newValue){
         console.log(webcam.value)
     }else{
         console.log('nothing')
     }
    
})

onMounted(()=>{
    console.log(webcam.value)
})
   
</script>

<style scoped>
.videobg{
    height: 400px;
    width: 640px;
    background-color: rgb(126, 120, 97);
}
.video{
    width: 640px;
    height: 400px;
    display: none;
}
.showvideo{
    display: block;
}
</style>