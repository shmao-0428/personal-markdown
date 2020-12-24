<template>
  <div>your name: {{ fullName }}</div>
  <input type="text" v-model="fullName" />
  <div>your firstName: {{ firstName }}</div>
  <input type="text" v-model="firstName" />
  <div>your lastName: {{ lastName }}</div>
  <input type="text" v-model="lastName" />
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const data = toRefs(
      reactive({
        firstName: '张',
        lastName: '飞',
      })
    );
    // const fullName = computed(() => {
    //   return data.firstName.value + data.lastName.value;
    // });

    const fullName = computed({
      get() {
        return data.firstName.value + data.lastName.value;
      },
      set(val) {
        data.firstName.value = val.substring(0, 1);
        data.lastName.value = val.slice(1);
      },
    });

    return {
      fullName,
      ...data,
    };
  },
});
</script>
