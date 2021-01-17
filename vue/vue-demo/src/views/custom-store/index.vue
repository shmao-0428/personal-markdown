<template>
  <div class="custom-store">
    <div class="content">
      <div>姓名: {{ this.$store.state.name }}</div>
      <div>年龄: {{ this.$store.state.age }}</div>
      <div>描述: {{ this.$store.getters.getName }}</div>
    </div>
    <button @click="onClick">点击修改名称</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClick() {
      //   this.$store.state.name = 'zs';
      let names = ['zs', 'ls', 'ww', 'yf', 'zf'];
      let randoms = Math.floor(Math.random() * 5);
      this.$store.commit('changName', names[randoms]);
      this.$store.dispatch('changeAgeByAction', randoms * 3);
    },
  },
};
</script>
<style lang="less">
.custom-store {
  .content {
    display: grid;
    min-height: 100%;
    grid-template-rows: auto 1fr auto;
  }
}
</style>
