import _ from 'lodash';
import * as d3 from 'd3';
import transformDataFunc from '../../../../assets/js/transformData';
import { setXTransformation, setYTransformation, setTransformations, resetTransformations, transformData } from '../../../shared/mutations/transformations';

import mutations from '../mutations';

mutations.setXTransformation = setXTransformation;
mutations.setYTransformation = setYTransformation;
mutations.setTransformations = setTransformations;
mutations.resetTransformations = resetTransformations;
mutations.transformData = transformData;

mutations.resetAll = (state) => {
  /* eslint-disable */
  state.selectedData = [];
  state.fileToFit = null;
  state.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  state.transformations = {
    x: 'x',
    y: 'y',
  };
  state.label = {
    x: 'q = x',
    y: 'I(q) = y',
  };
  state.fittedData = [];
  state.filteredData = [];
  state.brushSelection = [];
  state.equationEditSelect = [];
  /* eslint-enable */
};

mutations.setCurrentData = (state, chosenData) => {
  const tempData = _.cloneDeep(chosenData);
  const tempSelect = [];

  for (let i = 0, len = tempData.length; i < len; i += 1) {
    const data = tempData[i].data;
    const filename = tempData[i].filename;

    if (state.transformations.x !== 'x' || state.transformations.y !== 'y') {
      const dataTransformed = transformDataFunc(data, state.transformations);

      tempSelect.push({
        filename,
        data,
        dataTransformed,
      });
    } else {
      const dataTransformed = _.cloneDeep(data);

      tempSelect.push({
        filename,
        data,
        dataTransformed,
      });
    }
  }

  // eslint-disable-next-line
  state.selectedData = tempSelect;
};

mutations.setFitType = (state, type = 'Linear') => {
  /* eslint-disable */
  state.fitType = type;
  state.transformations.x = state.fits[type].transformations.x;
  state.label.x = `q = ${state.transformations.x}`;
  state.transformations.y = state.fits[type].transformations.y;
  state.label.y = `I(q) = ${state.transformations.y}`;
  state.transformations.error = state.fits[type].transformations.error;
  state.fitNote = state.fits[type].note;
  /* eslint-enable */
};

export default mutations;
