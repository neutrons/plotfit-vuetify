import Vue from 'vue';

export default (state, key) => {
  Vue.delete(state.saved, key);
};
