export default (state) => {
  if (state.selectedData.length !== 0) {
    return Object.keys(state.selectedData[0].data[0]);
  }

  return [];
};
