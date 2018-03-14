<script>
import { mapState, mapGetters } from 'vuex';
import Chart from './DefaultChart';

export default {
  name: 'CombineChartTAS',
  components: {
    'v-edit-chart-button': () => import('../../EditChart/EditChartButton/TASCombineEditChartButton'),
  },
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: null,
    };
  },
  computed: {
    ...mapState('TAS/Combine', {
      plotScale: state => state.plotScale,
      label: state => state.field,
      fittedData: state => state.fittedData,
      fitEquation: state => state.fitEquation,
      filteredData: state => state.filteredData,
      field: state => state.field,
      combinedData: state => state.combinedData,
    }),
    ...mapGetters('TAS/Combine', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
      mergedFiles: 'mergedFiles',
    }),
    plottedData() {
      const temp = this.preparedData.map(d => d.values)
        .reduce((a, b) => a.concat(b), [])
        .map((d) => {
          const obj = Object.assign({}, d);

          obj[this.field.x] = obj.x;
          obj[this.field.y] = obj.y;

          delete obj.x;
          delete obj.y;

          return obj;
        });

      return temp;
    },
    originalCombinedData() {
      const temp = this.combinedData.map((d) => {
        const obj = Object.assign({}, d);

        obj[this.field.x] = obj.x;
        obj[this.field.y] = obj.y;

        delete obj.x;
        delete obj.y;

        return obj;
      });

      return temp;
    },
  },
  watch: {
    combinedData: {
      deep: true,
      handler(val) {
        if (!val.length) this.g.select('.group-combine').remove();
      },
    },
    mergedFiles() {
      if (this.mergedFiles.length) {
        this.activeParentTab = this.combinedData.length ? 'tab-combined' : 'tab-metadata';
      } else {
        this.activeParentTab = null;
      }
    },
  },
};

</script>