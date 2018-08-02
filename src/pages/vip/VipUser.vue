<template>
  <page>
    <el-row slot="header">
      <el-col :span="20">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>会员用户</el-breadcrumb-item>
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
import { vipUserApi } from "@/api";
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
          label: "昵称",
          prop: "nickname"
        },
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
            label: '用户级别',
            prop: 'userType'
        },
        {
          label: "有效期",
          prop: "endTime"
        },
        {
          label: "首次登陆",
          prop: "endTime"
        },
        {
          label: "认证时间",
          prop: "beginTime"
        },
        {
          label: "最后登陆",
          prop: "endTime"
        },
        {
          label: "状态",
          formatter: row => {
            return row.userStatus === "ENABLE" ? "启用" : "禁用";
          }
        },
        {
          label: "操作",
          render: (h, { row }) => {
            return (
              <div>
                <link-button
                  to={`/vip/edit/${row.userId}`}
                  size="small"
                  type="text"
                >
                  编辑
                </link-button>
                <el-button
                  type="text"
                  size="small"
                  class={{'text-danger': row.userStatus === "ENABLE"}}
                  onClick={() => this.changeStatus(row)}
                >
                  {row.userStatus === "ENABLE" ? "禁用" : "启用"}
                </el-button>
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
        const { items, total } = await vipUserApi.query(params);
        this.tableData = items;
        this.total = total;
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    },
    async changeStatus(row) {
      const title = `是否${row.userStatus === "ENABLE" ? "禁用" : "启用"}?`;
      try {
        await this.$confirm(title, "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        });
        if (row.userStatus === "ENABLE") {
          await vipUserApi.disable({userId: row.userId});
        } else {
          await vipUserApi.enable({userId: row.userId});
        }
        this.getList();
      } catch (error) {
        if (error === "cancel") return;
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    },
  }
};
</script>

