

<template>
  <div
    class="bswitch"
    :class="{ onswitch: isActive }"
    @click="changeActiveClass"
  >
    <div class="control" :class="{ oncontrol: isActive }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits<{
  (e: "change", value: boolean): void;
}>();

const isActive = ref(false);
function changeActiveClass() {
  isActive.value = !isActive.value;
  emit("change", isActive.value);
}
</script>
// =======================================================
<style scoped>
.bswitch {
  display: flex;
  height: 32px;
  width: 68px;
  background-color: #c4c4c4;
  border-radius: 20px;
  cursor: pointer;
}
.onswitch {
  justify-content: flex-end;
  background-color: #70d670;
}
.control {
  height: 32px;
  width: 32px;
  background-color: #334233;
  border-radius: 100%;
}
.oncontrol {
  background-color: #468646;
}
</style>

