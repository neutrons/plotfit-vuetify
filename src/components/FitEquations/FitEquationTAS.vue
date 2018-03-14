<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import FitEquation from './FitEquation';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'FitEquationTAS',
  extends: FitEquation,
  created() {
    eventBus.$on('update-initial-value-pick-TAS', this.updateInitialValueWithPick);
  },
  destroyed() {
    eventBus.$off('update-initial-value-pick-TAS');
  },
  beforeDestroy() {
    this.setEquationEditSelect([]);
  },
  computed: {
    ...mapState('TAS/Fit', {
      fits: state => state.fits,
    }),
    ...mapGetters('TAS/Fit', [
      'splitFitData',
      'fitInitialValues',
      'finalEquation',
    ]),
    ...mapState('TAS/Fit', {
      fits: state => state.fits,
      fileToFit: state => state.fileToFit,
      selectedData: state => state.selectedData,
      isFitting: state => state.isFitting,
      equationEditSelect: state => state.equationEditSelect,
    }),
    selected: {
      get() {
        return this.equationEditSelect;
      },
    },
  },
  methods: {
    ...mapMutations('TAS/Fit', [
      'addToSelect',
      'updateSelectAtIndex',
      'removeSelectAtIndex',
      'updateInitialValue',
      'removeInitialValues',
      'addInitialValues',
      'setSelectValid',
      'setSelectEquation',
      'setCoefficientConstant',
      'setFitType',
      'setEquationEditSelect',
      'transformData',
    ]),
    fitData() {
      // first set fit type
      eventBus.$emit('refit-data-TAS');
    },
    coefficientInput(payload) {
      // update initial values
      this.updateInitialValue(payload);

      // update fit line with new initial values
      eventBus.$emit('revise-fit-line-TAS', this.fitInitialValues);
    },
    togglePick(value, index, ivIndex) {
      if (value) {
        eventBus.$emit('toggle-pick-area-TAS', true);
        this.pickIndex = index;
        this.pickIvIndex = ivIndex;
      } else {
        eventBus.$emit('toggle-pick-area-TAS', false);
        this.resetPickIndex();
      }
    },
    updateInitialValueWithPick(value) {
      this.updateInitialValue({
        index: this.pickIndex,
        ivIndex: this.pickIvIndex,
        value: +value.toFixed(4),
      });

      this.resetPickIndex();
      eventBus.$emit('revise-fit-line-TAS', this.fitInitialValues);
    },
  },
};
</script>