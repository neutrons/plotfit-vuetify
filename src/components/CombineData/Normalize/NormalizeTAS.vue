<script>
import { mapMutations, mapState } from 'vuex';
import Normalize from './Normalize';

export default {
  name: 'NormalizeTAS',
  extends: Normalize,
  computed: {
    ...mapState('TAS/Combine', {
      defaultSettings: state => state.defaultSettings,
      normalizeValue: state => state.normalizeValue,
      normalizeOptions: state => state.normalizeOptions,
      normalizeField: state => state.normalizeField,
      isNormalized: state => state.isNormalized,
    }),
    editNormalizeField: {
      get() {
        return this.normalizeField;
      },
      set(value) {
        this.setNormalizeField(value);
      },
    },
    editNormalizeValue: {
      get() {
        return this.normalizeValue;
      },
      set(value) {
        this.setNormalizeValue(value);
      },
    },
  },
  methods: {
    ...mapMutations('TAS/Combine', [
      'setNormalizeValue',
      'setNormalizeField',
      'normalizeData',
      'resetNormalizeData',
    ]),
  },
};

</script>