<!--
 * @Author: shmao
 * @Date: 2020-11-28 14:42:45
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-28 14:52:56
-->
<template>
  <picker-date v-model="time" />
</template>

<script>
import PickerDate from './src/picker-date';
export default {
  name: 'app',
  data() {
    return {
      time: new Date(),
    };
  },
  components: { PickerDate },
};
</script>
