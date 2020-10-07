## 1. 传统CSS实现

最简单的当然是为每一个`<li></li>`都加一个用于区分不同`background-color`的类， 每个类里应用上不同的背景颜色就OK啦，这我们没必要多说了。

## 2. 使用SASS多值变量： list

list类型有点像js中的数组。list数据可通过空格，逗号或小括号分隔多个值，可用`nth($var,$index)`取值。关于list数据操作还有很多其他函数如`length($list)`，`join($list1,$list2,[$separator])`，`append($list,$value,[$separator])`等，具体可参考[sass Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)（List Functions）。

本需求实现代码如下：

```scss
// 将背景颜色值定义成变量
$red : #FF0000;
$orange : #FFA500;
$yellow : #FFFF00;
$green : #008000;
$bluegreen : #00FFFF;
$blue : #0000FF;
$purple : #800080;

// 定义一个list储存背景颜色
$bgcolorlist: $red $orange $yellow $green $bluegreen $blue $purple;

// 使用SASS for循环语句为每一个li设置background-color
@for $i from 1 to length($bgcolorlist)+1 {
    #main-container ul li:nth-child(#{$i}) {
        background-color: nth($bgcolorlist,$i);
    }
}123456789101112131415161718
```

这里需要注意的几点是：

- from后的数值，即循环开始的i值不能为0，这是语法规定的。
- for循环从`i = 1`开始，但并不是在`i = length($bgcolorlist)`时结束，我们本来是需要循环7次，但如果我们写成`to length($bgcolorlist)`的话，只会循环6次，因此是`to length($bgcolorlist)+1`。

## 3. 使用SASS多值变量： map

当然，解决这个需求，我们也可以使用SASS中的map。map类型有点像js中的对象。map数据以key和value成对出现，其中value又可以是list。格式为：`$map: (key1: value1, key2: value2, key3: value3);`。可通过`map-get($map,$key)`取值。关于map数据还有很多其他函数如`map-merge($map1,$map2)`，`map-keys($map)`，`map-values($map)`等，具体可参考[sass Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)（Map Functions）。

本需求实现代码如下：

```scss
// 将背景颜色值定义成变量
$red : #FF0000;
$orange : #FFA500;
$yellow : #FFFF00;
$green : #008000;
$bluegreen : #00FFFF;
$blue : #0000FF;
$purple : #800080;

//将背景颜色以键值对的形式存在map中
$bgcolorlist : (
    1: $red,
    2: $orange,
    3: $yellow,
    4: $green,
    5: $bluegreen,
    6: $blue,
    7: $purple);

// 使用SASS each语法为每一个li设置background-color
@each $i, $color in $bgcolorlist {
    #main-container ul li:nth-child(#{$i}) {
        background-color: $color;
    }
}
```