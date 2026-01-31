// campus-activities/index.js
Page({
  data: {
    activityList: [
      {
        id: 1,
        title: '春季运动会',
        location: '体育场',
        date: '2024.04',
        status: '报名中'
      },
      {
        id: 2,
        title: '音乐会',
        location: '礼堂',
        date: '2024.03',
        status: '进行中'
      },
      {
        id: 3,
        title: '知识竞赛',
        location: '教室',
        date: '2024.02',
        status: '已结束'
      }
    ]
  },

  onLoad: function (options) {
    console.log('校园活动页面加载');
  },

  viewDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '活动详情',
      content: `活动ID: ${id}`,
      showCancel: false
    });
  }
});

