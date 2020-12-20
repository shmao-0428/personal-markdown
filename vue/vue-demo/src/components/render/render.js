export default {
  props: {
    isRed: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      //   isRed: true,
      arr: [1, 2, 3, 4],
      input: '',
    };
  },
  render(h) {
    const value = `isRed 为 ${this.isRed}`;
    if (!this.isRed)
      return h(
        'div',
        {
          style: { color: 'red', cursor: 'pointer' },
          attrs: { id: 'div' },
          class: ['is-false-red'],
          on: {
            // click.once
            '~click'() {
              alert(value);
            },
          },
        },
        value
      );
    return h(
      'div',
      {
        class: { 'is-red': this.isRed },
      },
      [
        h('p', value),
        h(
          'ul',
          this.arr.map((child) => {
            return h('li', `item is ${child}`);
          })
        ),
      ]
    );
  },
};
