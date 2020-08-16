1. rem是什么?

相对单位, 相对的是html的font-size值. 只要html的font-size发生改变,那么rem代表的长度都会发生改变

不考虑所谓的缩放: 750的设计图 => px => rem


自己设定一个html的font-size值   比如: html的font-size为75 => 关键是一旦设定好了这个值
那么所有的px都需要以这个font-size为基准 



100px => ?rem  如果我们设定好了html的font-size的大小为75  那么  100px   => 100/75rem


750的屏幕 (设计图) / 750的屏幕下我们自己设定的html的font-size值 = 
任意屏幕( 用户的手机大小 ) / 这个屏幕下对应的html的font-size值

750 / 75
640 / 64



结论: 
// 1. 后期拿到多大的设计图  那么你的html的font-size就是设计图的大小 / 10
// 2. 后期将得到的px转换成rem  拿px除以html的font-size


// 设计图: 750  
// 这个设计图的html的font-size值: 75   
// 将100px转成rem: 100px / 75rem

// 设计图: 640
// 这个设计图的html的font-size值: 64 
// 将100px转成rem: 100px / 64rem

// 设计图: 980
// 这个设计图的html的font-size值: 98
// 将100px转成rem: 100px / 98rem








