/**
  *  ktable
  *  @tableSource => el-tabel props
  *  @columns => el-table-column props
  *  @pagingConfig => el-pagination props
 */

<script>
export default {
  name: "KTable",
  props: {
    tableSource: {
      type:Object,
      default: function() {
        return {};
      }
    },
    
    data:{
      type:Array,
      default:() => []
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    pagingConfig: {
      type: Object
    },
    currentPage: Number,
    total: Number,
    limit: Number
  },
  render(h) {
    return h("div", {
      class:{
        'k-table':true
      }
    }, [
      this.renderTable(h),
      this.total ? this.renderPagination(h) : ""
    ]);
  },

  methods: {
    renderPagination(h) {
      return h("el-pagination", {
        props: {
          layout: "total,sizes,prev, pager, next, jumper",
          "page-size": this.limit || 20,
          "page-sizes": this.limit ? [5,10,20,50,100] : [20],
          currentPage: this.currentPage,
          total: this.total,
          ...this.pagingConfig
        },
        on: {
          "size-change": val => {
            this.$emit("size-change", val);
          },
          "current-change": val => {
            this.$emit("current-change", val);
          },
          "update:currentPage": val => {
            this.$emit("update:currentPage", val);
          }
        }
      });
    },
    renderTable(h) {
      const columns = this.columns.filter(row => !row.hidden)
      return h(
        "el-table",
        {
          props: {
            ...this.tableSource,
            // border: true,
            data:this.data
          },
          on: {
            "selection-change": val => {
              this.$emit("selection-change", val);
            },
            "sort-change": val =>{
              this.$emit("sort-change",val);
            }
          }
        },
        [
          ...columns.map(column => {
            if (column.render) {
              return h("el-table-column", {
                props: {
                  ...column
                },

                scopedSlots: {
                  default: props => {
                    return column.render(h, props);
                  }
                }
              });
            } else {
              return h("el-table-column", {
                props: {
                  ...column
                }
              });
            }
          })
        ]
      );
    }
  }
};
</script>
<style lang="less" type="text/less" scoped>
.k-table{
  .el-pagination{
    text-align: right;
    margin-top: 10px;
  }
}
</style>