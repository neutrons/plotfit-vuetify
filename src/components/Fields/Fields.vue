<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Axes</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-select label='X Axes' :items='getFields' v-model='selectX' hint='Select X Variable'>
          </v-select>

          <v-select label='Y Axes' :items='getFields' v-model='selectY' hint='Select Y Variable'>
          </v-select>
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
export default {
  name: 'Fields',
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
