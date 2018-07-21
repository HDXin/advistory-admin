<template>
    <el-row style="margin:5px">
        <el-col :span="4"
                class="col-padding">
            <el-select v-model="model.type"
                       @change="handleChange"
                       :disabled="disabled"
                       placeholder="">
                <el-option label="文本"
                           value="TXT"></el-option>
                <el-option label="图片"
                           value="IMAGE"></el-option>
            </el-select>
        </el-col>
        <el-col :span="10"
                class="col-padding">
            <el-input v-model="model.content"
                      :disabled="disabled"
                      placeholder="请输入内容"
                      type="textarea"
                      v-if="model.type === 'TXT'"></el-input>
            <upload v-else
                    :limit="1"
                    :disabled="disabled"
                    v-model="model.content">
                <i class="el-icon-plus"></i>
            </upload>
        </el-col>
        <el-col :span="10">
            <el-input v-model="model.link"
                      :disabled="disabled"
                      placeholder="请输入跳转链接"></el-input>
            <el-input v-model="model.displayOrder"
                      placeholder="排序"
                      :disabled="disabled"
                      style="margin-top:5px;width: 120px"></el-input>
            <el-button type="danger"
                       v-if="index !== 0"
                       @click="remove">删除</el-button>
        </el-col>
    </el-row>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        type: "TXT",
        content: "",
        link: "",
        displayOrder: 0
      })
    },
    index: Number,
    disabled: Boolean
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    handleChange(value) {
      if (value === "TXT") {
        this.model.content = "";
      } else {
        this.model.content = [];
      }
    },
    remove() {
      this.$emit("click", this.index);
    }
  }
};
</script>
<style lang="less" scoped>
.col-padding {
  padding-right: 10px;
}
</style>


