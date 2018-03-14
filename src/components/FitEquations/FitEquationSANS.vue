<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import FitEquation from './FitEquation';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'FitEquationSANS',
  extends: FitEquation,
  created() {
    eventBus.$on('update-initial-value-pick-SANS', this.updateInitialValueWithPick);
  },
  destroyed() {
    eventBus.$off('update-initial-value-pick-SANS');
  },
  beforeDestroy() {
    this.setEquationEditSelect([]);
  },
  computed: {
    ...mapState('SANS/Fit', {
      fits: state => state.fits,
    }),
    ...mapGetters('SANS/Fit', [
      'splitFitData',
      'fitInitialValues',
      'finalEquation',
    ]),
    ...mapState('SANS/Fit', {
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
    ...mapMutations('SANS/Fit', [
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
      this.transformData();
    },
    coefficientInput(payload) {
      // update initial values
      this.updateInitialValue(payload);

      // update fit line with new initial values
      eventBus.$emit('revise-fit-line-SANS1D', this.fitInitialValues);
    },
    togglePick(value, index, ivIndex) {
      if (value) {
        eventBus.$emit('toggle-pick-area-SANS', true);
        this.pickIndex = index;
        this.pickIvIndex = ivIndex;
      } else {
        eventBus.$emit('toggle-pick-area-SANS', false);
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
      eventBus.$emit('revise-fit-line-SANS1D', this.fitInitialValues);
    },
  },
};
</script>