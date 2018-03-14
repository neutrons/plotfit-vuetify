import Vue from 'vue';
import transformDataFunc from '../../../assets/js/transformData';

export const setTransformations = (state, payload) => {
  // eslint-disable-next-line
  state.transformations = {
    x: payload.x,
    y: payload.y,
  };
  Vue.set(state.label, 'x', `q = ${payload.x}`);
  Vue.set(state.label, 'y', `I(q) = ${payload.y}`);
};

export const setXTransformation = (state, x) => {
  /* eslint-disable */
  state.transformations.x = x;
  state.label.x = `q = ${x}`;
  /* eslint-enable */
};

export const setYTransformation = (state, y) => {
  /* eslint-disable */
  state.transformations.y = y;
  state.label.y = `I(q) = ${y}`;
  /* eslint-enable */
};

export const transformData = (state) => {
  state.selectedData.forEach((el) => {
    if (state.transformations.x !== 'x' || state.transformations.y !== 'y') {
      // eslint-disable-next-line
      el.dataTransformed = transformDataFunc(el.data, state.transformations);
    } else {
      // eslint-disable-next-line
      el.dataTransformed = _.cloneDeep(el.data);
    }
  });
};

export const resetTransformations = (state) => {
  /* eslint-disable */
  state.transformations = {
    x: state.fits[state.fitType].transformations.x,
    y: state.fits[state.fitType].transformations.y,
    error: state.fits[state.fitType].transformations.error,
  };

  state.label = {
    x: 'q = x',
    y: 'I(q) = y',
  };
  /* eslint-enable */
};

