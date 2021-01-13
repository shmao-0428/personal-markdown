const { comments, _comments } = require('./data.js');

/**
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
// console.time('tree');
const tree = treeData(_comments);
// console.timeEnd('tree');

console.time('json');
console.log(JSON.stringify(tree));
console.timeEnd('json');
