// message/index.js
Page({
  data: {
    messageList: [
      {
        id: 1,
        title: '信誉评估通知',
        content: '您的信誉评估已完成，请查看详情',
        time: '2小时前',
        read: false
      },
      {
        id: 2,
        title: '助学信贷审核',
        content: '您的助学信贷申请正在审核中',
        time: '5小时前',
        read: false
      },
      {
        id: 3,
        title: '校园活动邀请',
        content: '邀请您参加校园志愿服务',
        time: '1天前',
        read: true
      }
    ]
  },

  onLoad: function (options) {
    console.log('消息页面加载');
  },

  // 查看消息详情
  viewMessageDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '消息详情',
      content: `这是消息ID为${id}的详情`,
      showCancel: false
    });
  },

  // 清空消息
  clearMessages: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清空所有消息吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            messageList: []
          });
          wx.showToast({
            title: '已清空',
            icon: 'success'
          });
        }
      }
    });
  }
});

