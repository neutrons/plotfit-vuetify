<template>
  <v-expansion-panel>
    <v-expansion-panel-content :value='!collapse'>
      <div slot='header' class='title'>Levenberg Settings</div>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 pl-2>

            <v-slider :label='`Damping - ${editDamping.toFixed(1)}`'
              v-model='editDamping'
              @mouseup.native='setFitDamping(editDamping)'
              :step='defaultSettings.damping.increment'
              :min='defaultSettings.damping.min'
              :max='defaultSettings.damping.max'
              ticks
              thumb-label
            ></v-slider>

            <v-slider :label='`Gradient - ${editGradient.toFixed(1)}`'
              v-model='editGradient'
              @mouseup.native='setFitGradient(editGradient)'
              :step='defaultSettings.gradientDifference.increment'
              :min='defaultSettings.gradientDifference.min'
              :max='defaultSettings.gradientDifference.max'
              ticks
              thumb-label
            ></v-slider>

            <v-slider :label='`Iterations - ${editIterations}`'
              v-model='editIterations'
              @mouseup.native='setFitIterations(editIterations)'
              :step='defaultSettings.maxIterations.increment'
              :min='defaultSettings.maxIterations.min'
              :max='defaultSettings.maxIterations.max'
              ticks
              thumb-label
            ></v-slider>

            <v-slider :label='`Error - ${editError.toFixed(1)}`'
              v-model='editError'
              @mouseup.native='setFitError(editError)'
              :step='defaultSettings.errorTolerance.increment'
              :min='defaultSettings.errorTolerance.min'
              :max='defaultSettings.errorTolerance.max'
              ticks
              thumb-label
            ></v-slider>

            <v-tooltip top :close-delay='1'>
              <v-btn slot='activator' block outline @click='resetEditFitSettings' color='warning'>
                <v-icon left>fa-undo</v-icon>
                <span>Reset Levenberg</span>
              </v-btn>
              <span>Click to reset levenberg settings</span>
            </v-tooltip>

          </v-flex>
        </v-layout>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'FitSettings',
  created() {
    this.initEditValues();
  },
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      editDamping: null,
      editGradient: null,
      editIterations: null,
      editError: null,
    };
  },
  methods: {
    initEditValues() {
      this.editDamping = this.defaultSettings.damping.value;
      this.editGradient = this.defaultSettings.gradientDifference.value;
      this.editIterations = this.defaultSettings.maxIterations.value;
      this.editError = this.defaultSettings.errorTolerance.value;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
