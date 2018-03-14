export default (state, payload) => {
  const name = payload.name;
  const index = payload.index;

  for (let i = 0, length = state.selectedData.length; i < length; i += 1) {
    if (state.selectedData[i].filename === name) {
      state.selectedData[i].data.splice(index, 1);
      state.selectedData[i].dataTransformed.splice(index, 1);
      break;
    }
  }
};
