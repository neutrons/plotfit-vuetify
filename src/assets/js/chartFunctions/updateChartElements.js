import * as d3 from 'd3';
import _ from 'lodash';

export default {
  data: () => ({
    symbols: {
      circle: d3.symbol().type(d3.symbolCircle).size(45),
      triangle: d3.symbol().type(d3.symbolTriangle).size(45),
      cross: d3.symbol().type(d3.symbolCross).size(45),
      diamond: d3.symbol().type(d3.symbolDiamond).size(45),
      square: d3.symbol().type(d3.symbolSquare).size(45),
      wye: d3.symbol().type(d3.symbolWye).size(45),
    },
    xPoint: 0,
    yPoint: 0,
    errorPoint: 0,
  }),
  methods: {
    updateChartElements(duration = 750) {
      const vm = this;
      const trans = d3.transition().duration(duration);
      // Then rescale to zoom's scale
      const [newXScale, newYScale] = this.rescaleToZoom();
      const newLine = d3.line()
        .defined(this.filterForLog)
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));

      this.updateAxes(newXScale, newYScale, trans);
      this.updateGrids(newXScale, newYScale, trans);
      this.updateLabels();

      if (typeof this.fileToFit !== 'undefined' && this.fileToFit !== null) {
        const item = [{ key: 'fit', values: [] }];
        const temp = this.plotData.concat(item);
        this.legend(temp);
      } else {
        this.legend(this.plotData);
      }

      // filter data for negative values when scale is log
      const tempData = _.cloneDeep(this.plotData);
      tempData.forEach((d) => {
        d.values = d.values.filter(this.filterForLog); // eslint-disable-line
      });

      let group = this.g.selectAll('.group').data(tempData);

      group.exit().remove();

      group = group.enter()
        .append('g')
        .attr('clip-path', `url(#clip-${this.ID})`)
        .merge(group)
        .attr('class', d => `group ${d.key}`);

      // ENTER / EXIT / UPDATE LINE
      const scatterLine = group.selectAll('path.scatter-line')
        .data(d => [d]);

      scatterLine.exit().remove();

      scatterLine.enter()
        .append('path')
        .attr('class', 'scatter-line')
        .style('fill', 'none')
        .style('stroke', d => this.getColor(d.key))
        .attr('d', d => newLine(d.values));

      scatterLine.transition(trans)
        .attr('d', d => newLine(d.values))
        .style('stroke', d => this.getColor(d.key));

      // ENTER / EXIT / UPDATE Error Bars
      let errors = group.selectAll('.error-line')
        .data(d => d.values);

      errors.exit().remove();

      errors.enter()
        .append('line')
        .attr('class', 'error-line')
        .attr('x1', d => newXScale(d.x))
        .attr('y1', d => newYScale(d.y + d.error))
        .attr('x2', d => newXScale(d.x))
        .attr('y2', d => this.errorBottomY(d, newYScale))
        .style('stroke', d => this.getColor(d.name));

      errors
        .style('stroke', d => this.getColor(d.name))
        .transition(trans)
        .attr('x1', d => newXScale(d.x))
        .attr('y1', d => newYScale(d.y + d.error))
        .attr('x2', d => newXScale(d.x))
        .attr('y2', d => this.errorBottomY(d, newYScale));

      errors = group.selectAll('.error-cap-top')
        .data(d => d.values);

      errors.exit().remove();

      errors.enter()
        .append('line')
        .attr('class', 'error-cap-top')
        .attr('x1', d => newXScale(d.x) + 4)
        .attr('y1', d => newYScale(d.y + d.error))
        .attr('x2', d => newXScale(d.x) - 4)
        .attr('y2', d => newYScale(d.y + d.error))
        .style('stroke', d => this.getColor(d.name));

      errors
        .style('stroke', d => this.getColor(d.name))
        .transition(trans)
        .attr('x1', d => newXScale(d.x) + 4)
        .attr('y1', d => newYScale(d.y + d.error))
        .attr('x2', d => newXScale(d.x) - 4)
        .attr('y2', d => newYScale(d.y + d.error));

      errors = group.selectAll('.error-cap-bottom')
        .data(d => d.values);

      errors.exit().remove();

      errors.enter()
        .append('line')
        .attr('class', 'error-cap-bottom')
        .attr('x1', d => newXScale(d.x) + 4)
        .attr('y1', d => this.errorBottomY(d, newYScale))
        .attr('x2', d => newXScale(d.x) - 4)
        .attr('y2', d => this.errorBottomY(d, newYScale))
        .style('stroke', d => this.getColor(d.name));

      errors
        .style('stroke', d => this.getColor(d.name))
        .transition(trans)
        .attr('x1', d => newXScale(d.x) + 4)
        .attr('y1', d => this.errorBottomY(d, newYScale))
        .attr('x2', d => newXScale(d.x) - 4)
        .attr('y2', d => this.errorBottomY(d, newYScale));

      // ENTER / EXIT / UPDATE Scatter
      const scatter = group.selectAll('path.point')
        .data(d => d.values);

      scatter.exit().remove();

      scatter.enter()
        .append('path')
        .attr('class', 'point')
        .style('fill', d => this.getColor(d.name))
        .style('stroke', 'whitesmoke')
        .attr('d', (d) => {
          const shape = vm.getShape(d.name);
          return vm.symbols[shape](d);
        })
        .attr('transform', d => `translate( ${newXScale(d.x)}, ${newYScale(d.y)})`)
        .on('mouseover', function hover(d) {
          const shape = vm.getShape(d.name);

          d3.select(this).transition()
            .attr('d', vm.symbols[shape].size(125));

          [vm.xPoint, vm.yPoint, vm.errorPoint] = [d.x, d.y, d.error];
        })
        .on('mouseout', function out(d) {
          const shape = vm.getShape(d.name);

          d3.select(this).transition()
            .attr('d', vm.symbols[shape].size(45));
        });

      scatter.transition(trans)
        .attr('d', (d) => {
          const shape = vm.getShape(d.name);
          return vm.symbols[shape](d);
        })
        .style('fill', d => this.getColor(d.name))
        .style('stroke', 'whitesmoke')
        .attr('transform', d => `translate( ${newXScale(d.x)}, ${newYScale(d.y)})`);
    },
    errorBottomY(d, y) {
      if (d.y - d.error < 0 && this.yType === 'log(y)') return y(d.y);

      return y(d.y - d.error);
    },
    getColor(name) {
      return typeof name === 'undefined' || name === 'combine' || name === 'stitch' ? 'brown' : this.colorScale(name);
    },
    getShape(name) {
      return name === 'combine' || name === 'fit' || name === 'stitch' ? 'cross' : 'circle';
    },
  },
};
