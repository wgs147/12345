<template>
  <div class="login_page">
    <div class="login-page-inner">
      <div class="input-text-wrapper">
        <div class="login-logo marginB10">
          <img width="300" v-lazy="logoSrc" alt="logo">
        </div>
        <el-form
          :model="userForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          label-width="60px"
        >
          <el-form-item label="学号" prop="userId">
            <el-input v-model="userForm.userId" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="userForm.userName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input v-model="userForm.grade" placeholder="请输入年级"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="userForm.class" placeholder="请输入班级"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="userForm.passWord" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="but_register">
        <el-button type="danger" @click="submit" class="loginBtn">注册</el-button>
      </div>
      <div class="but_reset">
        <el-button type="danger" @click="resetForm('ruleForm')" class="loginBtn">重置</el-button>
      </div>
      <div class="marginT10">
        <router-link class="note pull-right" to="/">去登录</router-link>
      </div>
    </div>
    <div id="canvas"></div>
  </div>
</template>

<script>
//  初始化一些数据
import { CanvasBackground } from "@/common/js/canvas_bg.js";
export default {
  data() {
    return {
      userForm: {
        userName: "",
        passWord: "",
        userId: "",
        grade: "",
        class: ""
      },
      rules: {
        userId: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "只能输入数字" }
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        grade: [
          { required: true, message: "请输入年级", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "只能输入数字" }
        ],
        class: [
          { required: true, message: "请输入班级", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "只能输入数字" }
        ],
        passWord: [
          { required: true, message: "请输入账号密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度6~20", trigger: "change" },
          { pattern: /^[A-Za-z0-9]+$/, message: "只能输入数字或字母" }
        ]
      },
      logoSrc: require("../common/img/stu(1).gif")
    };
  },
  methods: {
    // 登录
    submit() {
      this.$axios
        .post("/api/studentregister", {
          userInfo: this.userForm
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.$message({
              showClose: true,
              message: "恭喜你，注册成功！",
              type: "success"
            });
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "注册失败，请稍后再试！",
            type: "warning"
          });
        });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
  mounted() {
    var bg = new CanvasBackground({
      canvasContainerID: "canvas",
        circleColor: "rgba(238,99,99,1)",
        lineColor: "rgba(238,99,99,1)",
      canvasOpacity: 0.3
    });
  }
};
</script>

<style scoped>
.note {
  color: #ff7752;
  font-size: 16px;
  position: absolute;
  bottom: -80px;
  right: 30px;
}
/*必填项 * 图标*/

.note > p:after {
  content: " *";
  color: red;
  font-size: 120%;
}
.but_register {
  width: 30%;
  position: absolute;
  left: 80px;
}
.but_reset {
  width: 30%;
  position: absolute;
  right: 0px;
  bottom: -38px;
}

.login_page {
  width: 100%;
  height: 100%;
}

.login-page-inner {
  height: 420px;
  max-width: 300px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -230px;
  padding: 20px;
  z-index: 10;
}

.login-logo {
  text-align: center;
}

#canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

.loginBtn {
  width: 80%;
}
</style>
