<script>
import { mapState, mapGetters } from 'vuex';

import EditChartButton from './EditChartButton';

export default {
  name: 'TASCombineEditChartButton',
  extends: EditChartButton,
  computed: {
    ...mapState('TAS/Combine', {
      field: state => state.field,
      plotScale: state => state.plotScale,
    }),
    ...mapGetters('TAS/Combine', [
      'getChartConfigurations',
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
      const temp = [];
      this.getChartConfigurations.data.forEach((curve) => {
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