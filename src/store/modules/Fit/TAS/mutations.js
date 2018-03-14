import _ from 'lodash';
import * as d3 from 'd3';
import swapFields from '../../../../assets/js/swapFields';

import mutations from '../mutations';

mutations.resetAll = (state) => {
  /* eslint-disable */
  state.selectedData = [];
  state.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  state.transformations = {
    x: 'x',
    y: 'y',
  };
  state.field = {
    x: 'x',
    y: 'y',
  };
  state.label = {
    x: 'x',
    y: 'y',
  };
  state.fittedData = [];
  state.filteredData = [];
  state.brushSelection = [];
  state.isDifferentFields = false;
  state.isFieldChange = false;
  state.equationEditSelect = [];
  state.fileToFit = null;
  /* eslint-enable */
};

mutations.setCurrentData = (state, chosenData) => {
  // set default fields to base curve
  if (chosenData.length === 1 || !state.isFieldChange) state.field = { ...chosenData[0].defaultFields }; // eslint-disable-line

  const tempData = _.cloneDeep(chosenData);
  const tempSelect = [];

  for (let i = 0, len = tempData.length; i < len; i += 1) {
    const data = _.cloneDeep(tempData[i].data);
    const filename = tempData[i].filename;
    const metadata = [...tempData[i].metadata];
    const dataTransformed = swapFields(data, state.field);
    const defaultFields = { ...tempData[i].defaultFields };

    tempSelect.push({
      data,
      dataTransformed,
      filename,
      metadata,
      defaultFields,
    });
  }

  // eslint-disable-next-line
  state.selectedData = tempSelect;
};

mutations.setFitType = (state, type = 'Linear') => {
  /* eslint-disable */
  state.fitType = type;
  /* eslint-enable */
};

export default mutations;
