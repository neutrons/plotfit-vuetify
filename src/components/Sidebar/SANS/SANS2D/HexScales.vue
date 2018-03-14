<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Intensity Scale</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-select label='Intensity Scale' :items='scales' v-model='editHexScale'></v-select>
          <v-tooltip top :close-delay='1'>
            <v-btn slot='activator' block outline @click='resetS' color='warning'>
              <v-icon left>fa-undo</v-icon> Reset Scale
            </v-btn>
            <span>Click to reset hexbin scale</span>
          </v-tooltip>
        </v-flex>

      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'HexScales',
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('SANS/SANS2D', {
      scales: state => state.scales,
      hexScale: state => state.hexScale,
    }),
    editHexScale: {
      get() {
        return this.hexScale;
      },
      set(value) {
        this.setScale(value);
      },
    },
  },
  methods: {
    ...mapMutations('SANS/SANS2D', [
      'resetScale',
      'setScale',
    ]),
    resetS() {
      this.resetScale();
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
