<template>
<div>
  <v-text-field
    type='number'
    label='Tolerance Bin'
    v-model.number='editTolerance'
    :step='defaultSettings.tolerance.increment'
    :min='defaultSettings.tolerance.value'
    required
    hint='Type value for bin tolerance range'
    :rules='[checkValue]'
  ></v-text-field>

  <v-tooltip top :close-delay='1' :disabled='!valid'>
    <v-btn slot='activator' outline block flat color='success' @click='initCombineData' :disabled='!valid'>Combine Data</v-btn>
    <span>Click to combine data</span>
  </v-tooltip>
  <v-tooltip top :close-delay='1' :disabled='!combData.length || !valid'>
    <v-btn slot='activator' outline block flat color='error' @click='removeCombineData' :disabled='!combData.length || !valid'>Remove Combine Data</v-btn>
    <span>Click to remove combined data</span>
  </v-tooltip>

  <v-fade-transition>
    <div v-if='combData.length'>
      <v-text-field
        type='text'
        label='Combine Name'
        v-model='editCombineName'
        required
        hint='Type name of combined data curve'
        :rules='[checkName]'
      ></v-text-field>

      <v-tooltip top :close-delay='1' :disabled='!validName'>
        <v-btn slot='activator' outline block flat color='success' @click='storeCombine' :disabled='!validName'>Store Combine</v-btn>
        <span>Click to store combined data curve</span>
      </v-tooltip>
    </div>
  </v-fade-transition>
</div>
</template>

<script>
export default {
  name: 'Tolerance',
  data() {
    return {
      valid: true,
      validName: true,
      editCombineName: 'combined_data',
    };
  },
  methods: {
    checkValue(value) {
      if (typeof value !== 'number') {
        this.valid = false;
        return 'Must be a number';
      } else if (value < 0) {
        this.valid = false;
        return 'Must be greater than 0';
      }

      this.valid = true;
      return true;
    },
    checkName(value) {
      const str = value.trim();

      if (typeof str !== 'string') {
        this.validName = false;
        return 'Must be a string';
      } else if (str.length < 1) {
        this.validName = false;
        return 'Invalid name. Name must be 1+ characters long.';
      } else if (this.filenameList.indexOf(str) !== -1) {
        this.validName = false;
        return 'Duplice name. Name already exists.';
      } else if (str === 'combine') {
        this.validName = false;
        return 'Cannot name \'combine\'. Reserved word.';
      }

      this.validName = true;
      return true;
    },
  },
};
</script>
