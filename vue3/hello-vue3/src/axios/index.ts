import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "/",
  timeout: 10000, // 设置超时时间
});

// 设置拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers.common["A"] = "1312312";
    return config;
  },
  (e) => Promise.reject(e)
);

instance.interceptors.response.use(
  (r) => {
    // ...
    return r.data;
  },
  (e) => Promise.reject(e)
);
interface httpType {
  (url: string, data?: any, method?: string, config?: AxiosRequestConfig): AxiosPromise<any> | undefined;
}
const http: httpType = (
  url,
  data,
  method = "GET",
  config = { headers: { "Content-Type": "application/xxx-form-urlencoded" } }
) => {
  const { headers } = config;
  switch (method.toUpperCase()) {
    case "GET":
      return instance.get(url, { params: data });
    case "POST":
      if (headers["Content-Type"] === "application/json") {
        return instance.post(url, data, config);
      }
      // 文件提交
      if (headers["Content-Type"] === "mulitipart/form-data") {
        const p = new FormData();
        for (const key in data) {
          p.append(key, data[key]);
        }
        return instance.post(url, p, config);
      }
      // 默认 表单提交 qs
      const param = new URLSearchParams();
      for (const key in data) {
        param.append(key, data[key]);
      }
      return instance.post(url, param, config);
    case "PUT":
      return instance.put(url, data, config);
    case "PATCH":
      return instance.patch(url, data, config);
    case "DELETE":
      return instance.delete(url, config);
    default:
      instance({
        url,
        data,
        ...config,
      });
      break;
  }
};

export default http;
