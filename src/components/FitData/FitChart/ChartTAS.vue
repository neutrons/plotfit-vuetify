<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'ChartTAS',
  components: {
    'v-edit-chart-button': () => import('../../EditChart/EditChartButton/TASFitEditChartButton'),
  },
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: null,
    };
  },
  created() {
    eventBus.$on('refit-data-TAS', this.drawChart);
    eventBus.$on('revise-fit-line-TAS', this.reviseFitLine);
  },
  destroyed() {
    eventBus.$off('refit-data-TAS');
    eventBus.$off('revise-fit-line-TAS');
  },
  computed: {
    ...mapState('TAS/Fit', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
      label: state => state.field,
      fileToFit: state => state.fileToFit,
      previousFit: state => state.previousFit,
      fittedData: state => state.fittedData,
      fitEquation: state => state.fitEquation,
      filteredData: state => state.filteredData,
      fitInitialValues: state => state.fitInitialValues,
      fitSettings: state => state.fitSettings,
      isFitting: state => state.isFitting,
      field: state => state.field,
    }),
    ...mapGetters('TAS/Fit', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
      fitInitialValues: 'fitInitialValues',
      fitEquation: 'finalEquation',
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
  },
  methods: {
    ...mapMutations('TAS/Fit', [
      'resetBrushSelection',
      'setPreviousFit',
      'toggleIsFitting',
    ]),
    ...mapActions('TAS/Fit', [
      'updateFitTableResults',
      'deletePoint',
    ]),
  },
  watch: {
    filesSelected() {
      if (this.filesSelected.length) {
        this.activeParentTab = 'tab-metadata';
      } else {
        this.activeParentTab = null;
      }
    },
    fileToFit() {
      if (this.filesSelected.length) {
        this.activeParentTab = this.fileToFit === null ? 'tab-metadata' : 'tab-fit';
      } else {
        this.activeParentTab = null;
      }
    },
  },
};

</script>