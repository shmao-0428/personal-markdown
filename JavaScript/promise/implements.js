const state = '[[PromiseState]]';
const result = '[[PromiseResult]]';

class Promise {
    
    constructor(execute) {
        this[state] = 'pending';
        this[result] = undefined;
        const resolve = (value) => {
            this[state] = 'fulfilled';
            this[result] = value;
        }
        const reject = () => { 

        }

        // 同步执行
        execute(resolve, reject)
    }
    
}