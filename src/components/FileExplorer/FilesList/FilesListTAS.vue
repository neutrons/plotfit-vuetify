<script>
import { mapState, mapMutations } from 'vuex';
import FilesList from './FilesList';

export default {
  name: 'FilesListTAS',
  extends: FilesList,
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Fit', {
      filesSelected: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
      filters: state => state.filters,
    }),
    ...mapState('TAS/Combine', {
      storedCombined: state => state.storedCombined,
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
      return Object.assign({}, this.fetched, this.uploaded, this.storedCombined);
    },
  },
  methods: {
    ...mapMutations('TAS/Fit', [
      'updateFilesSelected',
      'updateFileToFit',
    ]),
  },
};

</script>