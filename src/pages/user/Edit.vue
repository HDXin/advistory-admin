<template>
    <page>
        <el-breadcrumb separator=">"
                       slot="header">
            <el-breadcrumb-item to="/user">运营平台用户</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.params.id ? '编辑': '新增'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <edit-content>
            <el-form :model="model"
                     :rules="rules"
                     ref="form"
                     label-width="150px">
                <el-form-item label="用户名"
                              prop="userName">
                    <el-input placeholder="请输入用户名"
                              :disabled="isEdit"
                              v-model="model.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码"
                              prop="mobile">
                    <el-input v-model.number="model.mobile"
                              :disabled="isEdit"
                              type="number"
                              placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"
                              prop="email">
                    <el-input v-model="model.email"
                              :disabled="isEdit"
                              placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="电话"
                              prop="tel">
                    <el-input v-model.number="model.tel"
                              :disabled="isEdit"
                              placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="头像"
                              prop="photo">
                    <upload v-model="model.photo"
                            :limit="1"
                            :disabled="isEdit">
                        <i class="el-icon-plus"></i>
                    </upload>
                </el-form-item>
                <el-form-item label="性别"
                              required
                              prop="gender">
                    <el-radio-group v-model="model.gender"
                                    :disabled="isEdit">
                        <el-radio :label="true">男</el-radio>
                        <el-radio :label="false">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否启用"
                              required
                              prop="userStatus">
                    <el-radio-group v-model="model.userStatus"
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
import { userApi } from "@/api";
export default {
  data() {
    return {
      model: {
        userName: "",
        gender: true,
        mobile: "",
        tel: "",
        email: "",
        photo: [],
        userStatus: "ENABLE"
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
            type: "number"
          }
        ],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        photo: [
          {
            required: true,
            message: "请上传头像",
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
              let res = await userApi.get({userId: this.$route.params.id})
              res.photo = [{url:res.photo}];
              res.mobile = parseInt(res.mobile)
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
          Object.assign(params, {userId: this.$route.params.id})
          await userApi.update(params)
        } else {
          await this.validName();
          await userApi.create(params);
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
    //检验用户名是否已存在
    async validName() {
      try {
        const flag = await userApi.validUserName({
          userName: this.model.userName
        });
        if (flag) return;
        throw { message: "用户名已存在" };
      } catch (error) {
        throw error;
      }
    },
    formatData() {
      let params = Object.assign({}, this.model);
      params.photo = params.photo[0].response || params.photo[0].url.matchUrl();
      return params;
    }
  }
};
</script>
