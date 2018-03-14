<template>
    <v-btn small flat @click='fetchFiles' class='fetch-btn'>
      <span class='hidden-md-and-down'>Fetch Data</span>
      <v-icon small :right='!isBreakpointSmall' color='white'>fa-cloud-download</v-icon>
    </v-btn>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../assets/js/eventBus';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'FetchDataButton',
  mixins: [
    isBreakpointSmall,
  ],
  data() {
    return {
      savedFetchURL: undefined,
    };
  },
  mounted() {
    // Event listener for when stitch lines are saved
    eventBus.$on('fetch-files', this.fetchFiles);
  },
  computed: {
    isFetchURL() {
      return typeof process.env.FETCH_TAS_URL !== 'undefined'
        && typeof process.env.FETCH_SANS_URL !== 'undefined';
    },
    fetchURL() {
      if (typeof this.savedFetchURL !== 'undefined') {
        return this.savedFetchURL;
      } else if (this.isFetchURL) {
        return this.$route.meta.group === 'TAS' ? process.env.FETCH_TAS_URL : process.env.FETCH_SANS_URL;
      }

      return undefined;
    },
  },
  methods: {
    fetchFiles() {
      const vm = this;
      if (typeof this.fetchURL === 'undefined') {
        eventBus.$emit('add-notification', 'Unable to fetch.', 'error');
        return;
      }

      axios.get(this.fetchURL).then((response) => {
        const data = response.data;

        switch (vm.$route.meta.group) {
          case 'TAS':
            vm.fetchTAS(data);
            break;
          case 'SANS':
          default:
            vm.fetchSANS(data);
        }

        // Notify that fetch was a success
        eventBus.$emit('add-notification', 'Data fetched!', 'success');
      }).catch((err) => {
        eventBus.$emit('add-notification', err.message, 'error');
      });
    },
    fetchTAS(data) {
      const temp = {};

      data.forEach((file) => {
        const re = /exp(\d+)_scan(\d+)/;
        const found = re.exec(file.url);
        const filename = found[0];

        temp[filename] = {
          filename,
          url: file.url,
          scan: file.scan,
          scanTitle: file.scan_title,
          tags: ['fetched'],
          loadType: 'fetched',
        };
      });

      this.$store.dispatch('TAS/addFetchFiles', temp);
    },
    fetchSANS(data) {
      const temp = {};

      data.forEach((el) => {
        const jobTitle = el.job_title;
        const jobModified = el.date_modified;

        el.results.forEach((r) => {
          const key = r.type;

          if (key === this.$route.meta.subgroup) {
            temp[r.filename] = {
              id: r.id,
              filename: r.filename,
              url: r.url,
              jobTitle,
              dateModified: jobModified,
              tags: [jobTitle, 'fetched'],
              loadType: 'fetched',
            };
          }
        });
      });

      const namespace = this.$route.name !== 'SANS2D' ? 'SANS' : 'SANS/SANS2D';
      this.$store.dispatch(`${namespace}/addFetchFiles`, temp);
    },
  },
  watch: {
    $route() {
      if (typeof this.$route.query.fetch !== 'undefined') {
        if (this.savedFetchURL !== this.$route.query.fetch) {
          this.savedFetchURL = this.$route.query.fetch;
          this.fetchFiles();
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.fetch-btn {
  border-left: 1px solid gainsboro !important;
}
</style>