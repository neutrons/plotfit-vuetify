import updateFilesSelected from '../../shared/mutations/updateFilesSelected';
import updateFilters from '../../shared/mutations/updateFilters';
import updateFileToFit from '../../shared/mutations/updateFileToFit';
import setPreviousFit from '../../shared/mutations/setPreviousFit';
import { setXScale, setYScale, resetScales } from '../../shared/mutations/scales';
import { setFitDamping, setFitGradient, setFitIterations, setFitError, resetFitSettings } from '../../shared/mutations/setFitSettings';
import { resetBrushSelection, setBrushLimits, setBrushSelection } from '../../shared/mutations/selections';
import setFitList from '../../shared/mutations/setFitList';
import { changeFields } from '../../shared/mutations/fields';
import setFilteredData from '../../shared/mutations/setFilteredData';
import toggleIsFitting from '../../shared/mutations/toggleIsFitting';
import { addToSelect, updateSelectAtIndex, removeSelectAtIndex,
  updateInitialValue, addCoefficientValue, removeInitialValues,
  addInitialValues, setSelectValid, setSelectEquation,
  setCoefficientConstant, updateEquationEditInitialValues, setEquationEditSelect } from '../../shared/mutations/equationEditorMutations';
import setFitScores from '../../shared/mutations/setFitScores';
import setFittedData from '../../shared/mutations/setFittedData';
import setFittedError from '../../shared/mutations/setFittedError';
import removePoint from '../../shared/mutations/removePoint';

export default {
  updateFilesSelected,
  updateFilters,
  updateFileToFit,
  setPreviousFit,
  setXScale,
  setYScale,
  resetScales,
  setFitList,
  setFitDamping,
  setFitGradient,
  setFitIterations,
  setFitError,
  resetFitSettings,
  resetBrushSelection,
  setBrushLimits,
  setBrushSelection,
  changeFields,
  setFilteredData,
  toggleIsFitting,
  addToSelect,
  updateSelectAtIndex,
  removeSelectAtIndex,
  updateInitialValue,
  addCoefficientValue,
  removeInitialValues,
  addInitialValues,
  setSelectValid,
  setSelectEquation,
  setCoefficientConstant,
  updateEquationEditInitialValues,
  setEquationEditSelect,
  setFitScores,
  setFittedData,
  setFittedError,
  removePoint,
};
