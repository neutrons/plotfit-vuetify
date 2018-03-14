import * as d3 from 'd3';
import _ from 'lodash';

import getPreparedData from '../../shared/getters/getPreparedData';
import getExtent from '../../shared/getters/getExtent';
import getPlotData from '../../shared/getters/getPlotData';
import isFilesPlotted from '../../shared/getters/isFilesPlotted';

export default {
  getPreparedData,
  isFilesPlotted,
  getExtent,
  getPlotData,
  getChartConfigurations(state, getters) {
    const tempStitched = d3.nest()
      .key(d => d.name)
      .entries(state.stitchedData);
    const data = _.cloneDeep(getters.getPreparedData.concat(tempStitched));
    const scales = state.plotScale;

    return {
      data,
      scales,
    };
  },
};
