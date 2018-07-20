<template>
    <el-dialog title="修改密码"
               :visible.sync="dialogVisible">
        <el-form :model="model"
                 ref="form"
                 :rules="rules">
            <el-form-item label="原密码"
                          prop="oldPass">
                <el-input v-model="model.oldPass"
                          placeholder="请输入原密码"
                          type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码"
                          required
                          prop="newPass">
                <el-input v-model="model.newPass"
                          placeholder="请输入新密码"
                          type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"
                          required
                          prop="checkPass">
                <el-input v-model="model.checkPass"
                          placeholder="请再输入一遍密码"
                          type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="submit" :loading="loading">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import { userApi } from "@/api";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.model.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.model.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      model: {
        oldPass: "",
        newPass: "",
        checkPass: ""
      },
      loading: false,
      rules: {
        newPass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPass: [{ required: true, message: "请输入原密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    async submit() {
      try {
        await this.$refs.form.validate();
        this.loading = true;
        const {oldPass, newPass} = this.model;
        await userApi.updatePass({oldPass, newPass})
        this.dialogVisible = false
      } catch (error) {
          console.log(error)
        if (!error) return;
      }finally{
          this.loading = false;
      }
    }
  }
};
</script>

