// Import Mixins
import initChartElements from '../../assets/js/chartFunctions/initChartElements';
import updateChartElements from '../../assets/js/chartFunctions/updateChartElements';
import legend from '../../assets/js/chartFunctions/legend';

import getContainerWidth from '../../assets/js/chartFunctions/getContainerWidth';
import labels from '../../assets/js/chartFunctions/labels';
import axes from '../../assets/js/chartFunctions/axes';
import grids from '../../assets/js/chartFunctions/grids';
import resetChart from '../../assets/js/chartFunctions/resetChart';
import zoom from '../../assets/js/chartFunctions/zoom';
import filterForLog from '../../assets/js/chartFunctions/filterForLog';
import removeChart from '../../assets/js/chartFunctions/removeChart';
import addClipPath from '../../assets/js/chartFunctions/addClipPath';
import addZoomGroup from '../../assets/js/chartFunctions/addZoomGroup';

export default {
  mixins: [
    initChartElements,
    updateChartElements,
    legend,
    labels,
    axes,
    grids,
    zoom,
    resetChart,
    getContainerWidth,
    filterForLog,
    removeChart,
    addClipPath,
    addZoomGroup,
  ],
  methods: {
    drawChart() {
      if (this.plotData.length === 0) {
        this.initChartElements(`.quickplot-${this.ID}`);
      }

      if (this.plotData.length !== 0) {
        // toggle zoom on
        this.g.select('.zoom')
          .attr('pointer-events', 'all');
      }

      this.updateChartElements(0);
    },
  },
};
