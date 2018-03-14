export default ({ state, commit }, files) => {
  const savedKeys = Object.keys(state.saved);

  // Go through files and if fetched file is in saved list
  // remove it so that updated data can be pulled in
  const keys = Object.keys(files);
  keys.forEach((key) => {
    if (savedKeys.indexOf(key) !== -1) {
      commit('removeSavedFile', key);
    }

    commit('addToFetchList', { key, file: files[key] });
  });
};
