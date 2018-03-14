<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListTASCombine',
  extends: FilterList,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Combine', {
      selected: state => state.filters,
      storedCombined: state => state.storedCombined,
    }),
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded, this.storedCombined);
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'updateFilters',
    ]),
  },
};

</script>