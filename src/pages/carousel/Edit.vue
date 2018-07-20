<template>
    <page>
        <el-breadcrumb separator=">"
                       slot="header">
            <el-breadcrumb-item to="/carousel">轮播图</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.params.id ? '编辑': '新增'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <edit-content>
            <el-form :model="model"
                     :rules="rules"
                     ref="form"
                     label-width="150px">
                <el-form-item label="标题"
                              prop="title">
                    <el-input placeholder="请输入标题"
                              :disabled="isEdit"
                              v-model="model.title"></el-input>
                </el-form-item>
                <el-form-item label="描述"
                              prop="description">
                    <el-input v-model="model.description"
                              :disabled="isEdit"
                              placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item label="头像"
                              prop="image">
                    <upload v-model="model.image"
                            :limit="1"
                            :disabled="isEdit">
                        <i class="el-icon-plus"></i>
                    </upload>
                </el-form-item>
                <el-form-item label="跳转链接"
                              prop="link">
                    <el-input v-model="model.link"
                              :disabled="isEdit"
                              placeholder="请输入跳转链接"></el-input>
                </el-form-item>
                <el-form-item label="轮播类型"
                              required
                              prop="type">
                    <el-radio-group v-model="model.type"
                                    :disabled="isEdit">
                        <el-radio label="AD">广告</el-radio>
                        <!-- <el-radio label="false">女</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="打开方式"
                              required
                              prop="openType">
                    <el-radio-group v-model="model.openType"
                                    :disabled="isEdit">
                        <el-radio label="NONE">不打开</el-radio>
                        <!-- <el-radio label="false">女</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否启用"
                              required
                              prop="enableStatus">
                    <el-radio-group v-model="model.enableStatus"
                                    :disabled="isEdit">
                        <el-radio label="ENABLE">启用</el-radio>
                        <el-radio label="DISABLE">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button @click="goBack">返回</el-button>
                    <el-button type="primary"
                               @click="submit" :loading="loading"
                               v-if="!isEdit">确认</el-button>
                    <el-button @click="isEdit = false" v-else>编辑</el-button>
                </el-form-item>
            </el-form>
        </edit-content>
    </page>
</template>
<script>
import { swiperApi } from "@/api";
export default {
  data() {
    return {
      model: {
        title: "",
        openType: 'NONE',
        description: "",
        link: "",
        image: [],
        enableStatus: "ENABLE",
        type: 'AD'
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        description: [
          {
            required: true,
            message: "请输入描述",
            trigger: "blur",
          }
        ],
        link: [{ required: true, message: "请输入跳转链接", trigger: "blur" }],
        image: [
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
  mounted(){
      if(this.$route.params.id){
          this.getInfo()
      }
  },
  methods: {
      async getInfo(){
          try {
              let res = await swiperApi.get({swiperId: this.$route.params.id})
              res.image = [{url:res.image}];
              this.model = res;
          } catch (error) {
              this.$message({
                  message: error.message,
                  type: 'error'
              });
          }
      },
    async submit() {
      try {
        await this.$refs.form.validate();
        let params = this.formatData();
        this.loading = true;
        if (this.$route.params.id) {
          Object.assign(params, {swiperId: this.$route.params.id})
          await swiperApi.update(params)
        } else {
          await swiperApi.create(params);
        }
          this.goBack();
      } catch (error) {
        if (!error) return;
        this.$message({
          message: error.message,
          type: "error"
        });
      } finally{
        this.loading = false
      }
    },
    formatData() {
      let params = Object.assign({}, this.model);
      params.image = params.image[0].response || params.image[0].url.matchUrl();
      return params;
    }
  }
};
</script>
