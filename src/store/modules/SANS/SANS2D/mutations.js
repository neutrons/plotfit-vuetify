import Vue from 'vue';
import _ from 'lodash';

import storeData from '../../../shared/mutations/storeData';
import updateFilters from '../../../shared/mutations/updateFilters';
import removeSavedFile from '../../../shared/mutations/removeSavedFile';

export default {
  storeData,
  updateFilters,
  removeSavedFile,
  addToFetchList(state, payload) {
    const key = payload.key;
    const file = payload.file;
    Vue.set(state.fetched, key, file);
  },
  addUploadFiles(state, files) {
    const keys = Object.keys(files);
    keys.forEach((key) => {
      Vue.set(state.uploaded, key, files[key]);
    });
  },
  updateFilesSelected(state, selected) {
    // eslint-disable-next-line
    state.filesSelected = selected;
  },
  resetAll(state) {
    /* eslint-disable */
    state.selectedData = [];
    state.hexBinSize = 15;
    state.hexScale = 'Log';
    /* eslint-enable */
  },
  setCurrentData(state, payload) {
    const data = _.cloneDeep(payload.data);

    // eslint-disable-next-line
    state.selectedData = data;
  },
  setScale(state, value) {
    // eslint-disable-next-line
    state.hexScale = value;
  },
  resetScale(state) {
    // eslint-disable-next-line
    state.hexScale = 'Log';
  },
  setBinSize(state, value) {
    // eslint-disable-next-line
    state.hexBinSize = value;
  },
  resetBinSize(state) {
    // eslint-disable-next-line
    state.hexBinSize = 15;
  },
};
