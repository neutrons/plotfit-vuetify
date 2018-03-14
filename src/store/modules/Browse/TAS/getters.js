import * as d3 from 'd3';
import swapFields from '../../../../assets/js/swapFields';

export default {
  defaultFields(state) {
    if (typeof state.browseData.defaultFields === 'undefined') {
      return { x: 'x', y: 'y' };
    }
    return state.browseData.defaultFields;
  },
  label(state, getters) {
    return {
      x: getters.defaultFields.x,
      y: getters.defaultFields.y,
    };
  },
  getPreparedData(state, getters) {
    if (!Object.keys(state.browseData).length) return [];
    const temp = swapFields(state.browseData.data, getters.defaultFields);
    const nest = d3.nest()
      .key(d => d.name)
      .entries(temp);

    return nest;
  },
  plotMetadata(state) {
    if (!Object.keys(state.browseData).length) return [];

    return state.browseData.metadata;
  },
};
