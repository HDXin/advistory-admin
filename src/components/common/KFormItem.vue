<script>
export default {
  name: "KFormItem",
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    },
    type: {
      type: String,
      default: "input"
    },
    options: {
      type: Array
    },
    value: null,
    itemConfigs: Object,
    disabled: Boolean,
    placeholder: String
  },
  render(h) {
    return h(
      "el-form-item",
      {
        props: {
          label: this.label,
          prop: this.prop
        }
      },
      [
        h(
          `el-${this.type}`,
          {
            on: {
              input: val => {
                this.propValue = val;
                this.$emit("input", val);
                this.$emit("change", val);
              }
            },
            props: {
              value: this.propValue,
              disabled: this.disabled,
              placeholder: this.placeholder,
              ...this.itemConfigs
            }
          },
          [this.$slots.default]
        )
      ]
    );
  },
  computed: {
    propValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
        this.$emit("change", newValue);
      }
    }
  },
  methods: {
    renderOptions(h) {
      return this.options.map(option => {
        return h("el-option", {
          props: {
            label: option.label,
            value: option.value
          }
        });
      });
    }
  }
};
</script>
