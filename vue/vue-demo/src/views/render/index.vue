<template>
  <div>
    <button @click="onChange(true)">isRed = true</button>
    <button @click="onChange(false)">isRed = false</button>
    <RenderComponent :is-red="isRed" />
  </div>
</template>
<script>
import RenderComponent from "@/components/render/render.js";
export default {
  components: {
    RenderComponent
  },
  data() {
    return {
      isRed: true
    };
  },
  methods: {
    onChange(isRed) {
      this.isRed = isRed;
    }
  }
};
</script>
<style scoped>
button {
  display: block;
  margin: 5px 0;
  width: 100px;
}
</style>
