// student-loan/index.js
Page({
  data: {
    loanInfo: {
      maxAmount: 10000,
      interestRate: '免息',
      term: '36个月',
      applications: []
    }
  },

  onLoad: function (options) {
    console.log('助学信贷页面加载');
  },

  applyLoan: function() {
    wx.showModal({
      title: '申请助学贷款',
      content: '最大额度: ' + this.data.loanInfo.maxAmount + '元\n期限: ' + this.data.loanInfo.term,
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

