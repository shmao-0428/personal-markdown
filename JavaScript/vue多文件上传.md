# vue中配合el-upload 多文件上传

```html
 <el-upload
              class="upload-demo"
              action="/gateway/ima-outpatient/v1/pt/savePriceAdjustment"
              accept=".xlsx"
              ref="upload"
              :data="fileList"
              :headers="headers"
              :on-change="onChange"
              :file-list="fileList"
              :auto-upload="false"
              :on-remove="onRemove"
            >
              <el-button> 点击上传 </el-button>
              <span
                slot="tip"
                class="ima-mr-default"> 最大支持10M </span>
            </el-upload>
```



```js
headers() {
      return {
        'X-AppCode': 'ima_outpatient',
        Authorization: 'UAP ' + localStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data',
      };
    },
```



```js
onChange(file, fileList) {
      const totalSize = fileList.reduce((pre, cur)=>{
        // eslint-disable-next-line no-param-reassign
        return pre += cur.size;
      }, 0)

      if(MAX_SIZE < totalSize) {
        this.fileList = fileList.filter(item=>item.uid !== file.uid);
        return this.$message.warning('最大支持10M!');
      }

      this.fileList = fileList;

    },

    onSuccess(response) {
      const { succFlag, url } = response;

      if(!succFlag && url) {
        this.$confirm('上传失败, 是否下载错误文件?', '提示', {
          closeOnClickModal: false,
          closeOnPressEscape: false,
          confirmButtonText: '下载',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          location.href = url;
        })
      }
    },
```



```js
 // 调用保存接口
    async addAjustmentFn() {

      const form = new FormData();

      this.fileList.map(item=>item.raw).forEach(file => {
        form.append('file', file);
      });

      let params = {
        adjustType: this.addProjectForm.adjustType || '',
        adjustNumber: this.addProjectForm.adjustNumber || '',
        adjustWay: this.addProjectForm.adjustWay || '',
        adjustLevel: this.addProjectForm.adjustLevel || '',
        adjustDatetime: this.addProjectForm.adjustDatetime || '',
        adjustRemark: this.addProjectForm.adjustRemark || '',
      };

      for (const key in params) {
        form.append(key, params[key]);
      }

      const { status, data } = await addAjustment(form);
      // console.log(status, data);
      if (status !== 200) return;
      return data || {};
    },
```

