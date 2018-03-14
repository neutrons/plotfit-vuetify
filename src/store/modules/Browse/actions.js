// import _ from 'lodash';
// import findPointIndex from '../../../assets/js/findPointIndex';

// export default {
//   deletePoint({ state, commit, getters }, payload) {
//     return new Promise((resolve, reject) => {
//       const name = payload.name;
//       const group = payload.group;
//       const index = findPointIndex(payload, _.cloneDeep(getters.plotData));

//       if (index !== null) {
//         // match index to file
//         commit('removePoint', index);
//         commit(`${group}/removeSavedPoint`, { name, index }, { root: true });
//         resolve(true);
//       } else {
//         reject(false);
//       }
//     });
//   },
// };
import deletePoint from '../../shared/actions/deletePoint';

export default {
  deletePoint,
};
