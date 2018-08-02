<template>
  <page>
    <el-row slot="header">
      <el-col :span="20">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>投诉列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-form inline>
      <k-form-item label="用户名"
                   v-model="queryParams.userName"></k-form-item>
      <k-form-item label="手机号"
                   v-model="queryParams.mobile"></k-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="search">检索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <k-table :columns="columns"
             :total="total"
             @current-change="handleCurrentChange"
             @size-change="sizeChange"
             :limit="tableParams.limit"
             :currentPage="tableParams.page"
             :data="tableData"></k-table>
  </page>
</template>
<script>
import { mixin } from "@/mixins/search";
import { feedbackApi } from "@/api";
export default {
  mixins: [mixin],
  data() {
    return {
      queryParams: {
        userName: "",
        mobile: ""
      },
      tableData: [],
      columns: [
        {
          label: "ID",
          prop: "applyUserId"
        },
        {
          label: "用户昵称",
          prop: "applyUserName"
        },
        {
          label: "提交时间",
          prop: "applyTime",
          formatter: (row) => this.moment(row.applyTime).format('YYYY-MM-DD HH:mm')
        },
        {
          label: "反馈内容",
          prop: "content"
        },
      ]
    };
  },
  methods: {
    async getList(
      params = Object.assign({}, this.tableParams, this.queryParams)
    ) {
      try {
        const { items, total } = await feedbackApi.query(params);
        this.tableData = items;
        this.total = total;
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    },
  }
};
</script>

