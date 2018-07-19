<template>
  <page>
    <el-row slot="header">
      <el-col :span="20">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>运营平台用户</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4"
              class="text-right">
          <link-button to="/user/create" size="small" type="primary">新增</link-button>
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
             :limit="tableParams.limit"
             :currentPage="tableParams.page"
             :data="tableData"></k-table>
  </page>
</template>
<script>
import { mixin } from "@/mixins/search";
import { userApi } from "@/api";
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
          label: "用户名",
          prop: "userName"
        },
        {
          label: "手机号码",
          prop: "mobile"
        },
        {
          label: "性别",
          prop: "gender",
          formatter: row => {
            return row.gender ? "男" : "女";
          }
        },
        {
          label: "邮箱",
          prop: "email"
        },
        {
          label: "操作",
          render: (h, { row }) => {
            return (
              <div>
                <link-button to={`/user/edit/${row.userId}`} size="small" type="text"
                       tag="button">编辑</link-button>
              </div>
            );
          }
        }
      ]
    };
  },
  methods: {
    async getList(
      params = Object.assign({}, this.tableParams, this.queryParams)
    ) {
      try {
        const { items, total } = await userApi.query(params);
        this.tableData = items;
        this.total = total;
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    }
  }
};
</script>

