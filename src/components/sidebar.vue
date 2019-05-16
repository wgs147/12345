<template>
  <div class="sidebar">
    <el-row>
      <el-col class="text-center marginT10">
        <img width="150" v-lazy="logoSrc" alt="logo">
      </el-col>
      <el-col>
        <el-menu
          theme="dark"
          :default-active="activeIndex"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-menu-item index="/endhome/index">
            <i class="fa-icon fa fa-home"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="fa-icon fa fa-folder"></i>试卷管理
            </template>
            <el-menu-item index="/endhome/mypapers">我的试卷</el-menu-item>
            <el-menu-item index="/endhome/markpapers">阅卷</el-menu-item>
          </el-submenu>
          <!-- 学生管理 -->
           <el-submenu index="3">
            <template slot="title">
              <i class="fa-icon fa fa-group"></i>学生管理
            </template>
            <el-menu-item index="/endhome/studentmanage">成绩管理</el-menu-item>
          </el-submenu>
          <!-- 文章 -->
           <el-submenu index="4">
            <template slot="title">
              <i class="fa-icon fa fa-group"></i>文章
            </template>
            <el-menu-item index="/endhome/article">编写文章</el-menu-item>
            <el-menu-item index="/endhome/myArticle">我的文章</el-menu-item>
          </el-submenu>
          <!-- 个人中心 -->
           <el-submenu index="5">
            <template slot="title">
              <i class="fa-icon fa fa-user"></i>个人中心管理
            </template>
            <el-menu-item index="/endhome/user">我的信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeIndex: "/endhome/index",
      logoSrc: require("../common/img/sm-logo.png")
    };
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    //初始化列表active状态
    initActiveIndex() {
      this.activeIndex = this.$router.currentRoute.path;
    }
  },
  watch: {
    $route: "initActiveIndex"
  },
  created() {
    this.initActiveIndex();
  }
};
</script>

<style scoped="scoped">
</style>
