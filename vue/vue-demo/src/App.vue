<template>
  <div id="app">
    <button type="button" @click="goBack">go back to home page</button>
    <!-- <input type="button" class="d-button" @click="goBack" value="go back to home page" /> -->
    <hr />
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      if (location.pathname !== ('/home' || '/')) {
        this.$router.push('/home');
      }
    },
  },
};
</script>
<style lang="less">
// button style copy by https://www.zhangxinxu.top/GitHub/demo-Snap.svg/demo/basic/
button:active {
  -webkit-transform: translate(2px, 2px);
  -ms-transform: translate(2px, 2px);
  transform: translate(2px, 2px);
  box-shadow: 1px 1px #a0b3d6, 2px 2px #a0b3d6;
}
button:hover {
  background-color: #e3e8f2;
  color: #333;
}
button {
  display: inline-block;
  padding: 0.5em 1em;
  color: #444;
  border: 0;
  border-radius: 0.2em;
  background-color: #f0f3f9;
  box-shadow: 1px 1px #a0b3d6, 2px 2px #a0b3d6, 3px 3px #a0b3d6, 4px 4px #a0b3d6;
  text-decoration: none;
  text-shadow: 1px 1px #f0f3f9;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;
  outline: none;
}
button :focus {
  outline: 0;
}
input[type='submit'],
input[type='reset'],
input[type='button'] {
  outline: none;
  filter: chroma(color=#000000);
}
</style>
