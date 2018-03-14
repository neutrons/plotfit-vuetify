<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Bin Settings</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-slider :label='`Bin Size - ${editBinSize}`'
            v-model='editBinSize'
            @mouseup.native='setBS'
            :step='1'
            :min='1'
            :max='25'
            ticks
            thumb-label
            thumb-color='primary'
          ></v-slider>

          <v-tooltip top :close-delay='1'>
            <v-btn slot='activator' block outline @click='resetBS' color='warning'>
              <v-icon left>fa-undo</v-icon> Reset Bin Size
            </v-btn>
            <span>Click to reset bin size</span>
          </v-tooltip>
        </v-flex>

      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'HexBins',
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editBinSize: 15,
    };
  },
  methods: {
    ...mapMutations('SANS/SANS2D', [
      'setBinSize',
      'resetBinSize',
    ]),
    setBS() {
      this.setBinSize(this.editBinSize);
    },
    resetBS() {
      this.editBinSize = 15;
      this.resetBinSize();
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
