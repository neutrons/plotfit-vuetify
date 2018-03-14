<template>
<v-tooltip top :close-delay='1' :disabled='!stitchedData.length'>
  <v-dialog slot='activator' v-model='show' persistent max-width='50%'>
      <v-btn flat slot='activator' :disabled='!stitchedData.length'>
        <v-icon left v-if='isBreakpointSmall'>fa-floppy-o</v-icon>
        <span>Store Stitch</span>
        <v-icon right v-if='!isBreakpointSmall'>fa-floppy-o</v-icon>
      </v-btn>
    <v-card>
      <v-card-title class='green white--text'>
        <div class='headline'>Save stitched line?</div>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent='submit' v-model='valid' ref='form' lazy-validation>
          <v-text-field label='File Name' placeholder='e.g. file_name' v-model='name' :rules='nameRules' required suffix='_IQ.txt' class='mb-3'></v-text-field>

          <v-layout>
            <v-spacer></v-spacer>
            <v-btn @click='close' color='error' outline flat>cancel</v-btn>
            <v-btn @click='submit' :disabled='!valid' outline flat color='success'>
              submit
            </v-btn>
          </v-layout>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
  <span>Click to store stitched curve</span>
</v-tooltip>
</template>

<script>
import axios from 'axios';
import isBreakpointSmall from '../../assets/js/isBreakpointSmall';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'SaveStitchButton',
  mixins: [
    isBreakpointSmall,
  ],
  data() {
    return {
      show: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        this.validateFileName,
      ],
    };
  },
  methods: {
    close() {
      this.name = '';
      this.valid = true;
      this.show = false;
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.saveStitchLine(`${this.name}_IQ.txt`);
        this.close();
      }
    },
    validateFileName(value) {
      /* eslint-disable */
      const rg1 = /^[^\\/:\*\?'<>\|  .]+$/; // forbidden characters \ / : * ? ' < > |
      const rg2 = /^[0-9]/; // cannot start with a number ([0-9])
      const rg4 = /^[A-Za-z].*$/; // cannot start with a number ([0-9])
      const rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
      /* eslint-enable */

      if (!rg1.test(value)) {
        return 'Invalid character(s).';
      } else if (rg2.test(value)) {
        return 'Do not start files with a number.';
      } else if (rg3.test(value)) {
        return 'Invalid file name.';
      } else if (!rg4.test(value)) {
        return 'Start file names with a character.';
      } else if (value === 'stitch') {
        return 'Stitch is a reserved word. Give file another name.';
      }

      return true;
    },
    saveStitchLine(filename) {
      const vm = this;

      axios.post('/external/save', {
        method: 'post',
        data: {
          id: filename,
          content: vm.stitchedData,
        },
        headers: {
          'Content-Disposition': `attachment; filename=${filename}`,
        },
      })
      .then((response) => {
        if (response.status === 200) eventBus.$emit('add-notification', 'Save succesful!', 'success');

        // If posting stitch line works, store brush selections
        vm.saveBrushSelections();
        vm.saveBrushes();

        // console.log('Saved brushes:', savedBrushes);
        // console.log('-----------------------------')

        // console.log('Here are your saved brush selections:')
        // for(let key in savedSelections) {
        //     console.log('Key: ' + key);
        //     console.log(savedSelections[key]);
        //     console.log('---------------------------');
        // }

        // Then reset plot for next iteration of stitching
        // vm.brushObj.brushSelections = {};
        // vm.brushObj.brushes = [];
        // eventBus.$emit('reset-stitch');

        // Then fetch data to include the saved stitch file
        // eventBus.$emit('fetch-files');
      })
      .catch((error) => {
        const errorMSG = error;
        eventBus.$emit('add-notification', errorMSG, 'error');
      });
    },
  },
};
</script>

<style lang='scss' scoped>
</style>