## 服务端接收数据字段数据约定

```json
{
  "action": "getData", // action 代表某项行为
  "socketType": "trendData",
  "chartName": "trend",
  "value": "",
  "data": "" //从文件读取出来的json数据
}
```

### 可选值

- action: 代表某项行为
  - getData: 代表获取图表数据
  - fullScreen: 代表产生全屏事件
  - themeChange:代表产生了主题切换的事件
- socketType: 代表业务模块类型
  - trendData
  - sellerData
  - mapData
  - rankData
  - hotData
  - stockData
  - fullScreen
  - themeChange
- chartName: 图表的名称, 如果是主题切换,可以不传此值
  - trend
  - seller
  - map
  - rank
  - hot
  - stock
- value: 主要针对 fullScreen 和 themeChange 事件,代表具体的数据值
  - 如果是全屏事件, true 代表全屏, false 代表非全屏
  - 如果是主题切换事件, 可选值有 chalk 或者 vintage

## 服务端发送数据字段约定

- 接收到 action 为 getData 时

  - 取出数据中的 chartName 字段
  - 拼接 json 文件的路径
  - 读取该文件的内容
  - 在接收到的数据基础上,增加 data 字段

- 接收到 action 不为 getData 时
  - 原封不动的将从客户端接受过来的数据,转发给每一个处于连接状态的客户端
