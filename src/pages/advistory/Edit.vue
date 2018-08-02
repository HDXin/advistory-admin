<template>
  <page>
    <el-breadcrumb separator=">"
                   slot="header">
      <el-breadcrumb-item to="/article">咨询管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.params.id ? '编辑': '新增'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <edit-content>
      <el-form :model="model"
               :rules="rules"
               label-width="150px"
               ref="form">
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="model.title"
                    :disabled="isEdit"
                    placeholder="请输入文章标题"></el-input>
        </el-form-item>

        <el-form-item label="摘要"
                      prop="digest">
          <el-input v-model="model.digest"
                    :disabled="isEdit"
                    placeholder="请输入文章摘要"></el-input>
        </el-form-item>
        <el-form-item label="发布时间"
                      prop="publishTimeStr">
          <el-date-picker v-model="model.publishTimeStr"
                          type="datetime"
                          :disabled="isEdit"
                          placeholder="请选择发布时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="封面图"
                      prop="coverImage">
          <upload v-model="model.coverImage"
                  :limit="1"
                  :disabled="isEdit">
            <i class="el-icon-plus"></i>
          </upload>
        </el-form-item>
        <el-form-item label="发布级别"
                      prop="advistoryLevel">
          <el-radio-group v-model="model.advistoryLevel" :disabled="isEdit">
            <el-radio label="LEVEL_A">A</el-radio>
            <el-radio label="LEVEL_B">B</el-radio>
            <el-radio label="LEVEL_C">C</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资讯类型"
                      prop="advistoryType">
          <el-radio-group v-model="model.advistoryType" :disabled="isEdit">
            <el-radio label="GENERAL">常规</el-radio>
            <el-radio label="VIP">vip</el-radio>
            <el-radio label="CHOICENESS">精选</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资讯分类"
                      prop="advistoryCategory">
          <el-radio-group v-model="model.advistoryCategory" :disabled="isEdit">
            <el-radio label="GENERAL">常规</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图文详情">
          <el-button type="primary"
                     size="small"
                     @click="addItem">新增</el-button>
          <article-item v-model="model.details[index]"
                        :disabled="isEdit"
                        :key="index"
                        :index="index"
                        @click="removeItem"
                        v-for="(content, index) in model.details" />
        </el-form-item>
        <el-form-item label="是否推荐">
          <el-checkbox v-model="model.recommendStatus" :disabled="isEdit"></el-checkbox>
        </el-form-item>
        <el-form-item label="是否置顶">
          <el-checkbox v-model="model.stickStatus" :disabled="isEdit"></el-checkbox>
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
import { advistoryInfoApi } from "@/api";
import { cloneDeep } from "lodash";
export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      model: {
        title: "",
        digest: "",
        coverImage: [],
        publishTimeStr: "",
        advistoryLevel: "LEVEL_A",
        advistoryType: "GENERAL",
        advistoryCategory: "GENERAL",
        recommendStatus: false,
        stickStatus: false,
        details: [
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
        digest: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        advistoryLevel: [
          { required: true, message: "请选择发布级别", trigger: "blur" }
        ],
        coverImage: [
          { required: true, message: "请上传封面图", trigger: "change" }
        ],
        publishTimeStr: [
          {
            required: true,
            message: "请选择发布时间",
            trigger: "change"
          }
        ]
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
      this.model.details.push({
        type: "TXT",
        content: "",
        link: "",
        displayOrder: 0
      });
    },
    removeItem(i) {
      this.model.details.splice(i, 1);
    },
    async getInfo() {
      try {
        let res = await advistoryInfoApi.get({
          advistoryId: this.$route.params.id
        });
        let {
          title,
          digest,
          coverImage,
          publishTime,
          advistoryLevel,
          advistoryType,
          advistoryCategory,
          recommendStatus,
          stickStatus,
          details
        } = res;
        details.forEach(item => {
          if (item.advistoryDetailType === "IMAGE") {
            item.content = [{ url: item.content }];
          }
          item.type =
            item.advistoryDetailType === "TEXT"
              ? "TXT"
              : item.advistoryDetailType;
        });
        coverImage = [{ url: res.coverImage }];
        let publishTimeStr = new Date(res.publishTime);
        this.model = {
          title,
          digest,
          coverImage,
          publishTimeStr,
          advistoryLevel,
          advistoryType,
          advistoryCategory,
          recommendStatus,
          stickStatus,
          details
        };
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
          Object.assign(params, { advistoryId: this.$route.params.id });
          await advistoryInfoApi.update(params);
        } else {
          await advistoryInfoApi.create(params);
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
    formatData() {
      let params = cloneDeep(this.model);
      params.publishTimeStr = this.moment(params.publishTimeStr).format('YYYY-MM-DD HH:mm:ss')
      params.details = params.details.map(item => {
        if (Array.isArray(item.content)) {
          item.content =
            item.content[0].response || item.content[0].url.matchUrl();
        }
        return {
          advistoryDetailType: item.type === "TXT" ? "TEXT" : item.type,
          link: item.link,
          content: item.content,
          displayOrder: item.displayOrder
        };
      });
      params.coverImage =
        params.coverImage[0].response || params.coverImage[0].url.matchUrl();
      const emptyList = params.details.filter(item => !item.content);
      if (emptyList.length) {
        throw { message: "图文信息不全" };
      } else {
        return params;
      }
    }
  }
};
</script>

