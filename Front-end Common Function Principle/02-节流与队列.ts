/* limits your function to be called at most every W milliseconds, where W is wait.
* Calls to your func that happen more often than W get queued up to be called later.
* @param fn
* @param wait
*/
export function throttleAndQueue(fn: Function, wait: number) {
 let isCalled = false;
 let callQueue: Function[] = [];

 let caller = function() {
   if (callQueue && callQueue.length && !isCalled) {
     isCalled = true;
     const callable = callQueue.shift();

     if (callable) {
       callable();
     }

     setTimeout(function() {
       isCalled = false;
       caller();
     }, wait);
   }
 };

 return function(this: any, ...args: any[]) {
   callQueue.push(fn.bind(this, ...args));

   caller();
 };
}
