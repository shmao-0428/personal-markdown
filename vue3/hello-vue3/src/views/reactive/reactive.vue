<template>
  <div>姓名: {{ state.name }}</div>
  <button @click="changeName">修改姓名</button>
  <div>年龄: {{ state.age }}</div>
  <button @click="increment">修改年龄</button>
  <hr />
  <div>测试reactive 响应简单类型</div>
  <input type="text" v-model="text" />
  <button @click="clear">清空</button>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    const { state, increment, changeName } = useUserInfoHook();
    // const { text } = userTextHook();

    const text = ref('这是text');

    watch(text, () => {
      console.log(text.value);
    });

    function clear() {
      text.value = '';
    }

    return { state, increment, changeName, text, clear };
  },
});

function userTextHook() {
  const text = reactive('这是text');
  console.log(text);
  return { text };
}

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
