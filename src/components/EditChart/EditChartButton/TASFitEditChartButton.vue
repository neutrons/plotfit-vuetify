<script>
import { mapState, mapGetters } from 'vuex';

import EditChartButton from './EditChartButton';

export default {
  name: 'TASFitEditChartButton',
  extends: EditChartButton,
  computed: {
    ...mapState('TAS/Fit', {
      fittedData: state => state.fittedData,
      field: state => state.field,
      plotScale: state => state.plotScale,
    }),
    ...mapGetters('TAS/Fit', [
      'getPreparedData',
    ]),
    label() {
      return this.field;
    },
    axis() {
      return {
        x: this.plotScale.x.label === 'log(x)' ? 'log' : 'linear',
        y: this.plotScale.y.label === 'log(y)' ? 'log' : 'linear',
      };
    },
    editChartData() {
      return JSON.stringify({
        data: this.packageData(),
        labels: this.label,
        axis: this.axis,
      });
    },
  },
  methods: {
    packageData() {
      const temp = [{
        name: 'fit',
        x: this.fittedData.map(d => d.x),
        y: this.fittedData.map(d => d.y),
      }];

      this.getPreparedData.forEach((curve) => {
        temp.push({
          name: curve.key,
          x: curve.values.map(d => d.x),
          y: curve.values.map(d => d.y),
          error_y: curve.values.map(d => d.error)
            .map(d => ({
              type: 'data',
              array: d,
              visible: true,
            })),
        });
      });
      return temp;
    },
  },
};
</script>