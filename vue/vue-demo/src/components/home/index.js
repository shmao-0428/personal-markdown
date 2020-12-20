import router from '@/router';
// console.log(router);
export default {
  render(h) {
    const routes = router.options.routes;
    return h('div', [
      h('h1', [h('i', 'welcome to pages...')]),
      h(
        'ol',
        routes.map((item) => {
          return h('li', [
            h('router-link', { attrs: { to: item.path } }, [h('i', `go to ${item.name ? item.name : '/'}`)]),
          ]);
        })
      ),
    ]);
  },
};
