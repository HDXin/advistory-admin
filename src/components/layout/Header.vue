<template>
  <div class="header">
    <h3 class="logo">Advistory Admin</h3>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <images :src="model.photo" avatar />
          {{model.userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="resetPassword">重置密码</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <update-password :visible.sync="dialogVisible"/>
  </div>
</template>
<script>
import UpdatePassword from '../UpdatePassword'
import { userApi } from "@/api";
export default {
  components: {
    UpdatePassword
  },
  data() {
    return {
      model: JSON.parse(localStorage.getItem('user')),
      dialogVisible: false,
    };
  },
  methods:{
     async handleCommand(key){
      if(key === 'exit') return this.exit();
      if(key === 'updatePassword') return this.dialogVisible = true;
      if(key === 'resetPassword') {
        try {
          await this.$confirm('是否确认重置密码？重置后密码将变为初始密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          await userApi.resetPass({userId: this.model.userId})
          this.$message({
            message: '重置成功',
            type: 'success'
          });
        } catch (error) {
          if(error === 'cancel') return;
          this.$message({
            message: error.message,
            type: 'error'
          });
        }
      };
    },
    exit(){
      localStorage.removeItem('user');
      this.$router.replace('/login');
    }
  }
};
</script>

<style lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-dropdown{
    margin-right: 35px;
    color: white;
    font-size: 20px;
  }
}
</style>
