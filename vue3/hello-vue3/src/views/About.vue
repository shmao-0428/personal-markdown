<template>
  <div class="about">
    <h1>ref: {{ count }}</h1>
    <h1>toRefs(reactive): {{ foo }}</h1>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <br />
    <hr />
    About组件: <input type="text" v-model="bar" /> 
    v-model组件: <VModel v-model="bar" />
  </div>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, toRef, watch } from 'vue';
import VModel from './VModel';
export default defineComponent({
  components: { VModel },
  setup(props, ctx) {
    // 接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property.value。
    const count = ref(0);
    const bar = ref('this is v-model');
    const state = toRefs(
      reactive({
        foo: 0,
      })
    );

    function sub() {
      count.value > 0 && count.value--;
      state.foo.value > 0 && state.foo.value--;
    }

    function add() {
      count.value++;
      state.foo.value++;
    }

    watch(bar, () => {
      console.log('bar>>>', bar.value);
    });

    return {
      add,
      count,
      sub,
      bar,
      ...state,
    };
  },
});
</script>