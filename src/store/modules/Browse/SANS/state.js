import _ from 'lodash';

import state from '../state';

const temp = _.cloneDeep(state);

temp.label = {
  x: 'q',
  y: 'I(q)',
};

export default temp;
