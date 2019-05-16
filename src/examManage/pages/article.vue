<template>
  <div class="article">
    <div class="title-tag">文章标题</div>
    <el-input v-model="input" placeholder="请输入标题"></el-input>
    <div style="margin: 30px 0;"></div>
    <div class="title-tag">文章内容</div>
    <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="textarea"></el-input>
    <!-- 提交 取消 -->
    <div style="margin: 20px 200px;">
      
        <el-button type="primary"  @click="publish(id)">发布</el-button>
        <el-button type="danger"  @click="cand()">取消</el-button>
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      input: "",
      textarea: ""
    }
 },
  methods:{
      cand(){
      this.input="",
      this.textarea=""
 },
 publish(id){
     this.$confirm('确定发布该试卷吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',})
    //   .then(() => {
    //     this.$axios.post('/api/publishPaper',{
    //       id: id
    //     }).then(response => {
    //       let res = response.data;
    //       if (res.status == '0') {
    //         this.$message.success('发布成功！');
    //         // this.getMypapers();
    //       }
    //     }).catch(err => {
    //       this.$message.error("获取试卷数据失败!")
    //     })
    //   }).catch(()=>{
    //     this.$message({
    //       type: 'info',
    //       message: '已取消发布!'
    //     });
    //   })
    }
  }
 
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
.article {
  width: 50%;
  height: 100%;
  position: fixed;
  left: 25%;
  overflow-y: scroll;
}
.title-tag {
  position: relative;
  background: #324157;
  width: 80px;
  color: #fff;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 24px;
  &::after {
    content: " ";
    position: absolute;
    display: block;
    border-width: 17px 17px 17px 17px;
    border-style: solid;
    border-color: transparent transparent transparent #324157;
    height: 0;
    left: 100%; //根据三角形的位置，可以随意更改。
    top: 0;
    width: 0;
  }
}
</style>
