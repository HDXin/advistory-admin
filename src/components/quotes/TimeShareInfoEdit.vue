<template>
    <el-dialog title="分时数据信息" :visible.sync="dialogVisible">
        <el-form :model="model">
          <el-form-item label="标的ID">
              <el-input v-model="model.id" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="时间值">
              <el-input v-model="model.id" placeholder="">
                  <template slot="append">秒</template>
              </el-input>
          </el-form-item>
          <el-form-item label="行情值">
              <el-input v-model="model.id" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="交易量">
              <el-input v-model="model.id" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="当时涨跌标价">
              <el-radio-group v-model="model.id">
                <el-radio label="UP">看涨</el-radio>
                <el-radio label="DOWN">看跌</el-radio>
              </el-radio-group>
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

