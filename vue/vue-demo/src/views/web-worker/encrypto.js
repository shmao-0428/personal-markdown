import sm from 'sm-crypto';
const sm4 = sm.sm4;
const key = '0123456789abcdeffedcba9876543210'; // 可以为 16 进制串或字节数组，要求为 128 比特

export const encrypt = (value) => {
  return sm4.encrypt(value, key);
};
export const decrypt = (value) => {
  return sm4.decrypt(value, key);
};
