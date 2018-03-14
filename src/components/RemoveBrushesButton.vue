<template>
<v-tooltip top :close-delay='1' :disabled='disable'>
  <v-btn slot='activator' flat small :icon='isBreakpointSmall' @click='$emit("remove-brushes", false)' :disabled='disable'>
    <span class='hidden-md-and-down'>Remove Selections</span>
    <v-icon :right='!isBreakpointSmall'>grid_off</v-icon>
  </v-btn>
  <span>Click to remove current selections</span>
</v-tooltip>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'RemoveBrushesButton',
  mixins: [
    isBreakpointSmall,
  ],
  props: {
    disable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>