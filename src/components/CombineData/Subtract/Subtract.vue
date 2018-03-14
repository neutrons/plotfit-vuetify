<template>
  <v-select label='Subtract Background' 
    ref='addBackground'
    :items='filteredFiles'
    v-model='selected'
    :multiple='multiple'
    max-height='250'
    autocomplete
    chips
    deletable-chips
    hide-selected
    :placeholder='filteredFiles.length ? "Select background to subtract" : "Fetch or Upload files"'
    hint='Pick a file to plot'
    :disabled='filteredFiles.length === 0'
    @change='$refs.addBackground.isActive = $event.length > 1'>
  </v-select>
</template>

<script>
export default {
  name: 'AddBackground',
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
    excludedAdd() {
      // exclude files to add from subtract list
      // makes no sense to subtract and add the same file
      if (!this.filesToAdd.length) return this.fileKeys;

      const temp = [];
      this.fileKeys.forEach((file) => {
        if (this.filesToAdd.indexOf(file) === -1) {
          temp.push(file);
        }
      });

      return temp;
    },
    filteredFiles() {
      const vm = this;

      if (!this.filters.length) return this.excludedAdd;

      const temp = [];

      this.filters.forEach((tag) => {
        vm.excludedAdd.forEach((name) => {
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
