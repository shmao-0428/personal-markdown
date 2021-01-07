((window) => {
  const state = '[[PromiseState]]';
  const result = '[[PromiseResult]]';
  const quque = [];
  class Promise {
    constructor(execute) {
      this[state] = 'pending';
      this[result] = undefined;
      const resolve = (value) => {
        this[state] = 'fulfilled';
        this[result] = value;
        setTimeout(() => {
          quque.forEach((e) => e.onResolved(value));
        });
      };
      const reject = (err) => {
        this[state] = 'rejected';
        this[result] = err;
        setTimeout(() => {
          quque.forEach((e) => e.onRejected(err));
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
        function callback(fn) {
          try {
            let result = fn(this[result]);
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
        }
        // 判断状态
        if (this[state] === 'fulfilled') {
          setTimeout(() => {
            callback(onResolved);
          });
        }
        if (this[state] === 'rejected') {
          setTimeout(() => {
            callback(onRejected);
          });
        }
        if (this[state] === 'pending') {
          quque.push({
            onResolved: () => callback(onResolved),
            onRejected: () => callback(onRejected),
          });
        }
      });
    }
  }

  window.Promise = Promise;
})(window);
