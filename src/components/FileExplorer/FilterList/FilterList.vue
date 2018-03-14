<template>
    <v-select label='Filter' 
      ref='filterList'
      :items='tags'
      :values='selected'
      @input='updateFilters'
      multiple
      autocomplete
      max-height='250'
      chips
      deletable-chips
      :placeholder='tags.length ? "Select a tag to filter list" : "No tags available"'
      hint='Pick tags to filter files'
      :disabled='tags.length === 0'
      @change='$refs.filterList.isActive = $event.length > 1'>
    </v-select>
</template>

<script>
export default {
  name: 'FilterList',
  computed: {
    filenames() {
      return Object.keys(this.allFiles);
    },
    tags() {
      const temp = [];

      this.filenames.forEach((name) => {
        this.allFiles[name].tags.forEach((tag) => {
          if (temp.indexOf(tag) === -1) {
            temp.push(tag);
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
