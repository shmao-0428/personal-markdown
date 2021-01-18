# resize

普通元素也可以像textarea那样resize

```css
overflow:hidden;
resize:auto;
```

# 文本溢出 ellipsis

```css
text-overflow: ellipsis;
white-space: normal;
overflow:hidden;
```

# 虚化(滤镜) filter

```css
filter:blur(2)
```

# object-fit

图片在指定的尺寸后, 可以设置object-fit为contain或over保持比例

```css
object-fit:contain;
```

# 隐藏文本

```css
text-indent:-2000px;
font-size:0;
```

# flex布局下margin

在flex下的标签加上margin的时候 标签元素会自适应

# input的宽度

并不是给元素设置display:block就会自动填充父元素宽度. input就是个例外, 其默认宽度取决于`size`特性的值

