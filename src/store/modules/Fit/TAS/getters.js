import getters from '../getters';
import getMetadata from '../../../shared/getters/getMetadata';
import getFields from '../../../shared/getters/getFields';
import isDefaultFieldsDifferent from '../../../shared/getters/isDefaultFieldsDifferent';

getters.fitNames = state => Object.keys(state.fit);
getters.isDefaultFieldsDifferent = isDefaultFieldsDifferent;
getters.getMetadata = getMetadata;
getters.getFields = getFields;

export default getters;
