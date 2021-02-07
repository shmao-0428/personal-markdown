/*
 * @Author: shmao
 * @Date: 2021-02-07 14:12:00
 * @LastEditors: shmao
 * @LastEditTime: 2021-02-07 14:35:59
 */
import mixins from './mixins';
let Vue;
export default function install(_Vue) {
    Vue = _Vue;
    Vue.mixin(mixins);
}