<template>
    <v-select label='Fit' 
      ref='fitList'
      :items='filesToFit'
      v-model='selected'
      autocomplete
      chips
      deletable-chips
      :placeholder='filesToFit.length ? "Select a file to fit" : "No files to fit"'
      hint='Pick a file to fit'
      max-height='250'
      :disabled='!filesToFit.length'
      @change='$refs.fitList.isActive = $event.length > 1'>
    </v-select>
</template>

<script>
export default {
  name: 'FitList',
  watch: {
    filesToFit() {
      if (!this.filesToFit.length) {
        this.selected = null;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
