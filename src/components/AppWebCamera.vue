<template>
  <div>
    <div class="videobg">
      <video
        ref="webcamel"
        class="video"
        :class="{ showvideo: screenOn }"
        autoplay
        playsinline
        width="640"
        height="480"
      ></video>

      <canvas ref="canv" class="d-none"></canvas>
    </div>

    <div class="flash"></div>
    <audio ref="sound" src="audio/snap.wav" preload="auto"></audio>
    <div class="row">
      <button class="btn" @click="snapScreen">SNAP</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WebCam } from "@/lib/webcameasy";
import { onMounted, watch } from "@vue/runtime-core";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const webcamel = ref(null);
const canv = ref(null)
const sound = ref(null)
var webcam: WebCam | null = null;
const screenOn = computed(() => {
  return store.getters.getCameraActive;
});
watch(screenOn, (newValue, oldValue) => {
  if (newValue) {
    try {
      webcam?.start(newValue)
    } catch (e) {}
  } else {
    console.log("nothing");
  }
});

onMounted(() => {
  webcam = new WebCam(webcamel.value!,canv.value,sound.value);
})

function snapScreen(){
    let picture = webcam?.snap();
}
</script>

<style scoped>
.videobg {
  display: flex;
  justify-content: center;  
  height: 400px;
  width: 640px;
  background-color: rgb(126, 120, 97);
}
.video {
  width: 640px;
  height: 400px;
  display: none;
}
.showvideo {
  display: block;
}
.d-none {
  display: none;
}
.row {
  display: flex;
  margin: 0.5rem 0rem;
}
.btn{
    background-color: #8dc28d;
    border: #515f51 solid 1px;
    padding: 1rem 1.4rem;
    cursor: pointer;
    border-radius: 5px;
}
</style>