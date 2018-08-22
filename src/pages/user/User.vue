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
        <link-button to="/user/create"
                     size="small"
                     type="primary">新增</link-button>
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
                  to={`/user/edit/${row.userId}`}
                  size="small"
                  type="text"
                >
                  编辑
                </link-button>
                <el-button
                  type="text"
                  size="small"
                  class='text-warning'
                  onClick={() => this.resetPassword(row.userId)}
                >
                  重置密码
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  class={{'text-danger': row.userStatus === "ENABLE"}}
                  onClick={() => this.changeStatus(row)}
                >
                  {row.userStatus === "ENABLE" ? "禁用" : "启用"}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  class='text-danger'
                  onClick={() => this.removeUser(row.userId)}
                >
                  删除
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
        const { items, total } = await userApi.query(params);
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
          await userApi.disable({userId: row.userId});
        } else {
          await userApi.enable({userId: row.userId});
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
     async removeUser(id){
      try {
        await this.$confirm('是否确定删除？', "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        });
        await userApi.delete({userId: id})
        this.getList();
      } catch (error) {
        if (error === "cancel") return;
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    },
    async resetPassword(id){
      try {
          await this.$confirm(
            "是否确认重置密码？重置后密码将变为初始密码",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          );
          await userApi.resetPass({ userId: id });
          this.$message({
            message: "重置成功",
            type: "success"
          });
        } catch (error) {
          if (error === "cancel") return;
          this.$message({
            message: error.message,
            type: "error"
          });
        }
    }
  }
};
</script>

