<script>
import { mapState, mapMutations } from 'vuex';
import FilterList from './FilterList';

export default {
  name: 'FilterListSANS2D',
  extends: FilterList,
  computed: {
    ...mapState('SANS/SANS2D', {
      selected: state => state.filters,
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
  },
  methods: {
    ...mapMutations('SANS/SANS2D', [
      'updateFilters',
    ]),
  },
};

</script>