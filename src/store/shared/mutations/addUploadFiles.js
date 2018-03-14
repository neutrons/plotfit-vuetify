import Vue from 'vue';

export default (state, files) => {
  const keys = Object.keys(files);
  keys.forEach((key) => {
    Vue.set(state.uploaded, key, files[key]);
  });
};
