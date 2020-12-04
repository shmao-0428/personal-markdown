/**
 *  简单的promise实现
 */
class Promise {
  static pending = "PENDING";
  static rejected = "REJECTED";
  static fulfilled = "FULFILLED";

  state = "PENDING";

  resolveFnList = [];
  rejectFnList = [];

  value = null;
  reason = null;

  constructor(execute) {
    const resolve = (value) => {
      this.state = Promise.fulfilled;
      this.value = value;

      this.resolveFnList.forEach((fn) => fn(value));
    };
    const reject = (reason) => {
      this.state = Promise.rejected;
      this.reason = reason;

      this.rejectFnList.forEach((fn) => fn(reason));
    };

    execute(resolve, reject);
  }

  then(onResolve, onReject) {
    if (this.state === Promise.fulfilled) {
      onResolve && onResolve(this.value);
    } else if (this.state === Promise.rejected) {
      onReject && onReject(this.reason);
    } else {
      onResolve && this.resolveFnList.push(onResolve);
      onReject && this.rejectFnList.push(onReject);
    }
  }
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("666");
  }, 3000);

  setTimeout(() => {
    reject(new Error("rejected"));
  }, 1000);
});

p.then(
  (res) => {
    console.log(res);
  },
  (err) => console.log(err)
);
