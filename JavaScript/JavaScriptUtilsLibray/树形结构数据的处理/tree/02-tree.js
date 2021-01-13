const { comments, _comments } = require('./data.js');

const _nest = (items, id = null, link = 'parent_id') => {
  let filters = items.filter((item) => item[link] === id);
  // console.log('filter>>>', filters, 'id>>>', id);
  let res = filters.map((item) => ({ ...item, children: _nest(items, item.id) }));
  // console.log('res>>>', res);
  return res;
};

console.time();
const nestedComments = _nest(_comments); // [{ id: 1, parent_id: null, children: [...] }]
console.timeEnd();
console.log(JSON.stringify(nestedComments));
