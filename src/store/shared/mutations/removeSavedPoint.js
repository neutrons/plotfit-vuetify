export default (state, payload) => {
  const index = payload.index;
  const name = payload.name;
  state.saved[name].data.splice(index, 1);
};
