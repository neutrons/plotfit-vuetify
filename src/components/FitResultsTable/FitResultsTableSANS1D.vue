<script>
import { mapState, mapGetters } from 'vuex';
import FitResultsTable from './FitResultsTable';

export default {
  name: 'FitResultsSANS1D',
  extends: FitResultsTable,
  computed: {
    ...mapState('SANS/Fit', {
      fileToFit: state => state.fileToFit,
      fitType: state => state.fitType,
      fittedData: state => state.fittedData,
      fitError: state => state.fitError,
      fitSettings: state => state.fitSettings,
      fitNote: state => state.fitNote,
      xBrushSelection: state => state.brushSelection[1],
      fitScores: state => state.fitScores,
    }),
    ...mapGetters('SANS/Fit', {
      fitInitialValues: 'fitInitialValues',
      fitEquation: 'finalEquation',
    }),
  },
};

</script>