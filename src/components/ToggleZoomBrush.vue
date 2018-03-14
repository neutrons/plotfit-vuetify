<template>
<v-tooltip top :close-delay='1' :disabled='filesSelected.length < 2'>
  <v-btn slot='activator' flat small :icon='isBreakpointSmall' @click='toggle = !toggle' :disabled='filesSelected.length < 2'>
    <span class='hidden-md-and-down'>{{ !isZoomBrush ? 'Zoom' : 'Select'}}</span>
    <v-icon :right='!isBreakpointSmall'>{{ !isZoomBrush ? 'zoom_in' : 'crop_free' }}</v-icon>
  </v-btn>
  <span>Click to enable {{ !isZoomBrush ? 'zoom' : 'selection'}}</span>
</v-tooltip>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';
import { eventBus } from '../assets/js/eventBus';

export default {
  name: 'ToggleZoomBrush',
  mixins: [
    isBreakpointSmall,
  ],
  computed: {
    ...mapState('SANS/Stitch', {
      isZoomBrush: state => state.isZoomBrush,
      filesSelected: state => state.filesSelected,
    }),
    toggle: {
      get() {
        return this.isZoomBrush;
      },
      set(value) {
        if (this.filesSelected.length > 1) {
          this.$emit('toggle-edit', value);
        } else {
          const errorMsg = 'Need two or more lines to select.';
          eventBus.$emit('add-notification', errorMsg, 'error');
        }
      },
    },
    label() {
      return this.toggle ? 'Zoom' : 'Brush';
    },
  },
  methods: {
    ...mapMutations('SANS/Stitch', [
      'toggleZoomBrush',
    ]),
  },
};
</script>

<style lang='scss' scoped>
</style>