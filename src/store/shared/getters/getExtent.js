import * as d3 from 'd3';
import _ from 'lodash';

export default (state, getters) => (field) => {
  if (!getters.getChartConfigurations.data.length) return 'N/A';

  let tempData = _.cloneDeep(getters.getChartConfigurations.data);

  const yType = state.plotScale.y.label;
  const xType = state.plotScale.x.label;
  tempData = tempData.map(el => el.values)
    .reduce((a, b) => a.concat(b))
    .filter((d) => {
      if (yType === 'log(y)' && xType === 'log(x)') {
        return d.y > 0 && d.x > 0;
      } else if (xType === 'log(x)') {
        return d.x > 0;
      } else if (yType === 'log(y)') {
        return d.y > 0;
      }

      return d;
    });

  const extent = d3.extent(tempData, d => d[field]);

  // If extents are the same, +-1 in order to not plot a flat chart
  if (extent[0] === extent[1]) {
    extent[0] -= 1;
    extent[1] += 1;
  }

  return extent;
};
