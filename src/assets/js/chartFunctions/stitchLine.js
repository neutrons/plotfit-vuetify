import _ from 'lodash';
import interpolate from './interpolateLine';
import { eventBus } from '../eventBus';

export default {
  methods: {
    stitchData() {
      // console.log('Stitching data...');
      const selectedData = this.selectData();

      // Run tests to check if appropriate brush selections are made
      if (selectedData.length && this.validateSelections(selectedData)) {
        // console.log('Selected Data: ', selectedData);
        // Now interpolate data
        const line = interpolate.linear(selectedData);

        // First repackage data to an array of objects per points for d3 to work with
        const tempData = [];

        for (let i = 0, len = line.x.length; i < len; i += 1) {
          tempData.push({
            x: line.x[i],
            y: line.y[i],
            error: line.error[i],
            name: 'stitch',
          });
        }

        this.setStitchedData(tempData);
      }
    },
    removeStitchLine() {
      this.resetStitchedData();
    },
    selectData() {
      // If there are no brush selections, don't bother matching the data
      if (!this.validateBrushes()) return [];

      const matches = [];
      // An array of all data sorted left to right by x axis values
      const allData = this.formatData(this.preparedData);
      // console.log('All data:', allData);

      // First sort brushes so that selections are made left to right
      const sortedBrushes = this.sortBrushes(); // an array of sorted brush selections
      // console.log('Sorted Brushes:', sortedBrushes);

      for (let i = 0, sortedLength = sortedBrushes.length; i < sortedLength; i += 1) {
        const start = sortedBrushes[i][1].converted[0];
        const end = sortedBrushes[i][1].converted[1];
        const tempSelection = [];

        for (let j = 0, allLength = allData.length; j < allLength; j += 1) {
          // Temp data is cloned so original array is not referenced
          // If not cloned, the stitching function will not work properly because
          // each brush selection reference the same curve...hence the same data will
          // get altered when shifting during the interpolation process.
          const tempData = _.cloneDeep(allData[j][1]);
          const tempName = allData[j][0];
          const firstValue = tempData.x[0];
          const lastValue = tempData.x[tempData.x.length - 1];

          // console.log('Check: ' + tempName, firstValue <= end && lastValue >= start);
          if (firstValue <= end && lastValue >= start) {
            const tempSelCurve = [tempName];
            const tempSel = { x: [], y: [], error: [] };

            for (let z = 0, xLength = tempData.x.length; z < xLength; z += 1) {
              const convertedX = tempData.x[z];

              if (start <= convertedX && convertedX <= end) {
                // Add the x,y,e values to selection object
                tempSel.x.push(tempData.x[z]);
                tempSel.y.push(tempData.y[z]);
                tempSel.error.push(tempData.error[z]);
              }
            }

            tempSelCurve.push(tempData); // Add all data
            tempSelCurve.push(tempSel); // Add selected data
            tempSelection.push(tempSelCurve);
          }
        }

        tempSelection.push([start, end]); // Add Brush selections

        // Push Temp brush selection to match array
        matches.push(tempSelection);
      }

      return matches;
    },
    formatData(data) {
      const formatted = [];

      for (let i = 0, len = data.length; i < len; i += 1) {
        const tempData = data[i].values;
        const tempName = data[i].key;
        const x = [];
        const y = [];
        const error = [];

        // eslint-disable-next-line
        tempData.forEach((el) => { 
          x.push(el.x);
          y.push(el.y);
          error.push(el.error);
        });

        formatted.push([tempName, { x, y, error }]);
      }

      // Sort curves form least to greatest
      formatted.sort((a, b) => {
        const minA = _.min(a[1].x);
        const minB = _.min(b[1].x);

        return minA - minB;
      });

      return formatted;
    },
    validateBrushes() {
      // console.log(brushObj.brushSelections);
      // console.log(Object.keys(brushObj.brushSelections));
      const totalBrushes = Object.keys(this.brushSelections).length;
      let errorMsg;
      if (!totalBrushes) {
        // console.log('No brushes to select data.');
        // Emit error message pop-up
        errorMsg = 'No brushes to select data. Draw brushes.';
        eventBus.$emit('add-notification', errorMsg, 'error');

        return false;
      } else if (totalBrushes !== this.brushCount) {
        // console.log(`There are ${this.brushCount + 1} lines.
        // You must have (n-1) = ${this.brushCount} number of brushes.`);

        // Emit error message pop-up
        errorMsg = `There are ${this.brushCount + 1} lines. You must have (n-1) = ${this.brushCount} number of brushes. Redraw brushes.`;
        eventBus.$emit('add-notification', errorMsg, 'error');

        return false;
      }

      return true;
    },
    validateSelections(selected) {
      // First make sure only 2 lines and only 2 lines are selected per brush
      let errorMsg;

      for (let i = 0, len = selected.length; i < len; i += 1) {
        const tempBrush = selected[i];

        // console.log('Temp brush', tempBrush);
        if (tempBrush.length - 1 !== 2) {
          // console.log('Make sure a brush selects 2 and only 2 lines.');

          // Emit error message pop-up
          errorMsg = 'Make sure a brush selects 2 and only 2 lines. Redraw brushes.';
          eventBus.$emit('add-notification', errorMsg, 'error');

          return false;
        }
      }

      // Reduce keys to a non-nested array
      const keys = [];

      for (let i = 0, len = selected.length; i < len; i += 1) {
        for (let j = 0, L = selected[i].length - 1; j < L; j += 1) {
          // Check that each brush selects more than one point per curve
          // Leverberg Marquardt cannot fit arrays of length = 1
          if (selected[i][j][2].x.length < 2) {
            // console.log('Select more than 1 data point per curve.');

            // Emit error message pop-up
            errorMsg = 'Select more than 1 data point per curve. Redraw brushes.';
            eventBus.$emit('add-notification', errorMsg, 'error');

            return false;
          }

          keys.push(selected[i][j][0]);
        }
      }

      // If none of the items in keys matches to lineNames,
      // set to true because not all lines have been selected in brushes
      for (let i = 0, len = this.filesSelected.length; i < len; i += 1) {
        if (keys.indexOf(this.filesSelected[i]) === -1) {
          // console.log(`${this.filesSelected[i]} was not selected.
          // Make sure each line is selected.`);

          // Emit error message pop-up
          errorMsg = `${this.filesSelected[i]} was not selected. Make sure each line is selected. Redraw brushes.`;
          eventBus.$emit('add-notification', errorMsg, 'error');

          return false;
        }
      }

      return true;
    },
  },
};
