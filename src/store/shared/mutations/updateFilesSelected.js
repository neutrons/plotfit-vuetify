export default (state, selected) => {
  const keys = [];

  state.filesSelected.forEach((key) => {
    if (selected.indexOf(key) === -1) {
      keys.push(key);
    }
  });

  // now update new list
  // eslint-disable-next-line
  state.filesSelected = selected;
};
