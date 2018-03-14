import * as d3 from 'd3';
import defaultSettings from './combineSettings';
import scales from '../../scales/scales';

export default {
  filesToAdd: [],
  filesToSubtract: [],
  filesSelected: {
    add: [],
    subtract: [],
  },
  selectedData: [],
  combinedData: [],
  filters: [],
  defaultSettings: JSON.parse(JSON.stringify(defaultSettings)),
  normalizeValue: defaultSettings.normalize.value,
  normalizeField: defaultSettings.normalize.field,
  normalizeOptions: [
    'time',
    'detector',
    'mcu',
    'monitor',
  ],
  tolerance: defaultSettings.tolerance.value,
  field: {
    x: 'pt',
    y: 'detector',
  },
  scale: {
    x: { ...scales.x },
    y: { ...scales.y },
  },
  plotScale: {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  },
  isNormalized: false,
  isFieldChange: false,
  storedCombined: {},
};
