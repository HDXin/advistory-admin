<template>
    <el-dialog title="标的信息" :visible.sync="dialogVisible">
        <el-form :model="model">
          <el-form-item label="标的ID">
              <el-input v-model="model.id" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="标的代码">
              <el-input v-model="model.id" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="标的名称">
              <el-input v-model="model.id" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="标的分类符">
              <el-input v-model="model.id" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:{
        visible:{
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            model:{}      
        }
    },
    computed:{
        dialogVisible:{
            get(){
                return this.visible
            },
            set(val){
                this.$emit('update:visible', val)
            }
        }
    }
}
</script>

