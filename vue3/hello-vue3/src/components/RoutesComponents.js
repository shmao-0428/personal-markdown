import router from "@/router";

const routes = router.routes;
// console.log(routes);
import { h } from "vue";
export default {
  render() {
    return h(
      "ol",
      routes.map((route) => h("li", [h("router-link", { attrs: { to: route.path } }, route.path)]))
    );
  },
};
