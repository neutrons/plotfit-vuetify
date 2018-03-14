import swapFields from '../../../assets/js/swapFields';

export const normalizeData = (state) => {
  // normalize data in order to combine data on the same scale
  // normalization function: Y' = y / (K * normalizeField)

  const temp = state.selectedData;
  let normField;
  // check that the normalize field is not one of the fields
  // if so, relabel accordingly or else reference value will
  // be undefined
  if (state.field.x === state.normalizeField) {
    normField = 'x';
  } else if (state.field.y === state.normalizeField) {
    normField = 'y';
  } else {
    normField = state.normalizeField;
  }

  temp.forEach((d) => {
    d.dataTransformed.forEach((point) => {
      const C = point[normField];
      const errorC = Math.sqrt(C);
      const oldY = point.y;
      const normY = point.y / (state.normalizeValue * C);
      const error = point.error;
      let normError;
      if (isFinite(normY) && normY !== null) {
        normError = Math.abs(normY) * Math.sqrt(Math.pow(error / oldY, 2) + Math.pow(errorC / C, 2)); // eslint-disable-line
        point.error = normError; // eslint-disable-line
      }
      point.y = normY; // eslint-disable-line
    });

    // eslint-disable-next-line
    d.dataTransformed = d.dataTransformed.filter(point => isFinite(point.y) && point.y !== null); // filter for divide by zero
  });

  state.isNormalized = true; // eslint-disable-line
  state.combinedData = []; // eslint-disable-line
};

export const resetNormalizeData = (state) => {
  const temp = state.selectedData;
  temp.forEach((d) => {
    d.dataTransformed = swapFields(d.data, state.field); // eslint-disable-line
  });

  /* eslint-disable */
  state.normalizeValue = 1;
  state.normalizeField = 'time';
  state.isNormalized = false;
  state.combinedData = [];
  state.tolerance = state.defaultSettings.tolerance.value;
  /* eslint-enable */
};

