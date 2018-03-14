import swapFields from '../../../assets/js/swapFields';

export default ({ state, commit }, name) => {
  const filename = name;
  const data = swapFields(state.combinedData, state.field, true);
  const tags = ['combine'];
  const defaultFields = { ...state.field };
  const metadata = [];

  // convert point name to new filename
  data.forEach((point) => {
    point.name = filename; // eslint-disable-line
  });

  const payload = {
    filename,
    data: {
      filename,
      defaultFields,
      metadata,
      data,
    },
  };

  // add combine name to list
  commit('addCombinedData', { filename, loadType: 'combine', tags });
  commit('removeCombineData');
  // to commit mutation from another module do
  commit('TAS/storeData', payload, { root: true });
};
