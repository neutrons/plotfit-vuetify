<template>
  <div>
    <!-- File List -->
    <v-file-explorer />

    <!-- Scales -->
    <v-scales v-if='filesSelected.length' />

    <!-- Fields -->
    <v-fields v-if='filesSelected.length' />

    <!-- Fit Equation Editor -->
    <v-fit-equation :collapse='false' :multiple-equations='true' v-if='fileToFit' />

    <!-- Levenberg Settings -->
    <v-fit-settings v-if='fileToFit' />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import FileExplorer from '../../../FileExplorer/FileExplorerTAS';
import Scales from '../../../Scales/ScalesTAS';
import Fields from '../../../Fields/FieldsTASFit';
import FitSettings from '../../../FitSettings/FitSettingsTAS';
import FitEquation from '../../../FitEquations/FitEquationTAS';

export default {
  name: 'SidebarTASFit',
  components: {
    'v-file-explorer': FileExplorer,
    'v-scales': Scales,
    'v-fields': Fields,
    'v-fit-equation': FitEquation,
    'v-fit-settings': FitSettings,
  },
  computed: {
    ...mapState('TAS/Fit', {
      fileToFit: state => state.fileToFit,
      filesSelected: state => state.filesSelected,
    }),
  },
};
</script>

<style lang='scss' scoped>

</style>
