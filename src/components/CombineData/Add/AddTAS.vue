<script>
import { mapState, mapMutations } from 'vuex';
import Add from './Add';

export default {
  name: 'FilesListTAS',
  extends: Add,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Combine', {
      filesToAdd: state => state.filesToAdd,
      filesToSubtract: state => state.filesToSubtract,
      filters: state => state.filters,
      storedCombined: state => state.storedCombined,
    }),
    selected: {
      get() {
        return this.filesToAdd;
      },
      set(value) {
        this.updateFilesToAdd(value);
      },
    },
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded, this.storedCombined);
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'updateFilesToAdd',
    ]),
  },
};

</script>