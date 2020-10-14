# 如何通过npm一次执行所有命令

### 下载依赖

- 根目录下 首先进行安装

```js
npm install concurrently --save
```

- package.json

```json
"scripts": {
    "install:all": "cd ima_spa_outpatient && npm install && cd ../ima_spa_technology && npm install && cd ../ima_spa_ims && npm install",
    "install:utils": "cd ima_spa_outpatient && npm install @ima/utils -D && cd ../ima_spa_technology && npm install @ima/utils -D && cd ../ima_spa_ims && npm install @ima/utils -D",
    "install:styles": "cd ima_spa_outpatient && npm install @ima/styles -D && cd ../ima_spa_technology && npm install @ima/styles -D && cd ../ima_spa_ims && npm install @ima/styles -D",
    "start": "concurrently \"npm run start:base\" \"npm run start:common\" \"npm run start:outpatient\" \"npm run start:technology\" \"npm run start:stock-manage\"",
    "start:outpatient": "cd ima_spa_outpatient && npm run serve",
    "start:technology": "cd ima_spa_technology && npm run serve",
    "start:ims": "cd ima_spa_ims && npm run serve",
    "start:base": "cd ima_spa_base && npm run serve",
    "start:common": "cd ima_spa_common && npm run serve"
},

```

- 启动项目命令

```js
npm run start
```

