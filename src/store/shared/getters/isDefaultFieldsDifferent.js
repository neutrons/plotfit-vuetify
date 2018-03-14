// function to check if default axes for TAS curves are different

export default (state) => {
  if (state.selectedData.length > 0) {
    const compareX = state.field.x;
    const compareY = state.field.y;
    const length = state.selectedData.length;

    for (let i = 0; i < length; i += 1) {
      const d = state.selectedData[i];
      const defX = d.defaultFields.x;
      const defY = d.defaultFields.y;

      if (compareX !== defX || compareY !== defY) {
        return 'Atleast one curves\' default axes are different from the current axes selected.';
      }
    }
  }

  return true;
};
