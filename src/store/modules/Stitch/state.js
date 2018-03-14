import * as d3 from 'd3';
import scales from '../../scales/scales';

export default {
  filesSelected: [],
  stitchedData: [],
  filters: [],
  selectedData: [],
  scale: {
    x: { ...scales.x },
    y: { ...scales.y },
  },
  plotScale: {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  },
  brushScale: d3.scaleLinear(),
  brushes: [],
  brushSelections: {},
  savedBrushes: [],
  savedBrushSelections: {},
  label: {
    x: 'q = x',
    y: 'I(q) = y',
  },
  isZoomBrush: true,
  field: {
    x: 'x',
    y: 'y',
  },
};
