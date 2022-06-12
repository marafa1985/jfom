interface TObject extends Object {
  [index: string]: any;
}

const arraysMatch = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

const compare = (item1: any, item2: any) => {
  const type1 = Object.prototype.toString.call(item1);
  const type2 = Object.prototype.toString.call(item2);

  if (type2 === '[object Undefined]') {
    return null;
  }

  if (type1 !== type2) {
    return item2;
  }

  if (type1 === '[object Object]') {
    const objDiff = diff(item1, item2);
    if (Object.keys(objDiff).length > 0) {
      return objDiff;
    }
    return;
  }

  if (type1 === '[object Array]') {
    if (!arraysMatch(item1, item2)) {
      return item2;
    }
    return;
  }

  if (type1 === '[object Function]') {
    if (item1.toString() !== item2.toString()) {
      return item2;
    }
  } else {
    if (item1 !== item2) {
      return item2;
    }
  }
};

export const diff = (originalObject: TObject, updatedObject: TObject) => {
  const diffs: TObject = {};
  let key;

  if (
    !updatedObject ||
    Object.prototype.toString.call(updatedObject) !== '[object Object]'
  ) {
    return originalObject;
  }

  for (key in originalObject) {
    if (Object.prototype.hasOwnProperty.call(originalObject, key)) {
      const value = compare(originalObject[key], updatedObject[key]);
      if (value) {
        diffs[key] = value;
      }
    }
  }

  for (key in updatedObject) {
    if (Object.prototype.hasOwnProperty.call(updatedObject, key)) {
      if (!originalObject[key] && originalObject[key] !== updatedObject[key]) {
        diffs[key] = updatedObject[key];
      }
    }
  }
  return diffs;
};
