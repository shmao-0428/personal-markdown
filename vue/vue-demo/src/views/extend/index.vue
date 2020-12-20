<template>
  <div>
    <h1>
      <a href="https://www.bilibili.com/video/BV1D54y1C7ST?from=search&seid=9989379109570125677"
        >使用Vue.extend动态创建弹框</a
      >
    </h1>
    <button @click="onClick">点击弹框提示</button>
    <!-- <toast :show="show" /> -->
  </div>
</template>
<script>
// import Toast from '@/components/Toast/toast.vue';
export default {
  //   components: { Toast },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onClick() {
      //   this.show = true;
      this.$toast('hello world!');
    },
  },
};
</script>
