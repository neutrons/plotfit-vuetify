<template>
<v-list dense>
  <template v-for='(item, index) in metadata'>
    <v-list-tile>
      <v-list-tile-content>
        <div>
          <span v-for='(n, i) in item.split(" = ")'>
            <span v-if='i === 0 && item.split(" = ").length != 1'><strong>{{ n }}</strong> = </span>
            <span v-else>{{ n }}</span>
          </span>
        </div>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
  </template>
</v-list>
</template>

<script>
export default {
  name: 'MetadataTable',
  props: {
    metadata: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>