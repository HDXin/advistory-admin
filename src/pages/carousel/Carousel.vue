<template>
  <page>
    <el-row slot="header">
      <el-col :span="20">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>轮播图</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4"
              class="text-right">
        <link-button to="/carousel/create"
                     size="small"
                     type="primary">新增</link-button>
      </el-col>
    </el-row>
    <el-form inline>
      <k-form-item label="标题"
                   v-model="queryParams.title"></k-form-item>
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
import { swiperApi } from "@/api";
export default {
  mixins: [mixin],
  data() {
    return {
      queryParams: {
        title: "",
      },
      tableData: [],
      columns: [
        {
          label: "标题",
          prop: "title"
        },
        {
          label: "描述",
          prop: "description"
        },
        {
          label: "跳转链接",
          prop: "link",
        },
        {
          label: "轮播类型",
          prop: "type"
        },
        {
          label: "状态",
          formatter: row => {
            return row.enableStatus === "ENABLE" ? "启用" : "禁用";
          }
        },
        {
          label: "操作",
          render: (h, { row }) => {
            return (
              <div>
                <link-button
                  to={`/carousel/edit/${row.swiperId}`}
                  size="small"
                  type="text"
                >
                  编辑
                </link-button>
                <el-button
                  type="text"
                  size="small"
                  class={{'text-danger': row.enableStatus === "ENABLE"}}
                  onClick={() => this.changeStatus(row)}
                >
                  {row.enableStatus === "ENABLE" ? "禁用" : "启用"}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  class='text-danger'
                  onClick={() => this.removeSwiper(row.swiperId)}
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
        const { items, total } = await swiperApi.query(params);
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
      const title = `是否${row.enableStatus === "ENABLE" ? "禁用" : "启用"}?`;
      try {
        await this.$confirm(title, "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        });
        if (row.enableStatus === "ENABLE") {
          await swiperApi.disable({swiperId: row.swiperId});
        } else {
          await swiperApi.enable({swiperId: row.swiperId});
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
     async removeSwiper(id){
      try {
        await this.$confirm('是否确定删除？', "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        });
        await swiperApi.delete({swiperId: id})
        this.getList();
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

