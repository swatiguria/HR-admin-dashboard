export function eliminateNullObjects(array) {
  let result = [];
  array.forEach((item) => {
    if (!Object.values(item).every((x) => x === null || x.length === 0)) {
      result.push(item);
    }
  });

  return result;
}
