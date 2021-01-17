<template>
  <div id="toast" v-if="show">
    <div>{{ text }}</div>
  </div>
</template>
<script>
export default {
  name: "Toast"
  // props: {
  //   show: Boolean,
  // },
  // data() {
  //   return {
  //     text: '弹框内容',
  //     // show: true,
  //   };
  // },
};
</script>
<style scoped>
#toast {
  position: fixed;
  top: calc(50%);
  left: calc(50%);
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 0 4px;
}
</style>
