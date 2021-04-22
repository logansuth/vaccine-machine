export function convertObjToArr(obj) {
  const arr = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(obj[key]);
    }
  }

  return arr;
}
