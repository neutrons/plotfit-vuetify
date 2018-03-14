<template>
<div>
  <v-tooltip top :close-delay='1'>
    <v-select
      slot='activator'
      label='Normalize Variable'
      hide-selected
      chips
      v-model='editNormalizeField'
      :items='normalizeOptions'
    ></v-select>
    <span>Select variable to normalize y axis</span>
  </v-tooltip>

  <v-tooltip top :close-delay='1'>
    <v-text-field
      slot='activator'
      label='Normalize To'
      type='number'
      v-model.number='editNormalizeValue'
      :step='defaultSettings.normalize.increment'
      required
      :rules='[checkValue]'
    ></v-text-field>
    <span>Type a value to normalize y axis to</span>
  </v-tooltip>

  <v-tooltip top :close-delay='1' :disabled='isNormalized || !valid'>
    <v-btn slot='activator' outline block flat color='success' @click='normalizeData' :disabled='isNormalized || !valid'>Normalize Data</v-btn>
    <span>Click to normalize data</span>
  </v-tooltip>
  <v-tooltip top :close-delay='1' :disabled='!isNormalized || !valid'>
    <v-btn slot='activator' outline block flat color='warning' @click='resetNormalizeData' :disabled='!isNormalized || !valid'>Reset Data</v-btn>
    <span>Click to reset normalized data</span>
  </v-tooltip>
</div>
</template>

<script>
export default {
  name: 'Normalize',
  data() {
    return {
      valid: true,
    };
  },
  methods: {
    checkValue(value) {
      if (typeof value !== 'number') {
        this.valid = false;
        return 'Must be a number';
      } else if (value === 0) {
        this.valid = false;
        return 'Must not equal 0. Divide by zero.';
      }

      this.valid = true;
      return true;
    },
  },
};
</script>
