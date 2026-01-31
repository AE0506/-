// education/index.js
Page({
  data: {
    activityList: [
      {
        id: 1,
        title: '山区支教',
        location: '山区学校',
        date: '2024.03',
        participants: 120
      },
      {
        id: 2,
        title: '图书馆志愿服务',
        location: '校园图书馆',
        date: '2024.02',
        participants: 85
      },
      {
        id: 3,
        title: '社区义务教学',
        location: '附近社区',
        date: '2024.01',
        participants: 95
      }
    ]
  },

  onLoad: function (options) {
    console.log('教育公益页面加载');
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

