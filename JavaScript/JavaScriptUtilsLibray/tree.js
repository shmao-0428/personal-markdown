/**
 * https://www.jb51.net/article/163156.htm
 * https://blog.csdn.net/Mr_JavaScript/article/details/82817177
 */

/** `nest`：根据`parent_id`生成树结构
 * 根据每项的parent_id，生成具体树形结构的对象。
 */

/**
 * @param {array} items tree结构
 * @param {number} id children id
 * @param {string} link parent id
 */
const nest = (items, id = null, link = 'parent_id') =>
  items.filter((item) => item[link] === id).map((item) => ({ ...item, children: nest(items, item.id) }));

// const _nest = (items, id = null, link = 'parent_id') => {
//   let filters = items.filter((item) => item[link] === id);
//   console.log('filter>>>', filters, 'id>>>', id);
//   let res = filters.map((item) => ({ ...item, children: _nest(items, item.id) }));
//   console.log('res>>>', res);
//   return res;
// };

/** 用法 */
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 },
];
console.time();
const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]
// console.log(nestedComments);
console.log(JSON.stringify(nestedComments));
console.timeEnd();

/**
 * 推荐: time usage for function nest >>> treeData
 * treeData
 * @param {array} source 树形结构数组
 * @param {string} id id
 * @param {string} parentId parentId
 * @param {string} children children
 */
function treeData(source, id = 'id', parentId = 'parent_id', children = 'children') {
  let cloneData = JSON.parse(JSON.stringify(source));
  return cloneData.filter((father) => {
    let branchArr = cloneData.filter((child) => father[id] == child[parentId]); // 返回每一项的子级数组
    branchArr.length > 0 ? (father[children] = branchArr) : (father[children] = []); // 这里等于[] 或者 '' 看个人需求
    return father[parentId] === null; // 返回第一层 如果第一层不是parentId=null，请自行修改
  });
}
console.time();
const tree = treeData(comments);
console.log(JSON.stringify(tree));
console.timeEnd();

/** 树形结构扁平化 https://blog.csdn.net/Mr_JavaScript/article/details/102833991 */
let res = [];
const treeToFlat = (source) => {
  source.forEach((el) => {
    res.push(el);
    el.children && el.children.length > 0 ? fn(el.children) : '';
  });
};
