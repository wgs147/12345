import Vue from 'vue'
import Router from 'vue-router'
// 前台考试
import FrontLogin from '@/exam/login'
import FrontRegister from '@/exam/register'
import FrontHome from '@/exam/home'
import FrontIndex from '@/exam/pages/index' // 学生端首页
import FrontStudentInfo from '@/exam/pages/studentinfo'  // 学生端个人信息
import ForntExamIndex from '@/exam/pages/examindex'
import ForntExam from '@/exam/pages/exam'
//------------ 后台管理----------------//
import EndLogin from '@/examManage/login'
import EndRegister from '@/examManage/register'
import EndHome from '@/examManage/home'
import Index from '@/examManage/pages/index'
// 试卷管理
import MyPapers from '@/examManage/pages/papersManage/mypapers'
import MarkPapers from '@/examManage/pages/papersManage/markpapers'
import EditPaper from '@/examManage/pages/papersManage/editpaper'
import CheckPaper from '@/examManage/pages/papersManage/checkpaper'
// 文章
import Article from '@/examManage/pages/article'
import myArticle from '@/examManage/pages/myArticle'
// 我的信息管理
import User from '@/examManage/pages/usermsg'
// 学生成绩管理
import StudentManage from '@/examManage/pages/studentManage'
import StudentResult from '@/examManage/pages/studentResult'
// 404
import NoFind from '@/errpages/404'
Vue.use(Router)

export default new Router({
  routes: [
    // 学生考试
    { path: '/', name: 'FrontLogin', component: FrontLogin},
    { path: '/frontregister', name: 'FrontRegister', component: FrontRegister },
    { path: '/fronthome', name: 'FrontHome', component: FrontHome,
      children: [
        { path: 'frontindex', name: 'FrontIndex', component: FrontIndex},
        { path: 'frontstudentinfo', name: 'FrontStudentInfo', component: FrontStudentInfo},
        { path: 'forntexamindex', name: 'ForntExamIndex', component: ForntExamIndex},
        { path: 'forntexam', name: 'ForntExam', component: ForntExam}
      ]
    },
    // 教师
    { path: '/managelogin', name: 'EndLogin', component: EndLogin}, //后台登录
    { path: '/manageregister', name: 'EndRegister', component: EndRegister }, // 后台注册
    { path: '/endhome', name: 'EndHome', component: EndHome, meta: {breadName:'管理系统'},
      children: [
        { path: 'index', name: 'Index', component: Index, meta: {breadName:'首页'},}, // 后台首页
        // 试卷管理
        { path: 'mypapers', name: 'MyPapers', component: MyPapers, meta: {breadName: '我的试卷'}},
        { path: 'edit', name: 'EditPaper', component: EditPaper, meta: {breadName: '编辑试卷'}},
        { path: 'markpapers', name: 'MarkPapers', component: MarkPapers, meta: {breadName: '查看考试'}},
        { path: 'checkpaper', name: 'CheckPaper', component: CheckPaper, meta: {breadName: '阅卷'}},
        { path: 'studentmanage', name: 'StudentManage', component: StudentManage, meta: {breadName: '学生成绩管理'}},
        { path: 'studentresult', name: 'StudentResult', component: StudentResult, meta: {breadName: '学生考试成绩'}},
        // 文章
        { path: 'article', name: 'article', component: Article, meta: {breadName: '文章编写'}},
        { path: 'myarticle', name: 'myarticle', component: myArticle, meta: {breadName: '我的文章'}},
        // 我的信息
        { path: 'user', name: 'User', component: User, meta: {breadName:'我的信息'},} // 我的信息管理
      ]
    },
    { path: '/*', name: '404', component: NoFind }
  ]
})
