<template>
  <div class="student_manage">
    <div class="title-tag">文章标题</div>
    <div>{{}}</div>
    <div style="margin: 30px 0;"></div>
    <div class="title-tag">文章内容</div>
    <div>{{}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        selections:[],
        visible:false,
        name: '', // 试卷名称 v-model
        pageNumber: 1, // 当前页
        pageSize:10 ,
        pageTotal: 0, // 数据总数
        mypapers: [], // 试卷数据,
        textarea:""
      }
    },
    mounted(){
      this.getArticle()
    },
    
      /**
       * [getArticle 加载试卷信息]
       * @return {[type]} [description]
       */
      getArticle(){
        this.$axios.get('/api/getExams',{
          params:{
            name: this.name,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
          }
        }).then(response => {
          let res = response.data;
          if(res.status == 0) {
            this.mypapers = res.result._papers;
            this.pageTotal = this.mypapers.length;
          }
        }).catch(err => {
          this.$message.error("获取文章失败!")
        })
      },
    }
  
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
.student_manage {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.student_manage::-webkit-scrollbar {
  display: none;
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
