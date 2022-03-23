<script setup lang="ts">
import { WebCam } from "@/lib/webcameasy";
import { onMounted, watch } from "@vue/runtime-core";
import { computed, Ref, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const webcamel = ref(null);
const canv = ref(null)
const sound = ref(null)
const picture:Ref<string | undefined> = ref("")
var webcam: WebCam | null = null;
const screenOn = computed(() => {
  return store.getters.getCameraActive;
});
const isPicture = computed(()=>{
  return picture.value != undefined && picture.value != ''
})
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

async function  snapScreen(){
    picture.value = await webcam?.snap();
}
</script>

<template>
  <div>
    
        <div id="errorMsg" class="col-12 col-md-6 alert-danger d-none">
            Fail to start camera, please allow permision to access camera. <br/>
            If you are browsing through social media built in browsers, you would need to open the page in Sarafi (iPhone)/ Chrome (Android)
            <button id="closeError" class="btn btn-primary ml-3">OK</button>
        </div>
        <div class="app-panel">     
                <div class="webcam-container col-12 p-0 m-0" :class="{'d-none':!screenOn}">
                    <video class="webcamera" ref="webcamel" autoplay playsinline width="640" height="480"></video>
                    <canvas class="canvas" ref="canv" :class="{'d-none':isPicture}"></canvas>
                    <!-- <div class="flash"></div> -->
                    <audio ref="sound" src="audio/snap.wav" preload = "auto"></audio>
                  <div class="cameraControls">
                    <a href="#" title="Exit App" :class="{'d-none':!isPicture}"><i class="material-icons">exit_to_app</i></a>
                    <a href="#" title="Take Photo" @click.stop="snapScreen"><i class="material-icons" :class="{'d-none':isPicture}">camera_alt</i></a>
                    <a href="#" download="selfie.png" target="_blank" title="Save Photo" :class="{'d-none':!isPicture}"><i class="material-icons">file_download</i></a>  
                    <a href="#" title="Resume Camera" :class="{'d-none':!isPicture}"><i class="material-icons">camera_front</i></a>
                  </div>
                </div>
                
        </div>        
        
        
    
  </div>
</template>



<style scoped>


  .app-panel{
    display: flex;
    text-align: center;
  }

  .webcamera{
    display: block;
    position: relative;
    width: auto;
    height: 90vh;
    z-index: 999;
    pointer-events: none;
    margin: auto;
  }

 #errorMsg {
     position: fixed;
     top: 22vh;
     left: 0;
     padding: 20px;
     z-index: 999999;
 }

 @media screen and (min-width: 768px) {
    #errorMsg {
        position: fixed;
        top: 32vh;
        left: 20vw;
        padding: 20px;
        z-index: 999999;
    }
 }

#cameraFlip {
  width: 70px;
    height: 55px;
    margin-left: 40px;
    margin-top: -10px;
    position: absolute;
    cursor: pointer;
    background-color: black;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.cameraControls {
  position: absolute;
  bottom: 5rem;
  width: 100%;
  z-index: 99999;
  background: transparent;
  opacity: 0.7;
  padding: 10px;
}


.material-icons{
  width: 100px;
  font-size: 50px !important;
  color: white;
  width: 80px;
  height: 80px;
  background-color: black;
  border-radius: 50%;
  padding-top: 15px;
  margin: 0 10px;
}

.flash{ 
  position:fixed; 
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:#fff;
  z-index: 999999;
}

#canvas{
  background-color: transparent;
  position: absolute;
  width: auto;
  height: 100vh;
  z-index: 9999;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: 420px) {
  .form-control.webcam-start{
    width: 300px;
  }
}

@media screen and (max-width: 767px) {
  .cameraControls {
    bottom: 25vh;
  }
}

</style>