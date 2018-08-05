<template>
    <page>
        <el-breadcrumb separator=">"
                       slot="header">
            <el-breadcrumb-item to="/system">系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.params.id ? '编辑': '新增'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <edit-content>
            <el-form :model="model"
                     :rules="rules"
                     ref="form"
                     label-width="150px">
                <el-form-item label="描述"
                              prop="description">
                    <el-input v-model="model.description"
                              :disabled="isEdit"
                              placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item label="原价"
                              prop="originPrice">
                    <el-input v-model.number="model.originPrice"
                              type="number"
                              :disabled="isEdit"
                              placeholder="请输入原价"></el-input>
                </el-form-item>
                <el-form-item label="折后价"
                              prop="finalPrice">
                    <el-input v-model.number="model.finalPrice" type="number"
                              :disabled="isEdit"
                              placeholder="请输入折后价"></el-input>
                </el-form-item>
                <el-form-item label="有效期"
                              prop="months">
                    <el-input v-model.number="model.months"
                              type="number"
                              :disabled="isEdit"
                              placeholder="请输入有效期">
                        <template slot="append">月</template>
                    </el-input>
                </el-form-item>

                <el-form-item label="背景图"
                              prop="imageUrl">
                    <upload v-model="model.imageUrl"
                            :limit="1"
                            :disabled="isEdit">
                        <i class="el-icon-plus"></i>
                    </upload>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model.number="model.displayOrder" type="number"></el-input>
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
import { memberLevelApi } from "@/api";
export default {
  data() {
    return {
      model: {
        description: "",
        imageUrl: [],
        originPrice: "",
        finalPrice: "",
        displayOrder: '',
        months: ''
      },
      rules: {
        originPrice: [
          {
            required: true,
            message: "请输入原价",
            trigger: "blur",
            type: "number"
          }
        ],
        finalPrice: [
          {
            required: true,
            message: "请输入折后价",
            trigger: "blur",
            type: "number"
          }
        ],
        months: [
          { required: true, message: "月份", trigger: "blur", type: "number" }
        ],
        description: [
          {
            required: true,
            message: "请输入描述",
            trigger: "blur"
          }
        ],
        imageUrl: [
          {
            required: true,
            message: "请上传图片",
            trigger: "change",
            type: "array"
          }
        ]
      },
      isEdit: !!this.$route.params.id,
      loading: false
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getInfo();
    }
  },
  methods: {
    async getInfo() {
      try {
        let res = await memberLevelApi.get({ memberLevelId: this.$route.params.id });
        res.imageUrl = [{ url: res.imageUrl }];
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
          Object.assign(params, { memberLevelId: this.$route.params.id });
          await memberLevelApi.update(params);
        } else {
          await memberLevelApi.create(params);
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
      let params = Object.assign({}, this.model);
      params.imageUrl =
        params.imageUrl[0].response || params.imageUrl[0].url.matchUrl();
      return params;
    }
  }
};
</script>
