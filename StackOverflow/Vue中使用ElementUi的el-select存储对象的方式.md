- 问题

  - 在使用elementUI+vue开发页面的时候,我们需要对el-select存储对象

- 方法一

  ```html
  <el-form-item
                label="生产厂家"
                prop="manuCompanyName">
      <el-select
                 v-model="drugBaseForm.manuCompanyName"
                 placeholder="生产厂家"
                 filterable
                 clearable
                 remote
                 value-key="itemCode"
                 :remote-method="remoteManuFilter"
                 @focus="onManuFocus"
                 @change="onManuChange"
                 >
          <el-option
                     v-for="item in manuOptions"
                     :key="item.itemCode"
                     :label="item.itemName"
                     :value="item"
                     />
      </el-select>
  </el-form-item>
  ```

  ```js
  onManuChange(data) {
        this.drugBaseForm.manuCompanyCode = data.itemCode;
        this.drugBaseForm.manuCompanyName = data.itemName;
  },
  ```

- 方法二

  - 将{name:1,code:1}转换为json字符串

