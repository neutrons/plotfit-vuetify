<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListTAS',
  extends: FilterList,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Fit', {
      selected: state => state.filters,
    }),
    ...mapState('TAS/Combine', {
      storedCombined: state => state.storedCombined,
    }),
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded, this.storedCombined);
    },
  },
  methods: {
    ...mapMutations('TAS/Fit', [
      'updateFilters',
    ]),
  },
};

</script>