import _ from 'lodash';

export default function (data, fields, reverse = false) {
  let tempData = _.cloneDeep(data);

  tempData = tempData.map((point) => {
    const nObj = Object.assign({}, point);

    if (reverse) {
      nObj[fields.x] = nObj.x;
      nObj[fields.y] = nObj.y;
      delete nObj.x;
      delete nObj.y;
    } else {
      nObj.x = nObj[fields.x];
      nObj.y = nObj[fields.y];
      delete nObj[fields.x];
      delete nObj[fields.y];
    }

    if (!reverse) {
      // Set up error points - SQRT(y)
      nObj.error = nObj.y < 0 ? 0 : Math.sqrt(nObj.y);
    }

    return nObj;
  });

  return tempData;
}
