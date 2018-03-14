import _ from 'lodash';

export default ({ state, commit }, payload) => {
  commit('setFittedError', payload.fitError);
  commit('setFittedData', _.cloneDeep(payload.fittedData));
  commit('setFitScores', _.cloneDeep(payload.scores));

  /*
    Lastly, we need to update the fit initial values with the ones
    generated from the last fit cycle.

    This is done by un-flattening the array fed into the fit function.
    Then setting the initial values for each editFitEquationSelect element
  */
  const fitInitialValues = _.cloneDeep(payload.iv);
  const lengths = state.equationEditSelect.map(d => d.initialValues.length);
  const length = lengths.length;
  const updatedFitInitialValues = [];

  for (let i = 0; i < length; i += 1) {
    updatedFitInitialValues.push(fitInitialValues.splice(0, lengths[i]));
  }

  commit('updateEquationEditInitialValues', updatedFitInitialValues);
};
