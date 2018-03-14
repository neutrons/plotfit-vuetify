import * as d3 from 'd3';

export const resetScales = (state) => {
  // eslint-disable-next-line
  state.plotScale = {
    x: {
      label: 'x',
      value: d3.scaleLinear(),
    },
    y: {
      label: 'y',
      value: d3.scaleLinear(),
    },
  };
};

export const setXScale = (state, x) => {
  // eslint-disable-next-line
  state.plotScale.x = {
    label: x,
    value: state.scale.x[x].copy(),
  };
};

export const setYScale = (state, y) => {
  // eslint-disable-next-line
  state.plotScale.y = {
    label: y,
    value: state.scale.y[y].copy(),
  };
};
