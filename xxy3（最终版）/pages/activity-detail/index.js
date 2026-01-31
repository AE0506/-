// activity-detail/index.js
Page({
  data: {
    activityInfo: {
      title: '勤工俭学，服务校园',
      subTitle: '校园志愿服务项目',
      image: '',
      participants: 586,
      location: '校园各处',
      date: '2024年1月-6月',
      organizer: '学生工作处',
      description: '通过参与勤工俭学项目，为校园提供服务，同时获得实践机会和相应补助。',
      requirements: [
        '在校学生',
        '品德优良',
        '学习成绩良好',
        '有责任心'
      ],
      benefits: [
        '获得实践机会',
        '提升综合素质',
        '每月补助津贴',
        '评优评先加分'
      ]
    },
    hasJoined: false
  },

  onLoad: function (options) {
    console.log('活动详情页面加载');
  },

  // 参与活动
  joinActivity: function() {
    if (this.data.hasJoined) {
      wx.showToast({
        title: '您已参与',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '确认参与',
      content: '确定要参与本次活动吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            hasJoined: true
          });
          wx.showToast({
            title: '参与成功',
            icon: 'success'
          });
          // 更新参与人数
          this.setData({
            'activityInfo.participants': this.data.activityInfo.participants + 1
          });
        }
      }
    });
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: this.data.activityInfo.title,
      path: '/pages/activity-detail/index',
      imageUrl: this.data.activityInfo.image
    };
  }
});

