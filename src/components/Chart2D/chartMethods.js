import * as d3 from 'd3';

import getContainerWidth from '../../assets/js/chartFunctions/getContainerWidth';
import addClipPath from '../../assets/js/chartFunctions/addClipPath';
import axes from '../../assets/js/chartFunctions/axes';
import labels from '../../assets/js/chartFunctions/labels';
import addZoomGroup from '../../assets/js/chartFunctions/addZoomGroup';
import zoom from './zoom';

export default {
  mixins: [
    getContainerWidth,
    axes,
    labels,
    zoom,
    addClipPath,
    addZoomGroup,
  ],
  methods: {
    drawChart() {
      if (this.filesSelected === null) {
        // Add tool tip and hide it until invoked
        this.svg = d3.select(`.chart-${this.ID}`)
          .attr('viewBox', this.viewBox)
          .attr('perserveAspectRatio', 'xMidYMid meet')
          .attr('width', '100%');

        this.addLabels();

        // Add clip path so hexagons do not exceed boundaries
        this.addClipPath();

        this.g = this.svg.append('g')
          .attr('class', 'chart-group')
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // Add Zoom Group
        this.addZoomGroup();

        this.g.append('g').attr('class', 'chart-area')
          .attr('clip-path', `url(#clip-${this.ID})`)
          .append('g')
          .attr('class', 'hexagon');

        // Add axes
        const axis = this.g.append('g').attr('class', 'axis');

        axis.append('g').attr('class', 'axis--y');

        axis.append('g')
          .attr('class', 'axis--x')
          .attr('transform', `translate(0, ${this.height})`);

        // Add legend
        const legend = this.svg.append('g')
          .attr('class', 'legend')
          .attr('transform', `translate(${this.width + this.margin.left + 5}, ${this.margin.top})`);

        legend.append('g')
            .attr('class', 'leg-bars');

        legend.append('g')
            .attr('transform', `translate(${this.legendWidth}, 0)`)
            .attr('class', 'axis legend-axis legend-axis-y');
      } else {
        // toggle zoom on
        this.g.select('.zoom').attr('pointer-events', 'all');
        this.g.call(this.zoom);
      }

      const trans = d3.transition().duration(750);
      const t = d3.zoomTransform(this.g.node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);
      this.updateAxes(newXScale, newYScale, trans);

      if (this.plotData.length) {
        // Create points, which are used to plot hexbins
        const points = [];

        this.plotData.forEach((el) => {
          points.push([
            this.xScale(el.qx),
            this.yScale(el.qy),
            el.intensity,
          ]);
        });

        const hexbins = this.hexbin(points);
        for (let i = 0; i < hexbins.length; i += 1) {
          const sum = hexbins[i].reduce((a, b) => a + b[2], 0);
          const avg = sum / hexbins[i].length;
          hexbins[i].avgIntensity = avg;
        }

        // Create a value range for the legend color scale
        const valRange = hexbins.length ? d3.extent(hexbins, d => d.avgIntensity) : [0, 0];
        // Create color scale generator for legend using Viridis color set
        const colorScale = d3.scaleSequential(d3.interpolateViridis)
          .domain(d3.extent(valRange));

        /* ********************************************************
            An interval is calculated to represent each 'slice' of the
            legend's color values. Each 'slice' will be stacked together
            to display the legend's vertical bar.

            Since height and range change depending on the data and
            size of chart, we dynamically find the interval
            e.g.) The extent of the average intensity = [-1, 1]
                The height = 400
                The interval = (1 - (-1)) / 400
        ************************************************************* */

        const interval = (valRange[1] - valRange[0]) / this.height;
        const legendData = d3.range(valRange[1], valRange[0], -interval);
        // Re-draw Legend
        const legendSelect = this.svg.select('.legend')
          .select('.leg-bars')
          .selectAll('.bars')
          .data(legendData);

        // EXIT LEGEND BARS
        legendSelect.exit().remove();

        // // ENTER LEGEND BARS
        legendSelect.enter()
          .append('rect')
          .attr('class', 'bars')
          .attr('x', 0)
          .attr('y', (d, i) => i)
          .attr('height', 1)
          .attr('width', this.legendWidth)
          .style('fill', d => colorScale(d));

        // Create legend scale generator
        const legendScale = d3.scaleLinear()
          .range([this.height, 0])
          .domain(colorScale.domain())
          .nice();

        this.svg.select('.legend')
          .select('.legend-axis-y')
          .transition(trans)
          .call(d3.axisRight(legendScale).ticks(10));

        // EXIT HEXAGONS
        this.g.select('.hexagon').selectAll('.hexagons').remove();

        // ENTER HEXAGONS
        this.g.select('.hexagon').selectAll('path')
          .data(hexbins).enter()
          .append('path')
          .attr('d', this.hexbin.hexagon(this.hexBinSize))
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
          .attr('fill', d => colorScale(d.avgIntensity))
          .attr('stroke', d => colorScale(d.avgIntensity))
          .attr('class', 'hexagons')
          .on('mouseover', (d) => {
            this.xPoint = this.xScale.invert(d.x);
            this.yPoint = this.yScale.invert(d.y);
            this.intensityPoint = d.avgIntensity;
          });
      }
    },
  },
};
