let res = [1, 2, 3, 4].map(i => i + 1);
console.log(res);

Promise.allSettled([Promise.resolve(1)]).then(r => {
    console.log(r);
})

class Father {
    age = 50;
}

new Father()

let weekMap = new WeekMap()

console.log(weekMap);

Array.from([1, 3, 4]);

console.log(Object.assign({}, { a: 1 }));