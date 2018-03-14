<template>
<v-tooltip top :close-delay='1' :disabled='disable'>
  <v-btn slot='activator' small flat :disabled='disable' :icon='isBreakpointSmall' @click='$emit("stitch-data")'>
    <span class='hidden-md-and-down'>Stitch</span>
    <v-icon :right='!isBreakpointSmall'>fa-line-chart</v-icon>
  </v-btn>
  <span>Click to add stitched curve</span>
</v-tooltip>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'StitchButton',
  props: {
    disable: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [
    isBreakpointSmall,
  ],
};
</script>

<style lang='scss' scoped>
</style>