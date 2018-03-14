<script>
import { mapState, mapGetters } from 'vuex';

import DefaultChart from './DefaultChart';

export default {
  name: 'TASBrowse',
  extends: DefaultChart,
  components: {
    'v-edit-chart-button': () => import('../EditChart/EditChartButton/TASBrowseEditChartButton'),
  },
  data() {
    return {
      isMathJax: false,
      ID: 'TAS-Browse',
    };
  },
  computed: {
    ...mapState('TAS/Browse', {
      browseData: state => state.browseData,
    }),
    ...mapGetters('TAS/Browse', [
      'defaultFields',
      'label',
      'plotData',
      'plotMetadata',
    ]),
  },
};
</script>