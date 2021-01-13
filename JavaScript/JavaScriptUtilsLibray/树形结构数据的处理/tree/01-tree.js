/**
 * @param {array} items tree结构
 * @param {number} id children id
 * @param {string} link parent id
 */
const { comments, _comments } = require('./data.js');
const nest = (items, id = null, link = 'parent_id') =>
  items.filter((item) => item[link] === id).map((item) => ({ ...item, children: nest(items, item.id) }));

console.time();
const nestedComments = nest(_comments); // [{ id: 1, parent_id: null, children: [...] }]
console.timeEnd();
console.log(JSON.stringify(nestedComments));
