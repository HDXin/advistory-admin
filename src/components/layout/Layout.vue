<template>
  <el-container>
    <el-header class="layout-header">
      <LayoutHeader @select="handleSelect"></LayoutHeader>
    </el-header>
    <el-container class="layout-container">
      <el-aside width="200px">
        <el-menu :default-active="$route.path"
                 unique-opened
                 mode="vertical"
                 background-color="#26344b"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router>
          <el-menu-item index="/user">
            <i class="el-icon-location"></i>
            <span slot="title">平台用户</span>
          </el-menu-item>
          <el-menu-item index="/vip">
            <i class="el-icon-location"></i>
            <span slot="title">会员用户</span>
          </el-menu-item>
          <el-menu-item index="/carousel">
            <i class="el-icon-location"></i>
            <span slot="title">轮播图</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-location"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item index="/advistory">
            <i class="el-icon-location"></i>
            <span slot="title">咨询管理</span>
          </el-menu-item>
          <el-menu-item index="/system">
            <i class="el-icon-location"></i>
            <span slot="title">系统设置</span>
          </el-menu-item>
          <el-menu-item index="/feedback">
            <i class="el-icon-location"></i>
            <span slot="title">意见反馈</span>
          </el-menu-item>
          <el-submenu index="/subjectInfo">
            <template slot="title"> <i class="el-icon-location"></i> 行情管理</template>
            <el-menu-item index="/timeShareInfo">分时数据信息</el-menu-item>
            <!-- <el-menu-item index="/subjectInfo">日k数据</el-menu-item> -->
            <el-menu-item index="/referenceCurveInfo">参考曲线</el-menu-item>
            <el-menu-item index="/dailyInfo">日大数据</el-menu-item>
            <!-- <el-menu-item index="/upDownsInfo">涨跌预判信息</el-menu-item>
            <el-menu-item index="/targetInfo">标的品种信息</el-menu-item> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="layout-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import LayoutHeader from "./Header";
export default {
  data() {
    return {
      module: ""
    };
  },
  methods: {
    handleSelect(key) {
      this.module = key;
    }
  },
  components: {
    LayoutHeader
  }
};
</script>
<style lang="less">
// .layout {
//     // display: flex;
//     position: relative;
// }
.el-container{
  height: 100%;
}

.layout-sider {
  z-index: 999;
  width: 200px !important;
  min-height: calc(100vh - 64px);
  overflow-y: scroll;
  background-color: #26344b;
  transition: 0.9s width ease-in-out;
}

.logo {
  width: 200px;
  height: 32px;
  margin: 16px;
  /*background: #e4e4e4;*/
  color: #fff;
  line-height: 32px;
  text-align: center;
  border-radius: 10px;
  transition: 0.9s width ease-in-out;
  display: inline-block;
}
.layout-header {
  width: 100%;
  height: 64px !important;
  background: #26344b;
  padding-left: 0;
}

.layout-content {
  background: #ffffff;
  min-height: 83vh;
  padding: 0 !important;
}
.el-submenu .el-menu-item {
  min-width: 199px;
}
.el-menu--horizontal {
  border-bottom: 0;
}
.el-aside > .el-menu {
  min-height: 100%;
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  object-fit: cover !important;
}
</style>
