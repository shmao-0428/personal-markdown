export default {
  data() {
    return {
      arr: [1, 2, 3]
    };
  },
  render(h) {
    return h(
      "ul",
      this.arr.map(child => {
        return h("li", `item is ${child}`);
      })
    );
  }
};
