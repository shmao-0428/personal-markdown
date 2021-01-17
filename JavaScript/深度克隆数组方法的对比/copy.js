/** 方法一 */
function copy(data) {
  let result = Array.isArray(data) ? [] : {};
  return fn(data, result);
  function fn(data, result) {
    Reflect.ownKeys(data).forEach((k) => {
      if (data.hasOwnProperty(k)) {
        let value = data[k];
        if (typeof value === 'object' && value && !(value instanceof Date)) {
          result[k] = Array.isArray(value) ? [] : {};
          return fn(value, result[k]);
        } else {
          result[k] = value;
        }
      }
    });
    return result;
  }
}

/** 方法二 */
function deepCopy(data) {
  let result = Array.isArray(data) ? [] : {};
  Reflect.ownKeys(data).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // console.log('key', key);
      let value = data[key];
      // console.log('value', value);
      if (typeof value === 'object' && value && !(value instanceof Date)) {
        result[key] = deepCopy(value);
      } else {
        result[key] = value;
      }
    }
  });
  return result;
}

function _deepCopy(data) {
  let result = Array.isArray(data) ? [] : {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // console.log('key', key);
      let value = data[key];
      // console.log('value', value);
      if (typeof value === 'object' && value && !(value instanceof Date)) {
        result[key] = deepCopy(value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

function cloneJson(data) {
  return JSON.parse(JSON.stringify(data));
}
