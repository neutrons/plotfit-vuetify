<script>
import { mapGetters } from 'vuex';
import FileExplorer from './FileExplorer';
import FilterList from './FilterList/FilterListTAS';
import FilesList from './FilesList/FilesListTAS';
import FitList from './FitList/FitListTAS';

export default {
  name: 'FileExplorerTAS',
  extends: FileExplorer,
  components: {
    'v-filter-list': FilterList,
    'v-files-list': FilesList,
    'v-fit-list': FitList,
  },
  computed: {
    ...mapGetters('TAS/Fit', [
      'isDefaultFieldsDifferent',
    ]),
  },
};

</script>