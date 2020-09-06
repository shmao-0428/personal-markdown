# 版本一 : 完全封装

### 代码

```vue
<!--
 * @Author: shmao
 * @Date: 2020-09-05 20:22:18
 * @LastEditors: shmao
 * @LastEditTime: 2020-09-06 00:47:24
-->
<template>
  <div class="div-form">
    <div class="title">{{ $attrs.title }}</div>
    <div v-if="!showInput" class="main" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <span ref="span" class="span" />

      <i v-show="showIcon" class="el-icon-edit" @click.stop="handleInputShowing" />
    </div>
    <el-input ref="input" class="input" v-if="showInput && type === 'text'" :value="input" @blur="handleBlur" @input="onInput" />
    <el-select
      ref="input"
      v-if="showInput && type === 'select'"
      :value="input"
      placeholder="请选择"
      @focus="handleSelectFocus"
      @change="handleChange"
      @visible-change="handelVisibleChange"
      @blur="handleSelectBlur"
      style="width: calc(100% - 80px);"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'DivForm',
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    input: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showIcon: false,
      showInput: false,
      hasFocus: false,
      visibleSelectChange: false,
    };
  },
  mounted() {
    let value = this.input;
    if (this.type === 'select') {
      this.options.forEach((item) => {
        if (item.value === this.input) {
          value = item.label;
        }
      });
    }
    this.$refs.span.innerText = value;
  },
  methods: {
    handleMouseEnter() {
      this.showIcon = true;
    },
    handleMouseLeave() {
      this.showIcon = false;
    },
    handleInputShowing() {
      this.showInput = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleBlur() {
      this.showInput = false;
      this.$nextTick(() => {
        this.$refs.span.innerText = this.input;
      });
      this.handleMouseLeave();
    },
    onInput(e) {
      this.$emit('input', e);
    },
    handleChange(e) {
      this.$emit('input', e);
      this.showInput = false;
      this._handleInputValue();
    },
    handleSelectBlur() {
      if (this.hasFocus && !this.visibleSelectChange) {
        this._handleInputShowing();
      }
      this.handleMouseLeave();
    },
    handleSelectFocus() {
      this.hasFocus = true;
    },
    handelVisibleChange(e) {
      if (e) {
        this.visibleSelectChange = true;
      } else {
        this._handleInputShowing();
      }
    },
    async _handleInputShowing() {
      this.showInput = false;
      await this._handleInputValue();
      this.hasFocus = false;
      this.visibleSelectChange = false;
    },
    _handleInputValue() {
      this.$nextTick(() => {
        let value = this.input;
        if (this.type === 'select') {
          this.options.forEach((item) => {
            if (item.value === this.input) {
              value = item.label;
            }
          });
        }
        this.$refs.span.innerText = value;
      });
    },
  },
};
</script>

<style>
.div-form {
  display: flex;
  width: 280px;
  height: 40px;
  line-height: 40px;
}
.div-form .title {
  text-align: right;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  float: none;
  display: inline-block;
  width: 80px;
}
.div-form .main {
  flex: 1;
  border-bottom: 1px solid #ccc;
  padding: 0 15px;
  position: relative;
}
.div-form .main:hover {
  padding: 0 15px;
  cursor: pointer;
}
.div-form .main .el-input__inner {
  border: none;
  border-bottom: 1px solid #cccccc;
  border-radius: 0;
}
.form .el-icon-edit {
  position: absolute;
  right: 10px;
  top: 12px;
}
.div-form .main:hover .el-icon-edit {
  color: #409eff;
}
.form .span {
  font-size: 14px;
}
.input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: calc(100% - 80px);
  background-color: #fff;
  background-image: none;
  box-sizing: border-box;
  color: #606266;
  height: 40px;
  line-height: 40px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>

```

### 使用

```html
<el-form :label-position="labelPosition" inline label-width="80px" :model="formLabelAlign" style="display:flex;">
      <form-div style="margin-right:10px" title="活动区域:" v-model="formLabelAlign.region" />
      <form-div style="margin-right:10px" title="活动形式:" v-model="formLabelAlign.type" :options="options" type="select" />
      <form-div style="margin-right:10px" title="名称:" v-model="formLabelAlign.name" />
    </el-form>
```

![image-20200906084955404](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200906084955404.png)







# 版本二: 保留el-form-item

### 代码

```vue
<!--
 * @Author: shmao
 * @Date: 2020-09-05 20:22:18
 * @LastEditors: shmao
 * @LastEditTime: 2020-09-06 08:56:12
-->
<template>
  <div class="form-label">
    <div v-if="!showInput" class="form-label-main" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <span ref="context" class="form-label-context" />
      <i v-show="showIcon" class="el-icon-edit" @click.stop="handleInputShowing" />
    </div>
    <el-input ref="input" class="form-label-item" v-if="showInput && type === 'text'" :value="input" @blur="handleBlur" @input="onInput" />
    <el-select
      ref="input"
      v-if="showInput && type === 'select'"
      :value="input"
      placeholder="请选择"
      @focus="handleSelectFocus"
      @change="handleChange"
      @visible-change="handelVisibleChange"
      @blur="handleSelectBlur"
      style="width: 100%"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'FormLabelDiv',
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    input: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showIcon: false,
      showInput: false,
      hasFocus: false,
      visibleSelectChange: false,
    };
  },
  mounted() {
    this._handleInputValue();
  },
  methods: {
    handleMouseEnter() {
      this.showIcon = true;
    },
    handleMouseLeave() {
      this.showIcon = false;
    },
    handleInputShowing() {
      this.showInput = true;
      // 自动聚焦
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleBlur() {
      this.showInput = false;
      this.$nextTick(() => {
        this.$refs.context.innerText = this.input;
      });
      this.handleMouseLeave();
    },

    /**
     *  配合v-model实现双向数据绑定
     * @param e 输入框的值
     */
    onInput(e) {
      this.$emit('input', e);
    },

    /**
     *  配合v-model实现双向数据绑定
     * @param e 选择框的值
     */
    handleChange(e) {
      this.$emit('input', e);
      this.showInput = false;
      this._handleInputValue();
    },
    handleSelectBlur() {
      // 点击了icon图标但是没有聚焦select
      if (this.hasFocus && !this.visibleSelectChange) {
        this._handleInputShowing();
      }
      this.handleMouseLeave();
    },
    handleSelectFocus() {
      this.hasFocus = true;
    },

    /**
     *  点击了icon 并且聚焦了select 但是没有选择内容 失焦时自动隐藏
     */
    handelVisibleChange(e) {
      if (e) {
        this.visibleSelectChange = true;
      } else {
        this._handleInputShowing();
      }
    },
    async _handleInputShowing() {
      this.showInput = false;
      await this._handleInputValue();
      this.hasFocus = false;
      this.visibleSelectChange = false;
    },
    _handleInputValue() {
      this.$nextTick(() => {
        let value = this.input;
        if (this.type === 'select') {
          this.options.forEach((item) => {
            if (item.value === this.input) {
              value = item.label;
            }
          });
        }
        this.$refs.context.innerText = value;
      });
    },
  },
};
</script>

<style>
.form-label {
  display: flex;
  width: 200px;
  height: 40px;
  line-height: 40px;
}
.form-label .form-label-main {
  flex: 1;
  border-bottom: 1px solid #ccc;
  padding: 0 15px;
  position: relative;
}
.form-label .form-label-main:hover {
  padding: 0 15px;
  cursor: pointer;
}
.form-label .form-label-main .el-input__inner {
  border: none;
  border-bottom: 1px solid #cccccc;
  border-radius: 0;
}
.form-label .el-icon-edit {
  position: absolute;
  right: 10px;
  top: 12px;
}
.form-label .form-label-main:hover .el-icon-edit {
  color: #409eff;
}
.form-label .form-label-context {
  font-size: 14px;
}
.form-label .form-label-item {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  background-image: none;
  box-sizing: border-box;
  color: #606266;
  height: 40px;
  line-height: 40px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>

```

### 使用

```html
    <el-form :label-position="labelPosition" inline label-width="80px" :model="formLabel" style="margin-top:10px">
      <el-form-item label="名称:">
        <form-label v-model="formLabel.name" />
      </el-form-item>
      <el-form-item label="活动区域:">
        <form-label v-model="formLabel.region" />
      </el-form-item>
      <el-form-item label="活动形式:">
        <form-label v-model="formLabel.type" :options="options" type="select" />
      </el-form-item>
    </el-form>
```

![image-20200906085202983](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200906085202983.png)





# 版本三 通过dynamic component 解耦

### 代码

####  form.vue

```vue.js
<!--
 * @Author: shmao
 * @Date: 2020-09-06 11:07:54
 * @LastEditors: shmao
 * @LastEditTime: 2020-09-06 16:00:49
-->
<template>
  <div class="form-label">
    <div
      v-if="!showInput"
      class="form-label-main"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <span ref="context" class="form-label-context" />
      <i
        v-show="showIcon"
        class="el-icon-edit"
        @click.stop="handleInputShowing"
      />
    </div>
    <component
      v-else
      ref="input"
      :value.sync="input"
      :is="componentName"
      :options="options"
      v-on="$listeners"
      v-bind="$attrs"
      @onInput="onInput"
      @handleBlur="handleBlur"
      @handleSelectFocus="handleSelectFocus"
      @handleChange="handleChange"
      @handelVisibleChange="handelVisibleChange"
      @handleSelectBlur="handleSelectBlur"
    />
  </div>
</template>

<script>
import FormInput from './form-input';
import FormSelect from './form-select';
export default {
  name: 'formDemo',
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    input: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showIcon: false,
      showInput: false,
      hasFocus: false,
      visibleSelectChange: false,
    };
  },
  computed: {
    componentName() {
      switch (this.type) {
        case 'select':
          return 'FormSelect';
        default:
          return 'FormInput';
      }
    },
  },
  components: { FormSelect, FormInput },
  mounted() {
    this._handleInputValue();
  },
  methods: {
    handleMouseEnter() {
      this.showIcon = true;
    },
    handleMouseLeave() {
      this.showIcon = false;
    },
    handleInputShowing() {
      this.showInput = true;
      // 自动聚焦
      this.$nextTick(() => {
        this.$refs.input.$children[0].focus();
      });
    },
    handleBlur() {
      this.showInput = false;
      this.$nextTick(() => {
        this.$refs.context.innerText = this.input;
      });
      this.handleMouseLeave();
    },

    /**
     *  配合v-model实现双向数据绑定
     * @param e 输入框的值
     */
    onInput(e) {
      this.$emit('input', e);
    },

    /**
     *  配合v-model实现双向数据绑定
     * @param e 选择框的值
     */
    handleChange(e) {
      this.$emit('input', e);
      this.showInput = false;
      this._handleInputValue();
    },
    handleSelectBlur() {
      // 点击了icon图标但是没有聚焦select
      if (this.hasFocus && !this.visibleSelectChange) {
        this._handleInputShowing();
      }
      this.handleMouseLeave();
    },
    handleSelectFocus() {
      this.hasFocus = true;
    },

    /**
     *  点击了icon 并且聚焦了select 但是没有选择内容 失焦时自动隐藏
     */
    handelVisibleChange(e) {
      if (e) {
        this.visibleSelectChange = true;
      } else {
        this._handleInputShowing();
      }
    },
    async _handleInputShowing() {
      this.showInput = false;
      await this._handleInputValue();
      this.hasFocus = false;
      this.visibleSelectChange = false;
    },
    _handleInputValue() {
      this.$nextTick(() => {
        let value = this.input;
        if (this.type === 'select') {
          this.options.forEach((item) => {
            if (item.value === this.input) {
              value = item.label;
            }
          });
        }
        this.$refs.context.innerText = value;
      });
    },
  },
};
</script>

<style>
.form-label {
  display: flex;
  width: 200px;
  height: 40px;
  line-height: 40px;
}
.form-label .form-label-main {
  flex: 1;
  border-bottom: 1px solid #ccc;
  padding: 0 15px;
  position: relative;
}
.form-label .form-label-main:hover {
  padding: 0 15px;
  cursor: pointer;
}
.form-label .form-label-main .el-input__inner {
  border: none;
  border-bottom: 1px solid #cccccc;
  border-radius: 0;
}
.form-label .el-icon-edit {
  position: absolute;
  right: 10px;
  top: 12px;
}
.form-label .form-label-main:hover .el-icon-edit {
  color: #409eff;
}
.form-label .form-label-context {
  font-size: 14px;
}
.form-label .form-label-item {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  background-image: none;
  box-sizing: border-box;
  color: #606266;
  height: 40px;
  line-height: 40px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>

```

#### form-input.vue

```vue.js
<!--
 * @Author: shmao
 * @Date: 2020-09-06 11:08:04
 * @LastEditors: shmao
 * @LastEditTime: 2020-09-06 15:59:12
-->
<template>
  <el-input
    v-model="$attrs.value"
    class="form-label-item"
    @blur="$emit('handleBlur')"
    @input="onInput"
  />
</template>

<script>
export default {
  name: 'FormInput',
  methods: {
    onInput(e) {
      this.$emit('input', e);
    },
    handleBlur() {
      this.$emit('handleBlur');
    },
  },
};
</script>

```



#### form-select.vue

````vue
<!--
 * @Author: shmao
 * @Date: 2020-09-06 11:08:10
 * @LastEditors: shmao
 * @LastEditTime: 2020-09-06 16:00:59
-->
<template>
  <el-select
    placeholder="请选择"
    v-model="$attrs.value"
    @focus="$emit('handleSelectFocus')"
    @blur="$emit('handleSelectBlur')"
    @change="handleChange"
    @visible-change="handelVisibleChange"
    style="width: 100%"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handelVisibleChange(e) {
      this.$emit('handelVisibleChange', e);
    },
    handleChange(e) {
      this.$emit('handleChange', e);
    },
  },
};
</script>

````

### 使用

```html
 <el-form
      :label-position="labelPosition"
      inline
      label-width="80px"
      :model="formText"
      style="margin-top:10px"
    >
      <el-form-item label="名称:">
        <form-demo v-model="formText.name" />
      </el-form-item>
      <el-form-item label="活动区域:">
        <form-demo v-model="formText.region" />
      </el-form-item>
      <el-form-item label="活动形式:">
        <form-demo v-model="formText.type" :options="options" type="select" />
      </el-form-item>
    </el-form>
```

