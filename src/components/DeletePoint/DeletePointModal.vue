<template>
<v-dialog persistent v-model='showDialog' max-width='300' transition='slide-y-transition'>
    <v-card class='text-xs-center elevation-5'>
      <v-card-title class='secondary white--text'>
        <div class='headline'>Delete point</div>
      </v-card-title>

      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <p>Deleting point cannot be <em>undone</em>. Continue?</p>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline color='error' @click='$emit("cancel")'>
          Cancel
        </v-btn>

        <v-btn outline color='success' @click='$emit("delete")'>
          Delete Point
        </v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
  name: 'DeleteModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showDialog() {
      return this.show;
    },
  },
};
</script>