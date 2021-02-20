## vue element-ui el-date-picker限制选择时间为当天之前的代码

```html
<el-form-item
    label="出生日期"
    label-width="90px"
    prop="birthday">
    <el-date-picker
    v-model.trim="form.birthday"
    value-format="yyyy-MM-dd"
    :picker-options="pickerOptions"
    @change="onBirthdayChange"
    />
</el-form-item>
```

 其中 :`picker-options="pickerOptions" `便是限制选择时间的属性，在data中可以这样写

```js
pickerOptions: {
    // 出生日期只能当天及以前的时间
    disabledDate: (time) => {
    return time.getTime() > Date.now() - 8.64e6;
    },
},
```

