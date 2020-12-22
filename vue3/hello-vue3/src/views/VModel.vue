<template>
  <input type="text" :value="value" @input="input" />
</template>
<script>
import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
export default defineComponent({
  props: {
    // modelModifiers: {
    //   default: () => {},
    // },
    // modelValue: String, // 如果在这里声明 context里面的attrs就不会有modelValue
  },
  setup(props, ctx) {
    // console.log(ctx);
    // console.log(ctx.attrs.modelValue);

    const value = ref(ctx.attrs.modelValue);

    // const inputValue = toRefs(
    //   reactive({
    //     val: ctx.attrs.modelValue,
    //   })
    // );

    watch(value, () => {
      console.log('vmodel---', value.value);
    });

    function input(e) {
      const targetValue = e.target.value;
      value.value = targetValue;
      ctx.emit('update:modelValue', targetValue);
    }

    return {
      value,
      input,
      //   ...inputValue,
    };
  },
});
</script>