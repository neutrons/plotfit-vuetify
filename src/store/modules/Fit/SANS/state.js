import state from '../state';
import fits from '../../../fits/SANS1D';

state.label = {
  x: 'q = x',
  y: 'I(q) = y',
};

state.transformations = {
  x: 'x',
  y: 'y',
  error: 'error',
};

state.fits = { ...fits };

state.field = {
  x: 'x',
  y: 'y',
};

export default state;
