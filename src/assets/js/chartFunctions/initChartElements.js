import * as d3 from 'd3';

export default {
  methods: {
    initChartElements(name) {
      this.svg = d3.select(name)
        .attr('viewBox', this.viewBox)
        .attr('perserveAspectRatio', 'xMidYMid meet')
        .attr('width', '100%');

      this.addLabels();
      this.addClipPath();

      const clipPath = this.svg.append('defs').append('clipPath');
      clipPath.attr('id', `clip-${this.ID}`)
        .append('rect')
        .style('fill', 'none')
        .attr('width', this.width)
        .attr('height', this.height);

      this.g = this.svg.append('g')
        .attr('class', 'chart-group')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      this.g.append('rect').attr('class', 'chart-bg')
          .attr('height', this.height)
          .attr('width', this.width)
          .style('fill', 'white');

      const grid = this.g.append('g').attr('class', 'grid');
      grid.append('g').attr('class', 'grid--x')
          .attr('transform', `translate(0, ${this.height})`)
          .call(this.xGrid);

      grid.append('g').attr('class', 'grid--y')
          .call(this.yGrid);

      const axis = this.g.append('g').attr('class', 'axis');
      axis.append('g').attr('class', 'axis--x')
          .attr('transform', `translate(0, ${this.height})`)
          .call(this.xAxis);

      axis.append('g').attr('class', 'axis--y')
          .call(this.yAxis);

      // Add Zoom Group
      this.addZoomGroup();

      this.g.select('.zoom').call(this.zoom);

      // Generate a SVG group to keep brushes
      this.g.select(`#zoom-group-${this.ID}`).append('g')
        .attr('class', 'brushes')
        .attr('height', this.height)
        .attr('width', this.width)
        .attr('fill', 'none');
    },
  },
};
