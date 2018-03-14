<template>
  <div>
    <!-- File List -->
    <v-file-explorer :collapse='false' />

    <!-- Scales -->
    <v-scales v-if='isFilesPlotted' />
    
    <!-- Transformations -->
    <v-transformations v-if='isFilesPlotted' />

    <!-- Fit Equation Editor -->
    <v-fit-equation :collapse='false' v-if='isFileFit' />

    <!-- Levenberg Settings -->
    <v-fit-settings v-if='isFileFit' />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FileExplorer from '../../../FileExplorer/FileExplorerSANS1D';
import Scales from '../../../Scales/ScalesSANS1D';
import Transformations from '../../../Transformations/TransformationsSANS1D';
import FitSettings from '../../../FitSettings/FitSettingsSANS1D';
import FitEquation from '../../../FitEquations/FitEquationSANS';

export default {
  name: 'SidebarSANSFit',
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-transformations': Transformations,
    'v-fit-settings': FitSettings,
    'v-fit-equation': FitEquation,
  },
  computed: {
    ...mapGetters('SANS/Fit', [
      'isFilesPlotted',
      'isFileFit',
    ]),
  },
};
</script>

<style lang='scss' scoped>

</style>
