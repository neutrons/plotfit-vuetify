// eslint-disable-next-line
import * as d3 from 'd3';

import initChartElements from '../../../assets/js/chartFunctions/initChartElements';
import updateChartElements from '../../../assets/js/chartFunctions/updateChartElements';
import brush from '../../../assets/js/chartFunctions/stitchBrush';
import stitchLine from '../../../assets/js/chartFunctions/stitchLine';
import getContainerWidth from '../../../assets/js/chartFunctions/getContainerWidth';
import labels from '../../../assets/js/chartFunctions/labels';
import removeChart from '../../../assets/js/chartFunctions/removeChart';
import axes from '../../../assets/js/chartFunctions/axes';
import grids from '../../../assets/js/chartFunctions/grids';
import resetChart from '../../../assets/js/chartFunctions/resetChart';
import zoom from '../../../assets/js/chartFunctions/zoom';
import filterForLog from '../../../assets/js/chartFunctions/filterForLog';
import addClipPath from '../../../assets/js/chartFunctions/addClipPath';
import addZoomGroup from '../../../assets/js/chartFunctions/addZoomGroup';
import legend from '../../../assets/js/chartFunctions/legend';

export default {
  mixins: [
    initChartElements,
    updateChartElements,
    labels,
    removeChart,
    axes,
    grids,
    zoom,
    resetChart,
    getContainerWidth,
    filterForLog,
    brush,
    stitchLine,
    addClipPath,
    addZoomGroup,
    legend,
  ],
  methods: {
    drawChart() {
      if (this.filesSelected.length === 0) {
        this.initChartElements(`.stitch-chart-${this.ID}`);

        // add a stitch line group element
        this.g.append('g')
          .attr('class', 'stitched-line')
          .attr('clip-path', `url(#clip-${this.ID})`);

        // set up brush layer
        this.newBrush();
        this.drawBrushes();
        this.toggleEdit(this.isZoomBrush);
      }

      if (this.filesSelected.length !== 0) {
        // toggle zoom on
        this.g.select('.zoom')
          .attr('pointer-events', 'all');
      }

      this.updateChartElements();
      this.updateBrushScale();
      this.reconvertBrushSelections();
    },
  },
};
