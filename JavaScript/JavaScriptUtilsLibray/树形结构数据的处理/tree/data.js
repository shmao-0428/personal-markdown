const _comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 },
  { id: 6, parent_id: null },
  { id: 7, parent_id: 6 },
  { id: 8, parent_id: 6 },
  { id: 9, parent_id: 7 },
  { id: 10, parent_id: 8 },
  { id: 11, parent_id: 9 },
];
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 },
];
module.exports = {
  comments,
  _comments,
};
