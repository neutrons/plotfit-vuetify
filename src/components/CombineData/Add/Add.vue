<template>
  <v-select label='Add Signal' 
    ref='addSignal'
    :items='filteredFiles'
    v-model='selected'
    :multiple='multiple'
    max-height='250'
    autocomplete
    chips
    deletable-chips
    hide-selected
    hint='Pick a file to plot'
    :placeholder='filteredFiles.length ? "Select signal to add" : "Fetch or Upload files"'
    :disabled='filteredFiles.length === 0'
    @change='$refs.addSignal.isActive = $event.length > 1'>
  </v-select>
</template>

<script>
export default {
  name: 'AddSignal',
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    fileKeys() {
      return Object.keys(this.allFiles);
    },
    excludedSubtracted() {
      // exclude files to subtract from add list
      // makes no sense to subtract and add the same file
      if (!this.filesToSubtract.length) return this.fileKeys;

      const temp = [];
      this.fileKeys.forEach((file) => {
        if (this.filesToSubtract.indexOf(file) === -1) {
          temp.push(file);
        }
      });

      return temp;
    },
    filteredFiles() {
      const vm = this;

      if (!this.filters.length) return this.excludedSubtracted;

      const temp = [];

      this.filters.forEach((tag) => {
        vm.excludedSubtracted.forEach((name) => {
          if (this.allFiles[name].tags.indexOf(tag) > -1) {
            temp.push(name);
          }
        });
      });

      return temp;
    },
  },
};
</script>

<style lang='scss'>

</style>
