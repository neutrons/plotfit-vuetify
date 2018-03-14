<template>
<v-tooltip top :close-delay='1' :disabled='disable'>
  <v-btn slot='activator' flat small :icon='isBreakpointSmall' :disabled='disable' @click='$emit("draw-saved-brushes")'>
    <span class='hidden-md-and-down'>Draw Selections</span>
    <v-icon :right='!isBreakpointSmall'>border_color</v-icon>
  </v-btn>
  <span>Click to draw saved selections</span>
</v-tooltip>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'DrawBrushesButton',
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