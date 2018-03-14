<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListSANS1D',
  extends: FilterList,
  computed: {
    ...mapState('SANS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('SANS/Fit', {
      selected: state => state.filters,
    }),
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
  },
  methods: {
    ...mapMutations('SANS/Fit', [
      'updateFilters',
    ]),
  },
};

</script>