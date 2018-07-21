<template>
    <page>
        <el-breadcrumb separator=">"
                       slot="header">
            <el-breadcrumb-item to="/article">文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.params.id ? '编辑': '新增'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <edit-content>
            <el-form :model="model"
                     :rules="rules"
                     ref="form">
                <el-form-item label="文章标题"
                              prop="title">
                    <el-input v-model="model.title"
                              :disabled="isEdit"
                              placeholder="请输入文章标题"></el-input>
                </el-form-item>
                <el-form-item label="文章编码"
                              prop="code">
                    <el-input v-model="model.code"
                              :disabled="!!$route.params.id"
                              placeholder="请输入文章编码"></el-input>
                </el-form-item>
                <el-form-item label="图文详情">
                    <el-button type="primary"
                               size="small"
                               @click="addItem">新增</el-button>
                    <article-item v-model="model.contentItemList[index]"
                                  :disabled="isEdit"
                                  :key="index"
                                  :index="index"
                                  @click="removeItem"
                                  v-for="(content, index) in model.contentItemList" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="goBack">返回</el-button>
                    <el-button type="primary"
                               @click="submit"
                               :loading="loading"
                               v-if="!isEdit">确认</el-button>
                    <el-button @click="isEdit = false"
                               v-else>编辑</el-button>
                </el-form-item>
            </el-form>
        </edit-content>
    </page>
</template>
<script>
import ArticleItem from "@/components/ArticleItem";
import { articleApi } from "@/api";
import { cloneDeep } from "lodash";
export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      model: {
        title: "",
        code: "",
        contentItemList: [
          {
            type: "TXT",
            content: "",
            link: "",
            displayOrder: 0
          }
        ]
      },
      isEdit: !!this.$route.params.id,
      loading: false,
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        code: [{ required: true, message: "请输入文章编码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getInfo();
    }
  },
  methods: {
    addItem() {
      this.model.contentItemList.push({
        type: "TXT",
        content: "",
        link: "",
        displayOrder: 0
      });
    },
    removeItem(i) {
      this.model.contentItemList.splice(i, 1);
    },
    async getInfo() {
      try {
        let res = await articleApi.get({ articleId: this.$route.params.id });
        res.contentItemList.forEach(item => {
          if (item.type === "IMAGE") {
            item.content = [{ url: item.content }];
          }
        });
        this.model = res;
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    },
    async submit() {
      try {
        await this.$refs.form.validate();
        let params = this.formatData();
        this.loading = true;
        if (this.$route.params.id) {
          Object.assign(params, { articleId: this.$route.params.id });
          await articleApi.update(params);
        } else {
          this.validCode();
          await articleApi.create(params);
        }
        this.goBack();
      } catch (error) {
        if (!error) return;
        this.$message({
          message: error.message,
          type: "error"
        });
      } finally {
        this.loading = false;
      }
    },
    //检验code是否已存在
    async validCode() {
      try {
        const flag = await articleApi.validCode({
          code: this.model.code
        });
        if (flag) return;
        throw { message: "用户名已存在" };
      } catch (error) {
        throw error;
      }
    },
    formatData() {
      let params = cloneDeep(this.model);
      params.contentItemList.forEach(item => {
        if (Array.isArray(item.content)) {
          item.content =
            item.content[0].response || item.content[0].url.matchUrl();
        }
      });
      const emptyList = params.contentItemList.filter(item => !item.content);
      if (emptyList.length) {
        throw { message: "图文信息不全" };
      } else {
        return params;
      }
    }
  }
};
</script>

