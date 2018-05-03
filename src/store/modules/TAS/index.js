import _ from 'lodash';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

// Import Modules
import Browse from '../Browse/TAS';
import Fit from '../Fit/TAS';
import Combine from '../Combine/TAS';
import Runs from '../Runs/TAS';

export default {
  namespaced: true,
  state,
  modules: {
    Browse: _.cloneDeep(Browse),
    Fit: _.cloneDeep(Fit),
    Combine: _.cloneDeep(Combine),
    Runs: _.cloneDeep(Runs),
  },
  getters,
  actions,
  mutations,
};
