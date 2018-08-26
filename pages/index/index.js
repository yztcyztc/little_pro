//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    school_index: 0 ,
    schools: ['北京大学',
'清华大学',
'浙江大学',
'复旦大学',
'中国人民大学',
'上海交通大学',
'武汉大学',
'南京大学'],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    degrees: ['硕士','PHD'],
    degree: 0,

    gres: ['GRE','GMAT'],
    gre: 0,

    gpas: ['(百分制)', '(四分制)'],
    gpa: 0,

    additions:['积累中。。。','尚可。。。','丰富。。。'],
    add_index: 0,
  },
  schoolPickerChange :function(e){
    console.log('选择：',e.detail.value)
    this.setData(
      {
        school_index: e.detail.value
      }
    )
  },
  changeGpa: function (e) {
    if (this.data.gpa == 0) {
      this.setData({
        gpa: this.data.gpa + 1
      })
    } else {
      this.setData({
        gpa: this.data.gpa - 1
      })
    }
  },

  changeGre: function(e){
    if (this.data.gre == 0) {
      this.setData({
        gre: this.data.gre + 1
      })
    } else {
      this.setData({
        gre: this.data.gre - 1
      })
    }
  },

  changeDegree: function (e) {
    //console.log(this.data.degree)
    if(this.data.degree == 0){
      this.setData({
        degree: this.data.degree + 1
      })
    }else{
      this.setData({
        degree: this.data.degree - 1
      })
    }
    console.log(this.data.degree)
  },

  additionChange: function(e){
    this.setData({
      add_index : e.detail.value
    })
  },
  //提交表单
  formSubmit: function(e){
    var gpa = e.detail.value.gpa
    var gre = e.detail.value.gre
    var toefl = e.detail.value.toefl
    var school = this.data.schools[this.data.school_index]
    console.log("shool:"+school,"gpa:"+gpa,"gre:"+gre,"toefl:"+toefl)
    if (this.checkNum("gpa",gpa) || this.checkNum("gre",gre) || this.checkNum("toefl",toefl))
      return false
    wx.showLoading({
      title: '努力计算中...',
    })
    var result = 'sb'
    wx.request({
      //url: 'http://yztcpy.app.yyuap.com/submit',
      url: 'https://www.yztcyztc.club/submit',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        school:school,
        gpa:gpa,
        gre:gre,
        toefl:toefl
      },
      success: function(res){
        console.log(res.data,res.statusCode)
        if(res.statusCode == 200){
          result = res.data,
          wx.navigateTo({
            url: '../result/result?result='+result,
          })
        }else{
         // wx.hideLoading()
          setTimeout(function(){
            wx.showToast({
              title: '请求接口错误',
              icon: 'none',
              duration: 2000
            })
          },0)
         
        }
        wx.hideLoading()
        //console.log('result:'+result)
      },
      fail: function(){
        setTimeout(function () {
          wx.hideLoading()
          setTimeout(function(){
            wx.showToast({
              title: '请求服务器失败，请检查网络',
              icon: "none",
              duration: 3000
            },0)
          })
          
        }, 4500)
      } 
    })    
    //console.log("dd"+result)
  },
  //验证带小数点的数字
  checkNum: function(name,num){
    let checkNum = /^[0-9]+\.?[0-9]+$/
    if(num == null || !checkNum.test(num)){
      wx.showModal({
        title: name + '输入有误',
        content: '正确示例：5.0',
        showCancel: false
      })
      return true
    }
    return false
  },

  //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
//
})
