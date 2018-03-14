export default (state) => {
  if (!state.filesSelected.length) return null;

  const obj = {};
  state.selectedData.forEach((d) => {
    if (typeof d.metadata !== 'undefined' && d.metadata.length > 0) {
      obj[d.filename] = [...d.metadata];
    }
  });

  return obj;
};
