import getChartConfigurations from '../../shared/getters/getChartConfigurations';
import getPreparedData from '../../shared/getters/getPreparedData';
import getExtent from '../../shared/getters/getExtent';
import getPlotData from '../../shared/getters/getPlotData';
import dataToFit from '../../shared/getters/dataToFit';
import isFilesPlotted from '../../shared/getters/isFilesPlotted';
import isFileFit from '../../shared/getters/isFileFit';
import fitKeys from '../../shared/getters/fitKeys';
import { splitFitData, fitInitialValues, finalEquation } from '../../shared/getters/equationEditorGetters';

export default {
  getPreparedData,
  getChartConfigurations,
  isFilesPlotted,
  isFileFit,
  fitKeys,
  getExtent,
  getPlotData,
  dataToFit,
  splitFitData,
  fitInitialValues,
  finalEquation,
};
