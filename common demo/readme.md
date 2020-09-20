# 1. 防抖

```JavaScript

function debounce(func, timeout = 1000) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    }
}

const task = () => {
    console.log('run task');
}
const debounceTask = debounce(task, 1000);

window.addEventListener('click', debounceTask)
```

**立即执行**

```JavaScript
function debounceImme(func, timeout = 1000,) {
    let timer;
    return function (...args) {
        let context = this;
        if (timer) clearTimeout(timer);

        let callNow = !timer;

        timer = setTimeout(() => {
            timer = null;
        }, timeout);

        if (callNow) return func.apply(context, args);
    }
}

const task = () => {
    console.log('run task');
}
const debounceTask = debounceImme(task, 1000);

window.addEventListener('click', debounceTask)

```

**合并版本**

```JavaScript

function debounce(func, timeout = 1000, immediate) {
    let timer;
    return function (...args) {
        let context = this;
        if (timer) clearTimeout(timer);

        if(immediate) {

            let callNow = !timer;

            timer = setTimeout(() => {
                timer = null;
            }, timeout);

            if (callNow) return func.apply(context, args);
        } else {
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        }
    }
}

const task = () => {
    console.log('run task');
}
const debounceTask = debounceImme(task, 1000);

window.addEventListener('click', debounceTask)

```

# 2. 节流

**定时器版本**

```JavaScript
function throttle(func, timeout = 1000) {
    let timer;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func.apply(this, args);
            }, timeout);
        }
    }
}

const task = () => {
    console.log('run task');
}
const throttleTask = throttle(task, 1000);

window.addEventListener('mousemove', throttleTask)
```

**时间戳版本**

```JavaScript
function throttle(func, timeout = 1000) {
    let previous = 0;
    return function (...args) {
        let start = +new Date();
        let context = this;
        if (start - previous > timeout) {
            func.apply(context, args);
            previous = start;
        }
    }

}

const task = () => {
    console.log('run task');
}
const throttleTask = throttle(task, 1000);

window.addEventListener('mousemove', throttleTask)
```
