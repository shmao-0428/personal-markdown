((window) => {
  const PromiseState = "[[PromiseState]]";
  const PromiseResult = "[[PromiseResult]]";
  const Promise = (() => {
    class Promise {
      constructor(execute) {
        this[PromiseState] = "pending";
        this[PromiseResult] = undefined;
        this._queue = [];
        const resolve = (value) => {
          if (this[PromiseState] !== "pending") return;
          this[PromiseState] = "fulfilled";
          this[PromiseResult] = value;
          setTimeout(() => {
            this._queue.forEach((e) => e.onResolved(value));
          });
        };
        const reject = (err) => {
          if (this[PromiseState] !== "pending") return;
          this[PromiseState] = "rejected";
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
        if (typeof onResolved !== "function") {
          onResolved = (value) => value;
        }
        if (typeof onRejected !== "function") {
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
          if (this[PromiseState] === "fulfilled") {
            setTimeout(() => {
              callback(onResolved);
            });
          }
          if (this[PromiseState] === "rejected") {
            setTimeout(() => {
              callback(onRejected);
            });
          }
          if (this[PromiseState] === "pending") {
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
        return new Promise((resolve,reject)=>{
          for (let i = 0; i < events.length; i++) {
            events[i].then(v=>resolve(v),r=>reject(r))
          }
        })
      }
    }
    return Promise;
  })();

  window.Promise = Promise;
})(window);
