import _ from 'lodash';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

// Import modules
import Stitch from '../Stitch';
import SANS2D from './SANS2D';
import Browse from '../Browse/SANS';
import Fit from '../Fit/SANS';

export default {
  namespaced: true,
  modules: {
    Stitch: _.cloneDeep(Stitch),
    Browse: _.cloneDeep(Browse),
    Fit: _.cloneDeep(Fit),
    SANS2D,
  },
  state,
  getters,
  actions,
  mutations,
};
