<template>
<v-tooltip top :close-delay='1' :disabled='disable'>
  <v-btn slot='activator' flat small @click='$emit("reset-chart")' :disabled='disable' :icon='isBreakpointSmall'>
    <span class='hidden-md-and-down'>Reset Plot</span>
    <v-icon :right='!isBreakpointSmall' small>fa-undo</v-icon>
  </v-btn>
  <span>Click to reset/unzoom plot to default state</span>
</v-tooltip>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'ResetChartButton',
  mixins: [
    isBreakpointSmall,
  ],
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
