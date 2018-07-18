<template>
    <div class="header">
        <h3 class="logo">Advistory Admin</h3>
    </div>
</template>
<script>

export default {
  components: {
    // PassWordReset
  },
  data() {
    return {
      status: false,
      routePath: "",
      dialogFormVisible:'',
    };
  },
  watch: {
    $route: "getPath"
  },
  mounted: function() {
    this.getPath();
  },
  
  methods: { 
    
    handleSelect(key) {
      this.$emit("select", key);
    },
    getPath() {
      let path = this.$route.path;
      if (/^\/goods/.test(path)) {
        this.routePath = "goods";
      } else if (path.indexOf(/^\/store/) !== -1) {
        this.routePath = "store";
      } else if (path.indexOf(/^\/order/) !== -1) {
        this.routePath = "order";
      } else if (path.indexOf(/^\/settle/) !== -1) {
        this.routePath = "settle";
      } else if (path.indexOf(/^\/operation/) !== -1) {
        this.routePath = "operation";
      } else if (path.indexOf(/^\/member/) !== -1) {
        this.routePath = "member";
      } else if (path.indexOf(/^\/system/) !== -1) {
        this.routePath = "system";
      } else if (path.indexOf(/^\/partion/) !== -1) {
        this.routePath = "partion";
      } else if (path.indexOf(/^\/statistics/) !== -1) {
        this.routePath = "statistics";
      } 
    }
  }
};
</script>

<style lang="less">
.header {
  line-height: 64px;
  display: flex;
  .el-menu {
    width: 100%;
  }
  .el-menu-item {
    padding: 0;
    a {
      display: inline-block;
      padding: 0 20px;
      text-decoration: none;
    }
    .router-link-active{
        color: #fff;
    }
  }
  //   text-align: right;
  // margin-right: 260px;
}
</style>
