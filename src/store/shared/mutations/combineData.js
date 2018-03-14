import Vue from 'vue';
import _ from 'lodash';
import * as d3 from 'd3';

export const combineData = (state, value) => {
  if (!value.length) {
    state.combinedData = []; // eslint-disable-line
    return;
  }

  let temp = [];

  state.selectedData.forEach((item) => {
    let t;
    if (item.type === 'subtract') {
      t = _.cloneDeep(item).dataTransformed.map((d) => {
        // eslint-disable-next-line
        d.y *= -1;
        return d;
      });
    } else {
      t = _.cloneDeep(item.dataTransformed);
    }

    temp.push(t);
  });

  // flatten temp to 1D array
  temp = temp.reduce((a, b) => a.concat(b), []);

  const extent = d3.extent(temp, d => d.x);
  const binCount = Math.ceil((extent[1] - extent[0]) / state.tolerance);
  const thresholds = d3.range(extent[0], extent[1], (extent[1] - extent[0]) / binCount);

  const histogram = d3.histogram()
    .domain(extent)
    .thresholds(thresholds);

  const bins = histogram(temp);
  const end = bins.length - 1;
  const result = [];

  bins.forEach((bin, index) => {
    const min = bin.x0;
    const max = bin.x1;
    const newX = (max + min) / 2;
    let newY;
    let newError;
    let subset;

    if (index !== end) {
      subset = temp.filter(point => min <= point.x && point.x < max);
    } else {
      subset = temp.filter(point => min <= point.x && point.x <= max);
    }

    if (subset.length) {
      newY = subset.reduce((a, b) => a + b.y, 0);
      newError = subset.reduce((a, b) => a + b.error, 0);

      /* eslint-disable */
      const obj = { ...subset[0] };
      obj.x = newX;
      obj.y = newY;
      obj.error = newError;

      for (let key in obj) {
        if (['x', 'y', 'error'].indexOf(key) === -1) {
          obj[key] = null;
        }
      }
      obj.name = 'combine';
      /* eslint-enable */
      result.push(obj);
    }
  });

  state.combinedData = result.sort((a, b) => a.x - b.x); // eslint-disable-line
};

export const removeCombineData = (state) => {
  state.combinedData = []; // eslint-disable-line
  state.tolerance = state.defaultSettings.tolerance.value; // eslint-disable-line
};

export const addCombinedData = (state, payload) => {
  const loadtype = 'combine';
  const filename = payload.filename;
  const tags = [...payload.tags];
  const data = {
    filename,
    loadtype,
    tags,
  };

  Vue.set(state.storedCombined, filename, data);
};

