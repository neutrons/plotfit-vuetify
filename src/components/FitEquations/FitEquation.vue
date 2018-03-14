<template>
  <v-expansion-panel flat>
    <v-expansion-panel-content :value='!collapse'>
      <div slot='header' class='title'>Fit Configuration</div>

      <v-card>
        <v-card-text class='pb-0'>
          <v-tooltip top :close-delay='1'>
            <v-btn slot='activator' block outline @click='fitData' color='success' :disabled='isFitting || !isAllValid'>
              <span>{{ isFitting ? 'Fitting...' : 'Perform Fit' }}</span>
            </v-btn>
            <span>Click to fit</span>
          </v-tooltip>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-text class='pb-0'>             
          <v-layout row wrap v-for='(item, index) in selected' :key='index'>
            <v-flex xs2 v-if='multipleEquations'>
              <v-btn small flat icon color='success' @click='addEquation(fitKeys[0])' v-if='index === 0'>
                <v-icon>add_circle</v-icon>
              </v-btn>

              <v-btn small flat icon color='error' @click='removeEquation(index)' v-else>
                <v-icon>cancel</v-icon>
              </v-btn>
            </v-flex>

            <v-flex :class='multipleEquations ? "xs10" : "xs12"'>
              <v-subheader class='pl-0 pr-2 mb-3' @click='toggleShowEquation(index)' style='cursor: pointer; border-bottom: 1px solid grey; height: 30px;'>
                <span>Fit #{{ index + 1 }}</span>
                <v-spacer></v-spacer>
                <span><i :class='showEquation[index] ? "fa fa-angle-up" : "fa fa-angle-down"'></i></span>
              </v-subheader>
            </v-flex>

            <v-flex xs12>
              <v-slide-y-transition>
                <div v-show='showEquation[index]'>
                  <v-select
                    v-if='index === 0'
                    :items='fitKeys'
                    @input='updateSelect($event, index)'
                    :value='selected[index].name'
                    label='Fit Type'
                  ></v-select>
                  
                  <v-select
                    v-else
                    :items='fitKeys'
                    @input='updateSelect($event, index)'
                    :value='selected[index].name'
                    label='Fit Type'
                  ></v-select>
                  
                  <v-text-field
                    label='Fit Equation'
                    :value='selected[index].equation'
                    @input='equationInput($event, index)'
                    :error='!item.valid'
                    :hint='item.valid ? "" : "Invalid equation."'
                    placeholder='Type an equation'
                  ></v-text-field>
                  
                  <v-subheader class='pl-0 pr-0 mb-3' @click='toggleShowIV(index)' style='cursor: pointer; border-bottom: 1px solid grey; height: 30px;'>Initial Values
                    <v-spacer></v-spacer>
                    <span><i :class='showIV[index] ? "fa fa-angle-up" : "fa fa-angle-down"'></i></span>
                  </v-subheader>

                  <v-slide-y-transition>
                    <div v-show='showIV[index]'>
                      <v-text-field
                        v-for='(iv, i) in item.initialValues'
                        :key='i'
                        :prepend-icon='pickIndex === index && i === pickIvIndex ? "cancel" : "fa-crosshairs"'
                        :prepend-icon-cb='() => pickIndex === index && i === pickIvIndex ? togglePick(false, index, i) : togglePick(true, index, i)'
                        :append-icon='iv.constant ? "fa-circle constant" : "fa-circle non-constant"'
                        :append-icon-cb='() => setCoefficientConstant({ index, ivIndex: i, value: !iv.constant })'
                        type='number'
                        :label='iv.coefficient'
                        :value='iv.value'
                        @input='coefficientInput({index, value: $event, ivIndex: i})'
                      ></v-text-field>
                    </div>
                  </v-slide-y-transition>
                </div>
              </v-slide-y-transition>
            </v-flex>                
          </v-layout>
        </v-card-text>
        
        <v-card-text>
          <v-subheader class='pl-0'>Final Equation:</v-subheader>
          <p>y = {{ finalEquation }}</p>
          <v-divider></v-divider>
        </v-card-text>
      </v-card>

    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import _ from 'lodash';
import math from 'mathjs';
import Vue from 'vue';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'FitEquation',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
    multipleEquations: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      pickIndex: null,
      pickIvIndex: null,
      showEquation: [],
      showIV: [],
    };
  },

  created() {
    this.addEquation(this.fitKeys[0]);

    // trigger perform fit for first time for SANS
    if (this.$options.name === 'FitEquationSANS') {
      this.setFitType(this.selected[0].name);
      this.fitData();
    }
  },

  computed: {
    fitKeys() {
      return Object.keys(this.fits);
    },
    items() {
      const obj = {};
      this.fitKeys.forEach((key) => {
        obj[key] = {
          name: key,
          equation: this.fits[key].equation,
          initialValues: this.fits[key].initialValues,
          valid: true,
        };
      });

      return obj;
    },
    isAllValid() {
      for (let i = 0, length = this.selected.length; i < length; i += 1) {
        if (!this.selected[i].valid) return false;
      }

      return true;
    },
  },

  methods: {
    evaluateInitialGuess(payload) {
      const initialValues = payload.initialValues;
      const keys = Object.keys(initialValues);
      const length = keys.length;

      for (let i = 0; i < length; i += 1) {
        const guess = initialValues[keys[i]].value;
        // if initial value is a string estimate value
        if (typeof guess === 'string') {
          const result = this.computeGuess(guess, this.splitFitData);
          payload.initialValues[keys[i]].value = result; // eslint-disable-line
        }
      }

      return payload;
    },
    computeGuess(guess, data) {
      let result;

      try {
        const equation = math.compile(guess);

        result = guess === '' ? 1 : equation.eval(data);

        // Catch that result is not an array for cases when user enters 'x+1'
        // Math.JS treats that as operating on an array, so there isn't a reduced value
        if (Array.isArray(result)) {
          // eslint-disable-next-line
          throw 'Function must return a single value, not an array.';
        } else {
          return result;
        }
      } catch (error) {
        // If an error occurs when altering initial values send it to error function
        eventBus.$emit('add-notification', error, 'warning');
        return 1;
      }
    },
    updateSelect(name, index) {
      const temp = this.evaluateInitialGuess(_.cloneDeep(this.items[name]));

      // commit mutation to update selected
      this.updateSelectAtIndex({ index, temp });
      this.setFitType(name);
      // if SANS automatically fit since one selection only
      if (this.$options.name === 'FitEquationSANS') this.fitData();

      // if tas revise line with changes to equation
      if (this.$options.name === 'FitEquationTAS') eventBus.$emit('revise-fit-line-TAS', this.fitInitialValues);
    },
    addEquation(name) {
      const temp = this.evaluateInitialGuess(_.cloneDeep(this.items[name]));

      this.addToSelect(temp);

      // if tas revise line with changes to equation
      if (this.$options.name === 'FitEquationTAS') eventBus.$emit('revise-fit-line-TAS', this.fitInitialValues);

      this.showEquation.push(true);
      this.showIV.push(true);
    },
    removeEquation(index) {
      this.removeSelectAtIndex(index);

      // if tas revise line with changes to equation
      if (this.$options.name === 'FitEquationTAS') eventBus.$emit('revise-fit-line-TAS', this.fitInitialValues);
      this.showEquation.splice(index, 1);
      this.showIV.splice(index, 1);
    },
    getParameters(value) {
      // Parse the string
      const parsed = math.parse(value);

      const parameters = parsed
        .filter(node => node.isSymbolNode && node.name !== 'x')
        .map(node => node.name);

      return _.uniq(parameters);
    },
    checkEquation(exp) {
      if (exp === '') {
        return false;
      }

      try {
        math.compile(exp);
      } catch (error) {
        return false;
      }

      return true;
    },
    compareParameters(oldParameters, newParameters, index) {
      if (!_.isEqual(oldParameters, newParameters)) {
        // remove or add parameters
        const deleteKeys = oldParameters.filter(d => newParameters.indexOf(d) === -1);
        const addKeys = newParameters.filter(d => oldParameters.indexOf(d) === -1);

        if (deleteKeys.length) this.deleteParameters(index, deleteKeys);
        if (addKeys.length) this.addParameters(index, addKeys, newParameters);
      }
    },
    deleteParameters(index, keys) {
      this.removeInitialValues({ index, keys });
    },
    addParameters(index, keys, newParameters) {
      this.addInitialValues({ index, keys, newParameters });
    },
    equationInput(exp, index) {
      if (this.checkEquation(exp)) {
        this.setSelectValid({ index, value: true });
        this.setSelectEquation({ index, equation: exp });

        const oldParameters = this.selected[index].initialValues.map(d => d.coefficient);
        const newParameters = this.getParameters(exp);
        this.compareParameters(oldParameters, newParameters, index);
      } else {
        this.setSelectValid({ index, value: false });
      }
    },
    resetPickIndex() {
      this.pickIndex = null;
      this.pickIvIndex = null;
    },
    toggleShowEquation(index) {
      Vue.set(this.showEquation, index, !this.showEquation[index]);
    },
    toggleShowIV(index) {
      Vue.set(this.showIV, index, !this.showIV[index]);
    },
  },
};
</script>

<style lang='scss'>
.fa-circle.non-constant {
  color: green !important;
  font-size: 100%;
}

.fa-circle.constant {
  color: brown !important;
  font-size: 100%;
}
</style>