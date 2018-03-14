// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    removeChart() {
      this.svg.selectAll('*').remove();
    },
  },
};
