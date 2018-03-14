import * as d3 from 'd3';
import settings from '../../fits/settings';
import scales from '../../scales/scales';

export default {
  filters: [],
  selectedData: [],
  filteredData: [],
  fittedData: [],
  filesSelected: [],
  fileToFit: null,
  previousFit: '',
  scale: {
    x: { ...scales.x },
    y: { ...scales.y },
  },
  plotScale: {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  },
  fitType: 'Linear',
  defaultFitSettings: { ...settings },
  fitSettings: {
    damping: settings.damping.value,
    errorTolerance: settings.errorTolerance.value,
    gradientDifference: settings.gradientDifference.value,
    maxIterations: settings.maxIterations.value,
  },
  fitError: null,
  fitNote: '',
  brushSelection: [],
  isFitting: false,
  fitScores: null,
  equationEditSelect: [],
};
