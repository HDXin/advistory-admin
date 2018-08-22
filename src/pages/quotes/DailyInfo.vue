<template>
    <page>
        <el-row slot="header">
            <el-col :span="20">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>行情管理</el-breadcrumb-item>
                    <el-breadcrumb-item>每日数据信息</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="4"
                    class="text-right">
                <el-button  size="small" @click="dialogVisible = true"
                             type="primary">新增</el-button>
            </el-col>
        </el-row>
        <el-form inline>
            <k-form-item label="标的名称"
                         v-model="queryParams.title"></k-form-item>
            <k-form-item label="标的代码"
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
                 <daily-info-edit :visible.sync="dialogVisible"/>
    </page>
</template>
<script>
import { mixin } from "@/mixins/search";
import { articleApi } from "@/api";
import DailyInfoEdit from "@/components/quotes/DailyInfoEdit";
export default {
  mixins: [mixin],
  components:{DailyInfoEdit},
  data() {
    return {
      dialogVisible: true,
      queryParams: {
        articleName: "",
        mobile: ""
      },
      tableData: [],
      dialogVisible: false,
      itemList: [],
      columns: [
        {
          label: "时间",
          prop: "articleId"
        },
        {
          label: "标的品种",
          prop: "title"
        },
        {
          label: "价格max",
          prop: "createTime",
          formatter: row => this.moment().format("YYYY-MM-DD")
        },
        {
          label: "价格min",
          prop: "createTime",
          formatter: row => this.moment().format("YYYY-MM-DD")
        },
        {
          label: "交易量",
          prop: "createTime",
          formatter: row => this.moment().format("YYYY-MM-DD")
        },
        // {
        //   label: "操作",
        //   render: (h, { row }) => {
        //     return (
        //       <div>
        //         <link-button
        //           to={`/article/edit/${row.articleId}`}
        //           size="small"
        //           type="text"
        //         >
        //           编辑
        //         </link-button>
        //         <el-button
        //           type="text"
        //           size="small"
        //           class="text-danger"
        //           onClick={() => this.remove(row.articleId)}
        //         >
        //           删除
        //         </el-button>
        //       </div>
        //     );
        //   }
        // }
      ]
    };
  },
  methods: {
    async getList(
      params = Object.assign({}, this.tableParams, this.queryParams)
    ) {
      try {
        const { items, total } = await articleApi.query(params);
        this.tableData = items;
        this.total = total;
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    },
    async remove(id) {
      try {
        await this.$confirm("是否确定删除？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        });
        await articleApi.delete({ articleId: id });
        this.getList();
      } catch (error) {
        if (error === "cancel") return;
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    },
    previewArticle(row) {
      this.itemList = JSON.parse(row.content).contentItemList;
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    }
  }
};
</script>

