// index.js
Page({
  data: {
    currentTab: 'activity' // 当前选中的标签
  },

  onLoad: function (options) {
    // 页面加载时的处理
    console.log('主页面加载');
  },

  onReady: function () {
    // 页面初次渲染完成
  },

  onShow: function () {
    // 页面显示时触发
  },

  onHide: function () {
    // 页面隐藏时触发
  },

  onUnload: function () {
    // 页面卸载时触发
  },

  // 切换标签
  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
    console.log('切换到标签:', tab);
    
    // 这里可以添加接口调用
    this.loadData(tab);
  },

  // 加载数据（接口预留）
  loadData: function (type) {
    // 接口调用示例
    wx.request({
      url: 'https://your-api-domain.com/api/data',
      method: 'GET',
      data: {
        type: type
      },
      success: (res) => {
        console.log('数据加载成功:', res.data);
        // 处理返回的数据
      },
      fail: (err) => {
        console.error('数据加载失败:', err);
      }
    });
  },

  // 导航到各个功能页面（接口预留）
  goToCreditEvaluation: function () {
    wx.navigateTo({
      url: '/pages/credit-evaluation/index',
      success: () => {
        console.log('进入信誉评估页面');
      }
    });
  },

  goToStudentLoan: function () {
    wx.navigateTo({
      url: '/pages/student-loan/index',
      success: () => {
        console.log('进入助学信贷页面');
      }
    });
  },

  goToBusinessLoan: function () {
    wx.navigateTo({
      url: '/pages/business-loan/index',
      success: () => {
        console.log('进入创业信贷页面');
      }
    });
  },

  goToLifeLoan: function () {
    wx.navigateTo({
      url: '/pages/life-loan/index',
      success: () => {
        console.log('进入生活信贷页面');
      }
    });
  },

  goToEducation: function () {
    wx.navigateTo({
      url: '/pages/education/index',
      success: () => {
        console.log('进入教育公益页面');
      }
    });
  },

  goToCampusActivities: function () {
    wx.navigateTo({
      url: '/pages/campus-activities/index',
      success: () => {
        console.log('进入校园活动页面');
      }
    });
  },

  goToWorkStudy: function () {
    wx.navigateTo({
      url: '/pages/work-study/index',
      success: () => {
        console.log('进入勤工助学页面');
      }
    });
  },

  goToLifePayments: function () {
    wx.navigateTo({
      url: '/pages/life-payments/index',
      success: () => {
        console.log('进入生活缴费页面');
      }
    });
  },

  // 跳转到活动详情页面
  goToActivityDetail: function () {
    wx.navigateTo({
      url: '/pages/activity-detail/index',
      success: () => {
        console.log('进入活动详情页面');
      }
    });
  },

  // 搜索功能（接口预留）
  onSearch: function () {
    wx.navigateTo({
      url: '/pages/search/index'
    });
  }
});

