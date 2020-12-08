const list = [
  {
    id: 1,
    name: '超级管理',
    parent_id: 0,
  },
  {
    id: 2,
    name: '用户管理',
    parent_id: 1,
  },
  {
    id: 3,
    name: '部门管理',
    parent_id: 1,
  },
  {
    id: 4,
    name: '日志管理',
    parent_id: 1,
  },
  {
    id: 5,
    name: '操作用户',
    parent_id: 2,
  },
  {
    id: 6,
    name: '查看用户',
    parent_id: 2,
  },
  {
    id: 7,
    name: '用户新增',
    parent_id: 5,
  },

  {
    id: 8,
    name: '用户删除',
    parent_id: 5,
  },
];

const obj = {};
for (const item of list) {
  if (obj[item.parent_id]) {
    obj[item.parent_id].push(item);
  } else {
    obj[item.parent_id] = [item];
  }
}

console.log(obj);
