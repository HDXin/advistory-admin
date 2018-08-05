<template>
  <page>
    <el-row slot="header">
      <el-col :span="20">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4" class="text-right">
          <!-- <link-button to="/system/create" type="primary" size="small">新增</link-button> -->
      </el-col>
    </el-row>
    <el-form inline>
      <k-form-item label="描述"
                   v-model="queryParams.description"></k-form-item>
      <!-- <k-form-item label="手机号"
                   v-model="queryParams.mobile"></k-form-item> -->
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
import { memberLevelApi } from "@/api";
export default {
  mixins: [mixin],
  data() {
    return {
      queryParams: {
        description: "",
        // mobile: ""
      },
      tableData: [],
      columns: [
        {
          label: "描述",
          prop: "description"
        },
        {
          label: "原价",
          prop: "originPrice"
        },
        {
          label: "折后价",
          prop: "finalPrice"
        },
        {
          label: "月份",
          prop: "months"
        },
        {
            label: '排序号',
            prop: 'orderNumber'
        },
        {
          label: "操作",
          render: (h, { row }) => {
            return (
              <div>
                <link-button
                  to={`/system/edit/${row.memberLevelId}`}
                  size="small"
                  type="text"
                >
                  编辑
                </link-button>
                
              </div>
            );
          }
        }
      ]
    };
  },
//   <el-button
//                   type="text"
//                   size="small"
//                   class={{'text-danger': row.userStatus === "ENABLE"}}
//                   onClick={() => this.changeStatus(row)}
//                 >
//                   {row.userStatus === "ENABLE" ? "禁用" : "启用"}
//                 </el-button>
  methods: {
    async getList(
      params = Object.assign({}, this.tableParams, this.queryParams)
    ) {
      try {
        const { items, total } = await memberLevelApi.query(params);
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
          await memberLevelApi.disable({userId: row.userId});
        } else {
          await memberLevelApi.enable({userId: row.userId});
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

