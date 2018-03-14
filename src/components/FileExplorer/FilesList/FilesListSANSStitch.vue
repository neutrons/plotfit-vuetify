<script>
import { mapState, mapMutations } from 'vuex';
import FilesList from './FilesList';

export default {
  name: 'FilesListSANSStitch',
  extends: FilesList,
  computed: {
    ...mapState('SANS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('SANS/Stitch', {
      filesSelected: state => state.filesSelected,
      filters: state => state.filters,
    }),
    selected: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        this.updateFilesSelected(value);
      },
    },
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
  },
  methods: {
    ...mapMutations('SANS/Stitch', [
      'updateFilesSelected',
    ]),
  },
};

</script>