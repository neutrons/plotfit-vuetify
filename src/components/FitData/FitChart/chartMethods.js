import * as d3 from 'd3';

// Import Mixins
import initChartElements from '../../../assets/js/chartFunctions/initChartElements';
import updateChartElements from '../../../assets/js/chartFunctions/updateChartElements';
import getContainerWidth from '../../../assets/js/chartFunctions/getContainerWidth';
import slider from './slider';
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
    slider,
    labels,
    removeChart,
    axes,
    grids,
    zoom,
    resetChart,
    getContainerWidth,
    filterForLog,
    addClipPath,
    addZoomGroup,
    legend,
  ],
  methods: {
    drawChart() {
      const vm = this;

      if (this.filesSelected.length === 0 || this.fileToFit !== this.previousFit) {
        this.setPreviousFit(this.fileToFit);
        this.initChartElements(`.fit-chart-${this.ID}`);

        if (this.fileToFit) {
          // add pick area & tooltip for selecting initial values
          const tooltip = this.svg.append('g')
            .attr('class', `tooltip tooltip-${this.ID}`)
            .append('text')
            .style('opacity', 0);

          const pointArea = this.svg.append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

          pointArea.append('rect')
            .attr('class', `pick-area pick-area-${this.ID}`)
            .attr('width', this.width)
            .attr('height', this.height)
            .style('fill', 'transparent')
            .style('stroke', 'blue')
            .style('cursor', 'crosshair')
            .style('visibility', 'hidden')
            .on('click', function click() {
              const pos = d3.mouse(this);
              const [newXScale, newYScale] = vm.rescaleToZoom();
              vm.pickerPoints = [
                newXScale.invert(pos[0]),
                newYScale.invert(pos[1]),
              ];

              vm.showPicker = true;
            })
            .on('mousemove', function hover() {
              const pos = d3.mouse(this);
              const [newXScale, newYScale] = vm.rescaleToZoom();

              tooltip.style('opacity', 1)
                .attr('transform', `translate(${pos[0] + 75}, ${pos[1] + 30})`)
                .text(`(${newXScale.invert(pos[0]).toFixed(2)}, ${newYScale.invert(pos[1]).toFixed(2)})`);
            })
            .on('mouseout', () => {
              tooltip.style('opacity', 0)
                .text('');
            });

          this.initSlider();
        }
      }

      if (this.filesSelected.length !== 0) {
        // toggle zoom on
        this.g.select('.zoom')
          .attr('pointer-events', 'all');
      }

      this.updateChartElements();

      if (this.fileToFit) this.updateSlider();
    },
  },
};
