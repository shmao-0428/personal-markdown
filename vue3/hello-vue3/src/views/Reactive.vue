<template>
  <div>姓名: {{ state.name }}</div>
  <button @click="changeName">修改姓名</button>
  <div>年龄: {{ state.age }}</div>
  <button @click="increment">修改年龄</button>
  <hr />
  <Ref />
</template>
<script>
import { defineComponent, reactive } from 'vue';
import Ref from '@/views/ref/ref.vue';
export default defineComponent({
  components: { Ref },
  setup() {
    const { state, increment, changeName } = useUserInfoHook();

    return { state, increment, changeName };
  },
});
/** 修改个人信息hook */
function useUserInfoHook() {
  const state = reactive({
    name: '嘻嘻',
    age: 1,
  });

  function increment() {
    state.age++;
  }

  function changeName() {
    state.name = '哈哈';
  }
  return { state, increment, changeName };
}
</script>