// life-loan/index.js
Page({
  data: {
    loanInfo: {
      maxAmount: 5000,
      interestRate: '免息',
      term: '12个月'
    },

  onLoad: function (options) {
    console.log('生活信贷页面加载');
  },

  // 返回按钮
  navigateBack: function() {
    wx.navigateBack();
  },

  // 应急贷申请
  applyEmergencyLoan: function() {
    wx.showModal({
      title: '申请应急贷',
      content: '应急贷款适用于紧急资金需求，最大额度5000元，3天内免息。',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '申请提交成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 消费贷申请
  applyConsumptionLoan: function() {
    wx.showModal({
      title: '申请消费贷',
      content: '消费贷款适用于日常消费，最大额度10000元，分期还款。',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '申请提交成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 额度查询
  checkLimit: function() {
    wx.showToast({
      title: '正在查询额度...',
      icon: 'loading'
    });
    setTimeout(() => {
      wx.showModal({
        title: '可用额度',
        content: '您的可用额度为: 5000元',
        showCancel: false
      });
    }, 1000);
  },

  // 还款计划
  repaymentPlan: function() {
    wx.showToast({
      title: '暂无还款计划',
      icon: 'none'
    });
  },

  // 贷款记录
  loanRecord: function() {
    wx.showToast({
      title: '暂无贷款记录',
      icon: 'none'
    });
  },

  // 贷款计划
  loanPlan: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 快捷入口
  quickEntry: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 优惠活动
  promotionActivity: function() {
    wx.showToast({
      title: '暂无优惠活动',
      icon: 'none'
    });
  },

  // AI回答功能（显示预设答案）
  goToAIAnswer: function(e) {
    const question = e.currentTarget.dataset.question;
    
    // 预设一些常见问题的回答
    const answers = {
      '如何申请应急贷': '申请应急贷的步骤：\n1. 点击"申请应急贷"按钮\n2. 阅读贷款说明并确认\n3. 等待系统审核（通常1-2小时内完成）\n4. 通过后资金将自动到账',
      '消费贷利率是多少': '消费贷款目前提供优惠利率，年化利率在3.6%-6.0%之间，具体根据您的信用评分确定。学生用户可享受首单3个月免息优惠。',
      '贷款额度如何提升': '提升贷款额度的方法：\n1. 保持良好的还款记录\n2. 完善个人信息和学籍认证\n3. 增加使用频率和还款次数\n4. 定期更新个人信息',
      '如何查询还款计划': '您可以通过以下方式查询还款计划：\n1. 点击"还款计划"按钮\n2. 在个人中心查看贷款详情\n3. 通过消息中心接收每月还款提醒'
    };
    
    // 获取答案，如果没有预设答案则显示通用回复
    const answer = answers[question] || '感谢您的提问！目前我们的AI功能正在不断完善中，\n\n对于您的问题："' + question + '"，\n建议您联系客服获取更详细的解答。\n客服工作时间：周一至周五 9:00-18:00';
    
    wx.showModal({
      title: 'AI回答',
      content: answer,
      showCancel: false,
      confirmText: '知道了',
      success: (res) => {
        if (res.confirm) {
          console.log('用户确认查看AI回答');
        }
      }
    });
  }
  }
});

