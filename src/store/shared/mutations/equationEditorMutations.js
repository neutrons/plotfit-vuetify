// Mutations specifically for the equation editor component and fit module
import Vue from 'vue';

export const addToSelect = (state, value) => {
  state.equationEditSelect.push(value);
};

export const updateSelectAtIndex = (state, payload) => {
  const index = payload.index;
  const temp = payload.temp;
  Vue.set(state.equationEditSelect, index, temp);
};

export const removeSelectAtIndex = (state, index) => {
  state.equationEditSelect.splice(index, 1);
};

export const updateInitialValue = (state, payload) => {
  const index = payload.index;
  const value = +payload.value;
  const ivIndex = payload.ivIndex;

  Vue.set(state.equationEditSelect[index].initialValues[ivIndex], 'value', value);
};

export const addCoefficientValue = (state, payload) => {
  const value = payload.value;
  const index = payload.index;

  state.equationEditSelect[index].initialValues.push({ ...value });
};

export const removeInitialValues = (state, payload) => {
  const keys = payload.keys;
  const index = payload.index;
  let i = state.equationEditSelect[index].initialValues.length;

  while (i) {
    i -= 1;
    const match = keys.indexOf(state.equationEditSelect[index].initialValues[i].coefficient);
    if (match !== -1) {
      state.equationEditSelect[index].initialValues.splice(i, 1);
    }
  }
};

export const addInitialValues = (state, payload) => {
  const keys = payload.keys;
  const index = payload.index;
  const length = keys.length;
  const current = payload.newParameters;

  for (let i = 0; i < length; i += 1) {
    const match = current.indexOf(keys[i]);
    const obj = {
      coefficient: keys[i],
      value: 1,
      constant: false,
    };

    state.equationEditSelect[index].initialValues.splice(match, 0, obj);
  }
};

export const setSelectValid = (state, payload) => {
  const index = payload.index;
  const value = payload.value;

  Vue.set(state.equationEditSelect[index], 'valid', value);
};

export const setSelectEquation = (state, payload) => {
  const index = payload.index;
  const equation = payload.equation;

  Vue.set(state.equationEditSelect[index], 'equation', equation);
};

export const setCoefficientConstant = (state, payload) => {
  const index = payload.index;
  const ivIndex = payload.ivIndex;
  const value = payload.value;

  Vue.set(state.equationEditSelect[index].initialValues[ivIndex], 'constant', value);
};

export const updateEquationEditInitialValues = (state, item) => {
  const length = item.length;

  for (let i = 0; i < length; i += 1) {
    const subLength = item[i].length;

    for (let j = 0; j < subLength; j += 1) {
      Vue.set(state.equationEditSelect[i].initialValues[j], 'value', item[i][j].value);
    }
  }
};

export const setEquationEditSelect = (state, value) => {
  state.equationEditSelect = value; // eslint-disable-line
};
