// 下拉框容器滚动事件
Vue.directive('el-select-scroll', {
  bind: function (el, binding) {
    // select下拉容器
    const $selectDropdom = el.querySelector( '.el-select-dropdown .el-select-dropdown__wrap');
    $selectDropdom.addEventListener('scroll', function() {
      const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
      if (condition) {
        binding.value();
      }
    });
  },
  unbind: function (el) {
    // select下拉容器
    const $selectDropdom = el.querySelector( '.el-select-dropdown .el-select-dropdown__wrap');
    if ($selectDropdom) {
      if ($selectDropdom.getEventListeners) {
        $selectDropdom.removeEventListener('scroll');
      }
    }
  }
});