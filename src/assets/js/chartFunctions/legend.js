export default {
  methods: {
    legend(data) {
      this.g.select('.legend').remove();

      this.g.append('g')
        .attr('class', 'legend')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'end')
        .selectAll('.label')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'label')
        .attr('transform', (d, i) => `translate(0, ${(i + 1) * 20})`);

      this.g.selectAll('.label').append('rect')
        .attr('x', this.width - 30)
        .attr('height', 15)
        .attr('width', 15)
        .style('fill', (d) => { // eslint-disable-line
          return d.key === 'combine' || d.key === 'stitch' || d.key === 'fit' || typeof d.key === 'undefined' ? 'brown' : this.colorScale(d.key);
        });

      this.g.selectAll('.label').append('text')
        .attr('x', this.width - 40)
        .attr('y', 10)
        .attr('class', 'label')
        .text(d => d.key);
    },
  },
};

