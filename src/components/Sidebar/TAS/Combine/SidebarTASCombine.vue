<template>
<v-expansion-panel expand>
  <v-expansion-panel-content :value='true'>
    <div slot='header' class='title'>Files to Combine</div>
    <v-container>
      <v-layout row wrap>
        <v-alert 
          outline
          type='warning'
          :value='typeof isDefaultFieldsDifferent === "string"'
          transition='fade-transition'
          icon='fa-exclamation-triangle'
          class='pa-2'
        >{{ isDefaultFieldsDifferent }}</v-alert>
        <v-flex xs12>
          <v-filter-list />
        </v-flex>
        <v-flex xs12>
          <v-combine-add :files='fileList' />
        </v-flex>
        <v-flex xs12>
          <v-combine-subtract :files='fileList' />
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>

  <v-scales v-if='selectedData.length' />

  <v-fields v-if='selectedData.length' />

  <v-expansion-panel-content :value='true' v-if='selectedData.length > 1'>
    <div slot='header' class='title'>Normalize</div>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-combine-normalize />
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>

  <v-expansion-panel-content :value='true' v-if='selectedData.length > 1 && isNormalized'>
    <div slot='header' class='title'>Combine</div>
    <v-container>
      <v-layout row>        
        <v-flex xs12>
          <v-combine-tolerance />
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
import CombineAdd from '../../../CombineData/Add/AddTAS';
import CombineSubtract from '../../../CombineData/Subtract/SubtractTAS';
import FilterList from '../../../FileExplorer/FilterList/FilterListTASCombine';
import CombineNormalize from '../../../CombineData/Normalize/NormalizeTAS';
import CombineTolerance from '../../../CombineData/Tolerance/ToleranceTAS';
import Fields from '../../../Fields/FieldsTASCombine';
import Scales from '../../../Scales/ScalesTASCombine';

export default {
  name: 'SidebarTASCombine',
  components: {
    'v-combine-add': CombineAdd,
    'v-combine-subtract': CombineSubtract,
    'v-filter-list': FilterList,
    'v-combine-normalize': CombineNormalize,
    'v-combine-tolerance': CombineTolerance,
    'v-fields': Fields,
    'v-scales': Scales,
  },
  computed: {
    ...mapState('TAS/Combine', {
      selectedData: state => state.selectedData,
      isNormalized: state => state.isNormalized,
    }),
    ...mapGetters('TAS/Combine', [
      'isDefaultFieldsDifferent',
    ]),
    allFiles() {
      return Object.assign({}, this.fetched, this.uploaded);
    },
    fileList() {
      return _.uniq(Object.keys(this.allFiles));
    },
    uKeys() {
      return Object.keys(this.uploaded);
    },
    uTags() {
      if (!this.uKeys.length) return [];
      return this.uKeys.map(el => this.uploaded[el].tags)
        .reduce((a, b) => a.concat(b));
    },
    fKeys() {
      return Object.keys(this.fetched);
    },
    fTags() {
      if (!this.fKeys.length) return [];
      return this.fKeys.map(el => this.fetched[el].tags)
        .reduce((a, b) => a.concat(b));
    },
    allTags() {
      if (!this.fTags.length && !this.uTags.length) return [];

      return this.fTags.concat(this.uTags);
    },
  },
};
</script>

<style lang='scss'>

</style>
