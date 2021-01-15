
((window) => {
  /**
   *  Promise 实现异步的原理 `asap(as soon as possible)` => https://www.cnblogs.com/xiaonian8/p/13847393.html
   *
   *  asap 源码库中包含了支持Node和浏览器的两个版本，这里主要进行分析Node版。
   *  主要包含两个源码文件：asap.js，raw.js
   *  这两个文件分别导出了 asap 和 rawAsap 这两个方法，而 asap 可以看作是对 rawAsap 的进一步封装，
   *  通过缓存的 domain（可以捕捉处理 try catch 无法捕捉的异常，针对异步代码的异常处理）和 try/finally
   *  实现了即使某个任务抛出异常也可以恢复任务栈的继续执行，另外也做了一点缓存优化（具体见源码）。
   *
   *  rawAsap 方法是通过 setImmediate 或 process.nextTick 来实现异步执行的任务栈，
   *  而 asap 方法是对 rawAsap 方法的进一步封装，
   *  通过缓存的 domain 和 try/finally 实现了即使某个任务抛出异常也可以恢复任务栈的继续执行
   * （再次调用rawAsap.requestFlush）https://juejin.cn/post/6844903512845860872#heading-4
   *
   *  参考:
   *  https://www.bilibili.com/video/BV1GA411x7z1
   *  https://www.cnblogs.com/fsjohnhuang/p/4151595.html
   *  https://juejin.cn/post/6844903512845860872#heading-4
   *  ...
   */
  const PromiseState = '[[PromiseState]]';
  const PromiseResult = '[[PromiseResult]]';
  const Promise = (() => {
    class Promise {
      constructor(execute) {
        this[PromiseState] = 'pending';
        this[PromiseResult] = undefined;
        this._queue = [];
        const resolve = (value) => {
          if (this[PromiseState] !== 'pending') return;
          this[PromiseState] = 'fulfilled';
          this[PromiseResult] = value;
          setTimeout(() => {
            this._queue.forEach((e) => e.onResolved(value));
          });
        };
        const reject = (err) => {
          if (this[PromiseState] !== 'pending') return;
          this[PromiseState] = 'rejected';
          this[PromiseResult] = err;
          setTimeout(() => {
            this._queue.forEach((e) => e.onRejected(err));
          });
        };

        // 同步执行
        try {
          execute(resolve, reject);
        } catch (error) {
          reject(error);
        }
      }

      then(onResolved, onRejected) {
        if (typeof onResolved !== 'function') {
          onResolved = (value) => value;
        }
        if (typeof onRejected !== 'function') {
          onRejected = (err) => {
            throw err;
          };
        }

        return new Promise((resolve, reject) => {
          const callback = (fn) => {
            try {
              let result = fn(this[PromiseResult]);
              if (result instanceof Promise) {
                result.then(
                  (v) => resolve(v),
                  (r) => reject(r)
                );
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          };

          // 判断状态
          if (this[PromiseState] === 'fulfilled') {
            setTimeout(() => {
              callback(onResolved);
            });
          }
          if (this[PromiseState] === 'rejected') {
            setTimeout(() => {
              callback(onRejected);
            });
          }
          if (this[PromiseState] === 'pending') {
            this._queue.push({
              onResolved: () => callback(onResolved),
              onRejected: () => callback(onRejected),
            });
          }
        });
      }

      catch(onRejected) {
        return this.then(undefined, onRejected);
      }

      static resolve(value) {
        return new Promise((resolve, reject) => {
          if (value instanceof Promise) {
            value.then(
              (v) => resolve(v),
              (r) => reject(r)
            );
          } else {
            resolve(value);
          }
        });
      }

      static reject(value) {
        return new Promise((resolve, reject) => {
          reject(value);
        });
      }

      static all(events) {
        if (!Array.isArray(events)) events = [];
        if (events.length === 0) return Promise.resolve([]);
        return new Promise((resolve, reject) => {
          let counts = 0;
          let results = [];
          for (let i = 0; i < events.length; i++) {
            events[i].then(
              (v) => {
                counts++;
                results[i] = v;
                if (counts === events.length) {
                  resolve(results);
                }
              },
              (r) => reject(r)
            );
          }
        });
      }

      static race(events) {
        if (!Array.isArray(events)) events = [];
        if (events.length === 0) return Promise.resolve([]);
        return new Promise((resolve, reject) => {
          for (let i = 0; i < events.length; i++) {
            events[i].then(
              (v) => resolve(v),
              (r) => reject(r)
            );
          }
        });
      }

      finally(event) {
        return this.then(
          (value) => Promise.resolve(event()).then(() => value),
          (err) =>
            Promise.resolve(event()).then(() => {
              throw err;
            })
        );
      }

      static allSettled(events) {
        if(!Array.isArray(events)) events = [];
        if(events.length === 0) return Promise.resolve([]);
        return new Promise((resolve,reject)=>{
          let counts = 0;
          let results = [];
          for (let i = 0; i < events.length; i++) {
            events[i].then(
              (v)=>{
                counts++;
                results[i] = v;
                if(counts === events.length){
                  resolve(results)
                }
              },
              (r)=>{
                counts++;
                results[i] = r;
                if(count === events.length){
                  resolve(results)
                }
              }
            )
            
          }
        }) 
      }
    }
    return Promise;
  })();

  window.Promise = Promise;
})(window);
