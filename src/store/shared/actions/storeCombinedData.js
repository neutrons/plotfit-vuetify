import swapFields from '../../../assets/js/swapFields';

export default ({ state, commit }, payload) => {
  const filename = payload.name;
  const data = swapFields(state.combinedData, state.field, true);
  const tags = ['combine'];
  const defaultFields = { ...state.field };
  const metadata = [];
  const group = payload.group;
  // convert point name to new filename
  data.forEach((point) => {
    point.name = filename; // eslint-disable-line
  });

  const obj = {
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
  commit(`${group}/storeData`, obj, { root: true });
};
