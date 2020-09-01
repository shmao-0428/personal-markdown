# 基于element-UI 实现的dialog自定义显示与隐藏

```js
	<!--
 * @Author: shmao
 * @Date: 2020-09-01 13:38:34
 * @LastEditors: shmao
 * @LastEditTime: 2020-09-01 15:13:06
-->
<template>
  <section class="im-dialog">
    <el-dialog
      :title="$attrs.title || '标题'"
      :width="$attrs.width"
      :visible.sync="visible"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
    >
      <!-- 自定义内容 -->
      <slot name="content" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="handleConfirm">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import props from './props';
export default {
  name: 'ImCommonDialog',
  props,
  data() {
    return {};
  },
  computed: {
    visible: {
      get() {
        return this.visibleDialog;
      },
      set() {
        this.$emit('update:visibleDialog', false);
      },
    },
  },
};
</script>

```

```js
/*
 * @Author: shmao
 * @Date: 2020-09-01 13:47:46
 * @LastEditors: shmao
 * @LastEditTime: 2020-09-01 15:11:51
 */
const VARIABLES = [
  ['visible-dialog', [Boolean, false]],
  ['handle-confirm', [Function, () => {}]],
  ['close-on-click-modal', [Boolean, false]],
  ['close-on-press-escape', [Boolean, false]],
//   ['title', [String, '标题']], // 采用$attrs
//   ['width', [String, '50%']],
  ['show-close', [Boolean, false]],
  ['center', [Boolean, false]],
];

function regx(key) {
  return key.replace(/-[a-z]{0,1}/g, function(i) {
    return i.slice(1).toUpperCase();
  });
}

const props = {};

for (const [key, [type, value]] of VARIABLES) {
  props[regx(key)] = {
    type: type,
    default: value,
  };
}
// console.log(props);
export default props;

```

