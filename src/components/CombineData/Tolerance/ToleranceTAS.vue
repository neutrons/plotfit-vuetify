<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex';
import Tolerance from './Tolerance';

export default {
  name: 'ToleranceTAS',
  extends: Tolerance,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Combine', {
      defaultSettings: state => state.defaultSettings,
      tolerance: state => state.tolerance,
      combData: state => state.combinedData,
      storedCombined: state => state.storedCombined,
    }),
    ...mapGetters('TAS/Combine', [
      'getPreparedData',
    ]),
    editTolerance: {
      get() {
        return this.tolerance;
      },
      set(value) {
        this.setTolerance(value);
      },
    },
    filenameList() {
      const k1 = Object.keys(this.fetched);
      const k2 = Object.keys(this.uploaded);
      const k3 = Object.keys(this.storedCombined);
      return [].concat.apply([], [k1, k2, k3]);
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'setTolerance',
      'combineData',
      'removeCombineData',
    ]),
    ...mapActions('TAS/Combine', [
      'storeCombinedData',
    ]),
    initCombineData() {
      this.combineData(this.getPreparedData);
    },
    storeCombine() {
      const group = this.$route.meta.group;
      this.storeCombinedData({ group, name: this.editCombineName });
    },
  },
};

</script>