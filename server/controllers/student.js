const Student = require('../model/student');
const Paper   = require('../model/papers');
const crypto = require('crypto');

let mdHash = function(data){
  const hash = crypto.createHash('md5');
  return hash.update(data).digest('hex');
}
//注册
exports.register = function (req,res) {
    let userInfo = req.body.userInfo;
    userInfo.passWord = mdHash(userInfo.passWord);
    Student.findOne(userInfo,(err,doc) => {
      if(err) {
          res.json({
            status:'1',
            msg:err.message
          })
        } else {
          if(doc) {
            res.json({
              status:'2',
              msg: '用户已存在'
            })
            } else {
              userInfo.exams = [];
              Student.create(userInfo,(err1,doc1) => {
                if(err1) {
                  res.json({
                    status:'1',
                    msg: err1.message
                  })
                  }else {
                    if(doc1) {
                      res.json({
                        status: '0',
                        msg: 'sucess'
                      })
                      } else {
                        res.json({
                          status:'1',
                          msg:'注册失败'
                        })
                      }
                  }
              })
            }
        }
    })
  };
// 登录
exports.signup = function(req, res) {
  var param = {
    userName: req.body.userName,
    passWord: mdHash(req.body.userPwd)
  }
  Student.findOne(param, (err,doc)=>{
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc) {
        req.session.userName = doc.userName
        req.session.passWord = doc.passWord
        // console.log(req.session)
        res.json({
          status: '0',
          msg:'success',
          result:{
            userName: doc.userName,
            userId: doc.userId,
            grade: doc.grade,
            class: doc.class
          }
        })
      } else {
        res.json({
          status: '2',
          msg:'没有该用户'
        })
      }
    }
  })
};
// 登出
exports.signout = function (req, res) {
  req.session.userName = ''
  req.session.passWord = ''
  res.json({
    status:'0',
    msg:'',
    result:'退出成功'
  })
};

// 获取个人信息
exports.getInfo = function (req, res) {
  let userName = req.param('userName'),
      userId   = req.param('userId');
  // console.log(userName);
  Student.findOne({'userName':userName,'userId':userId},(err, doc) => {
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg:'success',
        result:{
          userName: doc.userName,
          userId: doc.userId,
          grade: doc.grade,
          class: doc.class
        }
      })
    } else {
      res.json({
        status: '2',
        msg:'没有该用户'
      })
    }
  })
};
// 修改用户信息
exports.updateStudent = function (req, res) {
  let userName = req.session.userName;
  let userInfo = req.body.userInfo;
  userInfo.passWord = mdHash(userInfo.passWord);
  Student.update({'userName':userName},userInfo,(err,doc)=>{
    if(err) {
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      if(doc){
        res.json({
          status:'0',
          msg:'success'
        })
      } else {
        res.json({
          status:'1',
          msg:'没有找到该用户'
        })
      }
    }
  })
};
// 获取考试记录
exports.getExamLogs = function (req, res){
  let userName =req.session.userName;
  let name = req.param('name');
  let  pageSize = parseInt(req.param('pageSize'));
  let  pageNumber = parseInt(req.param('pageNumber'));
  let  skip = (pageNumber-1)*pageSize; // 跳过几条
  let  reg = new RegExp(name,'i'); //正则表达式对象。
  Student.findOne({"userName":userName},{"exams":{$slice:[skip,pageSize]}}).populate({path:'exams._paper',match:{name: reg}})
    .exec((err,doc) => {
      if (err) {
        res.json({
          status:'1',
          msg: err.message
        })
      } else {
        if (doc) {
          res.json({
            status: '0',
            msg:'success',
            result:doc,
            count: doc.exams.length?doc.exams.length:0
          })
        } else {
          res.json({
            status: '2',
            msg:'没有该试卷'
          })
        }
      }
    })
};
// 获取考试信息
exports.getExams = function (req,res) {
  let userName =req.session.userName;
  let name = req.param('name');
  // let teaName = req.param('teaName');
  let  pageSize = parseInt(req.param('pageSize'));
  let  pageNumber = parseInt(req.param('pageNumber'));
  let skip = (pageNumber-1)*pageSize; 
  let reg = new RegExp(name,'i'); 
  Student.findOne({"userName":userName},(err,doc)=>{
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
        Paper.find({startTime:{$exists:true},name:reg}).skip(skip).limit(pageSize).populate({path:'_questions'}).exec((err1,doc1)=>{
          if(err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            if(doc1){
              let nowTime = new Date();
              let result = [];
              // 查找还在考试时间内的考试
              doc1.forEach(item => {
                if((nowTime - new Date(item.startTime))/(1000*60) < item.time){
                  result.push(item);
                }
              })
              res.json({
                status: '0',
                result: result,
                total: result.length,
                msg: 'success'
              })
            } else {
              res.json({
                status: '1',
                msg: '没有可以参加的考试'
              })
            }
          }
        })
      } else {
        res.json({
          status:'1',
          msg:'请登录'
        })
      }
    }
  })
};
// 获取试卷内容
exports.getExamInfo = function (req,res) {
  let userName = req.session.userName;
  let id = req.param('id');
  Student.findOne({"userName":userName},(err,doc)=>{
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
      } else {
        if(doc) {
          Paper.findOne({'_id':id}).populate({path:'_questions'}).exec((err1,doc1) => {
            if (err1) {
                res.json({
                    status:'1',
                    msg: err.message
                })
              } else {
                if (doc1) {
                    res.json({
                        status: '0',
                        msg:'success',
                        result:doc1
                    })
                  } else {
                    res.json({
                        status: '2',
                        msg:'没有该试卷'
                    })
                  }
              }
            })
          }
      }
  })
};

// 提交考试
exports.submitExam = function (req, res) {
  let userName = req.session.userName;
  let id = req.body.id;
  let score = req.body.score;
  let startTime = req.body.startTime;
  let answers = req.body.answers;
  Student.findOne({"userName":userName},(err,doc)=>{
    if(err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        if(doc) {
          if(id === ''|| score === ''){
            res.json({
              status: '2',
              msg: '参数错误'
            })
            return
          }
          doc.exams.push({
            _paper:id,
            date: new Date(),
            isSure: !answers.length > 0,
            score:score,
            answers: answers,
            startTime: startTime
          })
          doc.save();
          Paper.findOne({'_id':id},(err1,doc1) => {
            if(err1) {
              res.json({
                status:'1',
                msg: err1.message
              })
            } else{
              if(doc1) {
                doc1.examnum += 1;
                doc1.save();
                res.json({
                  status: '0',
                  msg: 'success'
                })
              } else {
                res.json({
                  status: '1',
                  msg: '没有找到该试卷'
                })
              }
            }
          })
          
        } else {
          res.json({
            status: '1',
            msg: '没找到当前用户!'
          })
        }
      }
  })
}

