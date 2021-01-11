/** `bottomVisible`：检查页面底部是否可见 */
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);

bottomVisible(); // true

/** Random Hexadecimal Color Code`：随机十六进制颜色 */
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

randomHexColorCode(); // "#e34155"

/** `scrollToTop`：平滑滚动至顶部
 * 该代码段可用于平滑滚动到当前页面的顶部。
 */
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

scrollToTop();

/** `smoothScroll`：滚动到指定元素区域 该代码段可将指定元素平滑滚动到浏览器窗口的可见区域。 */
const smoothScroll = (element) =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth',
  });

smoothScroll('#fooBar');
smoothScroll('.fooBar');

/** `getScrollPosition`：返回当前的滚动位置
 * 默认参数为window ，pageXOffset(pageYOffset)为第一选择，没有则用scrollLeft(scrollTop)
 */

const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

getScrollPosition(); // {x: 0, y: 200}

/**  `detectDeviceType`：检测移动/PC设备 */
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
