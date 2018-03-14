<template>
<v-tooltip top :close-delay='1' :disabled='disable'>
  <v-btn slot='activator' flat small :icon='isBreakpointSmall' @click='goToEdit' :disabled='disable'>
    <span class='hidden-md-and-down'>Edit Chart</span>
    <v-icon :right='!isBreakpointSmall'>fa-pencil-square</v-icon>
  </v-btn>
  <span>Click to edit and save chart.</span>
</v-tooltip>
</template>

<script>
import isBreakpointSmall from '../../../assets/js/isBreakpointSmall';

export default {
  name: 'EditChartButton',
  props: {
    disable: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [
    isBreakpointSmall,
  ],
  methods: {
    goToEdit() {
      const routeData = this.$router.resolve({ name: 'EditChart', query: { editChartData: this.editChartData } });
      window.open(routeData.href, '_blank');
    },
  },
};
</script>