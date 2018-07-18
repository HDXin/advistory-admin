<template>
    <div class="com-page"
         v-loading="loading"
         element-loading-text="加载中"
         element-loading-spinner="el-icon-loading">
        <div class="com-page-header">
            <slot name="header"></slot>
        </div>
        <div class="com-page-body">
            <slot></slot>
        </div>
        <div class="com-page-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<style scoped>
.com-page-header {
  padding: 10px 15px;
  background-color: #eff2f7;
}
.com-page-body {
  padding: 15px;
  min-height: 75vh;
}
.com-page-footer {
  text-align: right;
  padding-right: 15px;
  padding-bottom: 20px;
}
</style>
<script>
export default {
  name: "Page",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>