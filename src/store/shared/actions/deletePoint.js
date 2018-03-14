import _ from 'lodash';
import findPointIndex from '../../../assets/js/findPointIndex';

export default ({ state, commit, getters }, payload) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    const name = payload.name;
    const group = payload.group;
    const index = findPointIndex(payload, _.cloneDeep(getters.getPreparedData));

    if (index !== null) {
      // match index to file
      commit('removePoint', { name, index });
      commit(`${group}/removeSavedPoint`, { name, index }, { root: true });
      resolve(true);
    } else {
      reject(false);
    }
  });
};
