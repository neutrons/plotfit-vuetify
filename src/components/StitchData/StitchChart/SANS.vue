<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import Chart from './DefaultChart';

export default {
  name: 'SANSStitch',
  components: {
    'v-edit-chart-button': () => import('../../EditChart/EditChartButton/SANSStitchEditChartButton'),
  },
  extends: Chart,
  data() {
    return {
      isMathJax: false,
    };
  },
  computed: {
    ...mapState('SANS/Stitch', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
      label: state => state.label,
      brushes: state => state.brushes,
      brushScale: state => state.brushScale,
      brushSelections: state => state.brushSelections,
      savedBrushes: state => state.savedBrushes,
      savedBrushSelections: state => state.savedBrushSelections,
      isZoomBrush: state => state.isZoomBrush,
      stitchedData: state => state.stitchedData,
    }),
    ...mapGetters('SANS/Stitch', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      preparedData: 'getPreparedData',
    }),
    brushCount() {
      if (!this.filesSelected.length) return null;

      return this.filesSelected.length - 1;
    },
  },
  methods: {
    ...mapActions('SANS/Stitch', [
      'deletePoint',
    ]),
    ...mapMutations('SANS/Stitch', [
      'addNewBrush',
      'setBrushes',
      'resetBrushes',
      'addBrushSelections',
      'setBrushSelections',
      'resetBrushSelections',
      'reconvertBrushSelections',
      'setBrushScale',
      'toggleZoomBrush',
      'setStitchedData',
      'resetStitchedData',
      'saveBrushes',
      'saveBrushSelections',
    ]),
  },
};

</script>