// work-study/index.js
Page({
  data: {
    jobList: [
      {
        id: 1,
        title: '图书馆管理员',
        location: '图书馆',
        salary: '15元/小时',
        hours: '20小时/周'
      },
      {
        id: 2,
        title: '校园导游',
        location: '校园各处',
        salary: '20元/小时',
        hours: '15小时/周'
      },
      {
        id: 3,
        title: '实验室助手',
        location: '实验楼',
        salary: '18元/小时',
        hours: '10小时/周'
      }
    ]
  },

  onLoad: function (options) {
    console.log('勤工助学页面加载');
  },

  applyJob: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '申请岗位',
      content: `岗位ID: ${id}`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '申请提交成功',
            icon: 'success'
          });
        }
      }
    });
  }
});

