"use strict";
exports.__esModule = true;
// 定义食物类Food
var Food = /** @class */ (function () {
    function Food() {
        // 获取页面中的food元素并将其赋值给element
        // 末尾加上叹号，表示id为food的元素必定存在（非空）
        this.element = document.getElementById('food');
    }
    Object.defineProperty(Food.prototype, "X", {
        // 定义一个获取食物X轴坐标的方法
        get: function () {
            return this.element.offsetLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Food.prototype, "Y", {
        // 定义一个获取食物Y轴坐标的方法
        get: function () {
            return this.element.offsetTop;
        },
        enumerable: false,
        configurable: true
    });
    // 修改食物的位置
    Food.prototype.change = function () {
        // 生成一个随机的位置
        // 食物的位置最小是0 最大是290
        // 蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须是整10
        var top = Math.round(Math.random() * 29) * 10;
        var left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = left + 'px';
        this.element.style.top = top + 'px';
    };
    return Food;
}());
exports["default"] = Food;
