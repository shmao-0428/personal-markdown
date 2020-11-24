/*
 * @Author: shmao
 * @Date: 2020-11-24 15:33:48
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-24 15:49:20
 */
import { h } from "h.js";

h(
  "div",
  { style: { color: red }, id: "div" },
  "这是div",
  h("span", {}, "这是审判"),
  "这是空白"
);
