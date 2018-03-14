// Getters specifically for the equation editor for fit module
import _ from 'lodash';

export const splitFitData = (state) => {
  const obj = { x: [], y: [] };

  state.filteredData.forEach((point) => {
    obj.x.push(point.x);
    obj.y.push(point.y);
  });

  return obj;
};

export const fitInitialValues = (state) => {
  // Grab initial values
  const initialValues = _.cloneDeep(state.equationEditSelect)
    .map(item => item.initialValues) // get each initial value array
    .map((item, index) => { // add suffix to coefficients
      if (index === 0) return item;

      item.forEach((d) => {
        d.coefficient += index; // eslint-disable-line
      });

      return item;
    })
    .reduce((a, b) => a.concat(b), []); // flatten to one single array of initial values

  return initialValues;
};

export const finalEquation = (state) => {
  const equations = state.equationEditSelect.filter(d => d.equation.length > 0);
  const equationsEnd = equations.length - 1;
  let result = '';

  equations.forEach((item, i) => {
    let temp = item.equation;
    if (i !== 0) {
      const keys = item.initialValues.map(d => d.coefficient);
      keys.forEach((d) => {
        const reg = new RegExp(d, 'g');
        temp = temp.replace(reg, d + i);
      });
    }

    if (i !== equationsEnd) {
      result += `${temp} + `;
    } else {
      result += temp;
    }
  });

  return result;
};
