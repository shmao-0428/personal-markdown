## el-extend-tooltip

**index.vue**

```vue
<template>
  <div
    class="ell"
    :style="`width:${maxWidth}px`">
    <el-tooltip
      effect="dark"
      :open-delay="300"
      :content="content"
      :disabled="isShowTooltip(content, maxWidth)"
      placement="top-end">
      <span>{{ content }}</span>
    </el-tooltip>
  </div>
</template>
<script>
import { isShowTooltip } from './isShowTooltip';
export default {
  name:'ImaTooptip',
  props: {
    content: {
      type: String,
      default: ''
    },
    maxWidth: {
      type:Number,
      default: 100
    }
  },
  methods: {
    isShowTooltip,
  }
}
</script>
<style lang="scss" scoped>
  .ell {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
```

**isShowTooltip.js**

```js
/**
 * @description: 根据容器宽度判断是否显示tooltip
 * @param {String} text:需要显示tooltip的文本 
 * @param {Number} largestWidth: 宽度临界值  
 * @return {Boolean} 
 */
export function isShowTooltip(text, largestWidth) {
  // 创建一个动态span计算长度
  let span = document.createElement('span');
  span.style.display = 'inline-block';
  span.style.visibility = 'hidden';
  span.textContent = text;
  document.body.appendChild(span);
  const length = window.getComputedStyle(span).width.split('px')[0] * 1;

  document.body.removeChild(span);
  const width = Number(largestWidth);
  if (length > width) {
    return false;
  } else {
    return true;
  }
}
```

**使用**

```vue
<ima-tooltip
     :content="content"
     :max-width="100" />
```

