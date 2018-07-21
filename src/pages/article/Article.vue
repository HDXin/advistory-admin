<template>
    <page>
        <el-row slot="header">
            <el-col :span="20">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="4"
                    class="text-right">
                <link-button to="/article/create"
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
        <preview :visible.sync="dialogVisible"
                 :itemList="itemList" />
    </page>
</template>
<script>
import { mixin } from "@/mixins/search";
import { articleApi } from "@/api";
import Preview from "./Preview";
export default {
  mixins: [mixin],
  components: {
    Preview
  },
  data() {
    return {
      queryParams: {
        articleName: "",
        mobile: ""
      },
      tableData: [],
      dialogVisible: false,
      itemList: [],
      columns: [
        {
          label: "ID",
          prop: "articleId"
        },
        {
          label: "文章标题",
          prop: "title"
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter: row => this.moment().format("YYYY-MM-DD")
        },
        {
          label: "操作",
          render: (h, { row }) => {
            return (
              <div>
                <el-button
                  type="text"
                  size="small"
                  onClick={() => this.previewArticle(row)}
                >
                  预览
                </el-button>
                <link-button
                  to={`/article/edit/${row.articleId}`}
                  size="small"
                  type="text"
                >
                  编辑
                </link-button>
                <el-button
                  type="text"
                  size="small"
                  class="text-danger"
                  onClick={() => this.remove(row.articleId)}
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
        console.log(row)
      this.itemList = JSON.parse(row.content).contentItemList;
      this.$nextTick(() => {
        this.dialogVisible = true;
      });
    }
  }
};
</script>

