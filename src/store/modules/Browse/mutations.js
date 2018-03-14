import _ from 'lodash';

export default {
  setBrowseData(state, value) {
    // eslint-disable-next-line
    state.browseData = _.cloneDeep(value);
  },
  resetAll(state) {
    /* eslint-disable */
    state.browseData = [];
    /* eslint-enable */
  },
  removePoint(state, payload) {
    const index = payload.index;
    state.browseData.data.splice(index, 1);
  },
};
