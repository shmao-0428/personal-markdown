# 滚动页面

 使用window.scrollBy指定页面基于当前位置的滚动偏移量;

 正数坐标会朝着页面的右下方滚动,负数会滚向页面的左下方.

 例子:
 向下滚动一屏
 ```JavaScript
  window.scrollBy(0, window.innerHeight);
 ```

 向上滚动一屏
 ```JavaScript
  window.scrollBy(0, -window.innerHeight);
 ```