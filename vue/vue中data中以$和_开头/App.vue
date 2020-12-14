<template>
  <div>
    <div>
      {{ $data.$d }}
    </div>
    <div>
      {{ list }}
    </div>
    <!-- {{ _data._i }} -->
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      list: [1, 2, { a: 1 }],
      $d: {}, // Property "$d" must be accessed with "$data.$d" because properties starting with "$" or "_" are not proxied in the Vue instance to prevent conflicts with Vue internals.
      //   _i: 'fsdf', //https://segmentfault.com/a/1190000016885433
    };
  },
  created() {
    document.addEventListener('click', () => {
      //   this.list = [2, 3];
      this.list = {};
      //   alert(this._data._i)
    });
    document.addEventListener('dblclick', () => {
      this.list = [1, 2];
      this.list.push(1);
    });
  },
};
</script>