import * as d3 from 'd3';

export default {
  plotData(state) {
    if (!Object.keys(state.browseData).length) return [];
    const nest = d3.nest()
      .key(d => d.name)
      .entries(state.browseData.data);

    return nest;
  },
};
