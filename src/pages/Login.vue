<template>
    <div class="login">
        <el-card>
            <el-form :model="model">
                <el-form-item label="用户名">
                    <el-input v-model="model.userName"
                              placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="model.password"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               style="width: 100%"
                               @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { loginApi } from "@/api";
export default {
  data() {
    return {
      model: {
        userName: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    async login() {
      try {
        const res = await loginApi(this.model);
        localStorage.setItem("user", JSON.stringify(res));
        this.$router.replace("/user");
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 500px;
  margin: 50px auto;
}
</style>


