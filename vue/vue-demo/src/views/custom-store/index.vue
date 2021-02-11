<template>
  <div class="custom-store">
    <div class="content">
      <div>姓名: {{ $store.state.name }}</div>
      <div>年龄: {{ $store.state.age }}</div>
      <div>描述: {{ $store.getters.getAge }}</div>
      <br />
      <div>姓名: {{ name }}</div>
      <div>年龄: {{ age }}</div>
      <div>描述: {{ getAge }}</div>
      <br />
      <div>姓名: {{ $store.state.a.name }}</div>
      <div>年龄: {{ $store.state.a.b.d.age }}</div>
    </div>
      <button @click="onClick" style="margin-right:20px">点击修改名称</button>
      <button @click="onClick2">点击修改名称2</button>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from '../../../../Vuex/lib/mapVuex'
export default {
  data () {
    return {

    };
  },
  computed: {
    ...mapState(['age', 'name']),
    ...mapGetters(['getAge'])
  },
  created () {
    console.log(this.$store);
  },
  methods: {
    ...mapMutations(['changName', 'changeAge']),
    ...mapActions(['changeAgeByAction']),
    onClick () {
      //   this.$store.state.name = 'zs';
      let names = ["zs", "ls", "ww", "yf", "zf"];
      let randoms = Math.floor(Math.random() * 5);
      this.$store.commit("changName", names[randoms]);
      this.$store.dispatch("changeAgeByAction", randoms * 3);
    },

    onClick2 () {
      let names = ["zs", "ls", "ww", "yf", "zf"];
      let randoms = Math.floor(Math.random() * 5);
      this.changName(names[randoms]);
      this.changeAgeByAction(randoms * 3);
    }
  }
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
