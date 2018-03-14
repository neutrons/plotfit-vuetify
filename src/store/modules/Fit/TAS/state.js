import state from '../state';
import fits from '../../../fits/TAS';

state.label = {
  x: 'q = x',
  y: 'I(q) = y',
};

state.fit = { ...fits };

state.field = {
  x: 'x',
  y: 'y',
};

state.fits = { ...fits };

state.isFieldChange = false;

export default state;
