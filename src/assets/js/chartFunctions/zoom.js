// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  computed: {
    zoom() {
      return d3.zoom().on('zoom', this.zoomed);
    },
  },
  methods: {
    zoomed() {
      const [newXScale, newYScale] = this.rescaleToZoom();
      const newLine = d3.line()
        .defined(this.filterForLog)
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));
      const trans = d3.transition().duration(0);

      this.updateAxes(newXScale, newYScale, trans);
      this.updateGrids(newXScale, newYScale, trans);

      // re-draw error line;
      this.g.selectAll('.error-line')
        // .selectAll('line')
        .attr('x1', d => newXScale(d.x))
        .attr('y1', d => newYScale(d.y + d.error))
        .attr('x2', d => newXScale(d.x))
        .attr('y2', d => newYScale(d.y - d.error));

      // re-draw error cap top;
      this.g.selectAll('.error-cap-top')
        // .selectAll('line')
        .attr('x1', d => newXScale(d.x) + 4)
        .attr('y1', d => newYScale(d.y + d.error))
        .attr('x2', d => newXScale(d.x) - 4)
        .attr('y2', d => newYScale(d.y + d.error));

      // re-draw error cap top;
      this.g.selectAll('.error-cap-bottom')
        // .selectAll('line')
        .attr('x1', d => newXScale(d.x) + 4)
        .attr('y1', d => newYScale(d.y - d.error))
        .attr('x2', d => newXScale(d.x) - 4)
        .attr('y2', d => newYScale(d.y - d.error));

      // re-draw scatter plot;
      this.g.selectAll('.point')
        .attr('transform', d => `translate( ${newXScale(d.x)}, ${newYScale(d.y)})`);

      // re-draw line paths
      this.g.selectAll('.scatter-line')
        // .selectAll('path')
        .attr('d', d => newLine(d.values));

      if (this.fileToFit) this.g.select('.fitted-line').attr('d', newLine);
      if (this.$route.feature === 'Stitch') {
        this.updateBrushScale();
        this.reconvertBrushSelections();
      }
    },
    rescaleToZoom() {
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);

      return [newXScale, newYScale];
    },
  },
};
