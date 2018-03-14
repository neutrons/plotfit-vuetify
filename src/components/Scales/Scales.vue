<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Scales</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-select label='X Scale' :items='xScales' v-model='selectX' hint='Select X Scale'>
          </v-select>

          <v-select label='Y Scale' :items='yScales' v-model='selectY' hint='Select Y Scale'>
          </v-select>

          <v-tooltip top :close-delay='1'>
            <v-btn slot='activator' block outline @click='resetPlotScales' color='warning'>
              <v-icon left>fa-undo</v-icon>
              <span>Reset Scales</span>
            </v-btn>
            <span>Click to reset plot scales</span>
          </v-tooltip>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
export default {
  name: 'Scales',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
