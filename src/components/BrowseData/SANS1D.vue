<script>
import { mapState, mapGetters } from 'vuex';
import DefaultChart from './DefaultChart';

export default {
  name: 'SANS1DBrowse',
  extends: DefaultChart,
  components: {
    'v-edit-chart-button': () => import('../EditChart/EditChartButton/SANSBrowseEditChartButton'),
  },
  data() {
    return {
      isMathJax: true,
      ID: 'SANS-Browse',
    };
  },
  computed: {
    ...mapState('SANS/Browse', {
      browseData: state => state.browseData,
      label: state => state.label,
    }),
    ...mapGetters('SANS/Browse', [
      'plotData',
    ]),
  },
};
</script>