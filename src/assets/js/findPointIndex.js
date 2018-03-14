export default (point, data) => {
  const name = point.name;
  const x = point.x;
  const y = point.y;

  let testData = [];
  for (let i = 0, length = data.length; i < length; i += 1) {
    if (data[i].key === name) {
      testData = data[i].values;

      for (let j = 0, L = testData.length; j < L; j += 1) {
        if (testData[j].x === x && testData[j].y === y) return j;
      }
    }
  }

  return null;
};
