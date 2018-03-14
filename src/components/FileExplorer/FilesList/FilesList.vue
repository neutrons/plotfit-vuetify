<template>
    <v-select label='Files' 
      ref='filesList'
      :items='filteredFiles'
      v-model='selected'
      :multiple='multiple'
      max-height='250'
      autocomplete
      chips
      deletable-chips
      hide-selected
      hint='Pick a file to plot'
      :placeholder='filteredFiles.length ? "Select a file to plot" : "Fetch or Upload files"'
      :disabled='filteredFiles.length === 0'
      @change='$refs.filesList.isActive = $event.length > 1'>
    </v-select>
</template>

<script>
export default {
  name: 'FileList',
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
    filteredFiles() {
      const vm = this;

      if (this.filters.length === 0) {
        return this.fileKeys;
      }

      const temp = [];

      this.filters.forEach((tag) => {
        vm.fileKeys.forEach((name) => {
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

<style lang='scss' scoped>
</style>
