// business-loan/index.js
Page({
  data: {
    loanInfo: {
      maxAmount: 50000,
      interestRate: '低息',
      term: '24个月'
    }
  },

  onLoad: function (options) {
    console.log('创业信贷页面加载');
  },

  applyLoan: function() {
    wx.showModal({
      title: '申请创业贷款',
      content: '最大额度: ' + this.data.loanInfo.maxAmount + '元',
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

