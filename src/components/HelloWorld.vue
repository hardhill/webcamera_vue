

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="setMessage">new message</button>  
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"
var props = defineProps({
  msg: String
})
const msg = ref(props.msg)
 
function setMessage(){
  msg.value = 'Only composition'
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
