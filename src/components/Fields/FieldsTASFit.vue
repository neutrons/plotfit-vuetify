<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Fields from './Fields';

export default {
  name: 'FieldsTASFit',
  extends: Fields,
  computed: {
    ...mapGetters('TAS/Fit', [
      'getFields',
    ]),
    ...mapState('TAS/Fit', {
      field: state => state.field,
    }),
    selectX: {
      get() {
        return this.field.x;
      },
      set(value) {
        const obj = { x: value, y: this.selectY };
        this.changeFields(obj);
      },
    },
    selectY: {
      get() {
        return this.field.y;
      },
      set(value) {
        const obj = { x: value, y: this.selectY };
        this.changeFields(obj);
      },
    },
  },
  methods: {
    ...mapMutations('TAS/Fit', [
      'changeFields',
    ]),
  },
};
</script>