<template>
  父组件: <input type="text" v-model="input">
  子组件: <Model v-model="input" />
</template>

<script>
import Model from './Model.vue';
import { defineComponent } from "vue";

export default defineComponent({
    components: {Model},
    setup() {
        // const
    }
})
</script>