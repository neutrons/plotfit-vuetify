<script>
import { mapState, mapMutations } from 'vuex';
import FilesList from './FilesList';

export default {
  name: 'FilesListSANS1D',
  extends: FilesList,
  computed: {
    ...mapState('SANS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('SANS/Fit', {
      filesSelected: state => state.filesSelected,
      filters: state => state.filters,
      fileToFit: state => state.fileToFit,
    }),
    selected: {
      get() {
        return this.filesSelected;
      },
      set(value) {
        if (value.indexOf(this.fileToFit) === -1) this.updateFileToFit(null);
        this.updateFilesSelected(value);
      },
    },
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
  },
  methods: {
    ...mapMutations('SANS/Fit', [
      'updateFilesSelected',
      'updateFileToFit',
    ]),
  },
};

</script>