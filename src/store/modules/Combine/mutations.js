import * as d3 from 'd3';
import _ from 'lodash';

import { setXScale, setYScale, resetScales } from '../../shared/mutations/scales';
import updateFilters from '../../shared/mutations/updateFilters';
import { normalizeData, resetNormalizeData } from '../../shared/mutations/normalizeData';
import { combineData, removeCombineData, addCombinedData } from '../../shared/mutations/combineData';
import { changeFields } from '../../shared/mutations/fields';
import removePoint from '../../shared/mutations/removePoint';

import swapFields from '../../../assets/js/swapFields';

export default {
  setXScale,
  setYScale,
  resetScales,
  updateFilters,
  changeFields,
  normalizeData,
  resetNormalizeData,
  combineData,
  removeCombineData,
  addCombinedData,
  removePoint,
  updateFilesToAdd(state, selected) {
    const keys = [];

    state.filesToAdd.forEach((key) => {
      if (selected.indexOf(key) === -1) {
        keys.push(key);
      }
    });

    // eslint-disable-next-line
    state.filesToAdd = selected;
    // eslint-disable-next-line
    state.filesSelected.add = selected;
  },
  updateFilesToSubtract(state, selected) {
    const keys = [];

    state.filesToSubtract.forEach((key) => {
      if (selected.indexOf(key) === -1) {
        keys.push(key);
      }
    });

    // eslint-disable-next-line
    state.filesToSubtract = selected;
    // eslint-disable-next-line
    state.filesSelected.subtract = selected;
  },
  resetAll(state) {
    /* eslint-disable */
    state.filesToSubtract = [];
    state.filesToAdd = [];
    state.combinedData = [];
    state.selectedData = [];
    state.isNormalized = false;
    state.normalizeValue = state.defaultSettings.normalize.value;
    state.tolerance = state.defaultSettings.tolerance.value;
    state.field = {
      x: 'x',
      y: 'y',
    };
    state.normalizeField = 'time';
    state.plotScale = {
      x: { label: 'x', value: d3.scaleLinear() },
      y: { label: 'y', value: d3.scaleLinear() },
    };
    state.isFieldChange = false;
    /* eslint-enable */
  },
  setNormalizeValue(state, value) {
    // eslint-disable-next-line
    state.normalizeValue = value;
  },
  setNormalizeField(state, value) {
    // eslint-disable-next-line
    state.normalizeField = value;
  },
  setTolerance(state, value) {
    // eslint-disable-next-line
    state.tolerance = value;
  },
  setCurrentData(state, chosenData) {
    // set default fields to base curve
    if (chosenData.length === 1 || !state.isFieldChange) state.field = { ...chosenData[0].defaultFields }; // eslint-disable-line

    const tempData = _.cloneDeep(chosenData);
    const tempSelect = [];

    for (let i = 0, len = tempData.length; i < len; i += 1) {
      const data = _.cloneDeep(tempData[i].data);
      const filename = tempData[i].filename;
      const metadata = [...tempData[i].metadata];
      const dataTransformed = swapFields(data, state.field);
      const type = state.filesToAdd.indexOf(filename) === -1 ? 'subtract' : 'add';
      const defaultFields = { ...tempData[i].defaultFields };

      tempSelect.push({
        data,
        dataTransformed,
        filename,
        metadata,
        type,
        defaultFields,
      });
    }

    // eslint-disable-next-line
    state.selectedData = tempSelect;
  },
};
