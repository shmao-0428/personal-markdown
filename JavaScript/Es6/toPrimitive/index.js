const obj = {
  [Symbol.toPrimitive]: function (hint) {
    console.log('hint:', hint);
    switch (hint) {
      case "number":
        return 10;
      case "string":
        return "圣诞节";
      default:
        return "default";
    }
  },
};

console.log(obj + "");
console.log(+obj);
console.log(`${obj}`);
