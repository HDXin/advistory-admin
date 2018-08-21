<template>
  <el-dialog title="当日数据信息"
             :visible.sync="dialogVisible">
    <el-table :data="models">
      <el-table-column label="时间"></el-table-column>
      <el-table-column label="标的品种"></el-table-column>
      <el-table-column label="价格max"></el-table-column>
      <el-table-column label="价格min"></el-table-column>
      <el-table-column label="交易量"></el-table-column>
    </el-table>
    <div class="text-right">
      <el-button type="primary"
                 @click="add"
                 size="small"
                 style="margin-top: 15px">新增一条</el-button>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary">确认</el-button>
      <el-button type="primary">导入Excel</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      models: []
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    add() {
      this.models.push({});
    }
  }
};
</script>

