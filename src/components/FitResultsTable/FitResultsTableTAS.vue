<script>
import { mapState, mapGetters } from 'vuex';
import FitResultsTable from './FitResultsTable';

export default {
  name: 'FitResultsTAS',
  extends: FitResultsTable,
  computed: {
    ...mapState('TAS/Fit', {
      fileToFit: state => state.fileToFit,
      fittedData: state => state.fittedData,
      fitError: state => state.fitError,
      fitSettings: state => state.fitSettings,
      fitNote: state => state.fitNote,
      xBrushSelection: state => state.brushSelection[1],
      fitScores: state => state.fitScores,
      equationEditSelect: state => state.equationEditSelect,
    }),
    ...mapGetters('TAS/Fit', {
      fitInitialValues: 'fitInitialValues',
      fitEquation: 'finalEquation',
    }),
    fitType() {
      return this.equationEditSelect.map(d => d.name);
    },
  },
};

</script>