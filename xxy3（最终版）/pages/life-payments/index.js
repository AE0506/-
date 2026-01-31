// life-payments/index.js
Page({
  data: {
    paymentList: [
      {
        id: 1,
        name: '电费',
        icon: '⚡',
        color: '#ffd700'
      },
      {
        id: 2,
        name: '水费',
        icon: '💧',
        color: '#1890ff'
      },
      {
        id: 3,
        name: '网费',
        icon: '🌐',
        color: '#52c41a'
      },
      {
        id: 4,
        name: '食堂充值',
        icon: '🍽️',
        color: '#f5222d'
      },
      {
        id: 5,
        name: '洗衣机',
        icon: '🎽',
        color: '#667eea'
      },
      {
        id: 6,
        name: '其他费用',
        icon: '📋',
        color: '#999999'
      }
    ]
  },

  onLoad: function (options) {
    console.log('生活缴费页面加载');
  },

  payBill: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '缴费',
      content: `选择缴费项目ID: ${id}`,
      showCancel: false
    });
  }
});

