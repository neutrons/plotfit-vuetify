<template>
<v-tooltip top :close-delay='1' :disabled='disable'>
  <v-btn slot='activator' flat small :icon='isBreakpointSmall' @click='$emit("remove-stitch")' :disabled='disable'>
    <span class='hidden-md-and-down'>Remove Stitched Curve</span>
    <v-icon :right='!isBreakpointSmall'>remove</v-icon>
  </v-btn>
  <span>Click to remove stitched curve</span>
</v-tooltip>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'RemoveStitchButton',
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