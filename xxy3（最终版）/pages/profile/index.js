// profile/index.js
const app = getApp();

Page({
  data: {
    userInfo: {
      nickName: '未登录',
      avatarUrl: '',
      studentId: '请先登录'
    },
    menuList: [
      {
        icon: '📋',
        title: '我的申请',
        path: '/pages/my-applications/index'
      },
      {
        icon: '⭐',
        title: '信用记录',
        path: '/pages/credit-record/index'
      },
      {
        icon: '💰',
        title: '我的资产',
        path: '/pages/my-assets/index'
      },
      {
        icon: '🔔',
        title: '消息设置',
        path: '/pages/notifications/index'
      },
      {
        icon: '❓',
        title: '帮助中心',
        path: '/pages/help/index'
      },
      {
        icon: '⚙️',
        title: '设置',
        path: '/pages/settings/index'
      }
    ],
    hasLogin: false
  },

  onLoad: function (options) {
    console.log('我的页面加载');
  },
  
  onShow: function() {
    // 每次页面显示时检查登录状态并更新用户信息
    this.checkLoginStatus();
  },
  
  // 检查登录状态
  checkLoginStatus: function() {
    const hasLogin = app.globalData.hasLogin;
    const userInfo = app.globalData.userInfo;
    
    if (hasLogin && userInfo) {
      this.setData({
        hasLogin: true,
        userInfo: userInfo
      });
    } else {
      // 尝试从本地存储获取用户信息
      const storedUserInfo = wx.getStorageSync('userInfo');
      if (storedUserInfo) {
        this.setData({
          hasLogin: true,
          userInfo: storedUserInfo
        });
      }
    }
  },

  // 点击菜单项
  onMenuClick: function(e) {
    const path = e.currentTarget.dataset.path;
    
    // 检查是否需要登录才能访问
    if (!this.data.hasLogin) {
      wx.showModal({
        title: '需要登录',
        content: '请先登录后再使用此功能',
        showCancel: false,
        success: () => {
          this.handleLogin();
        }
      });
      return;
    }
    
    wx.showModal({
      title: '提示',
      content: `将跳转到: ${path}`,
      showCancel: false
    });
    // 实际项目中在这里使用 wx.navigateTo
    // wx.navigateTo({ url: path });
  },

  // 查看个人信息
  viewProfile: function() {
    if (!this.data.hasLogin) {
      this.handleLogin();
      return;
    }
    
    wx.showModal({
      title: '个人信息',
      content: `姓名: ${this.data.userInfo.nickName}\n学号: ${this.data.userInfo.studentId}`,
      showCancel: false
    });
  },

  // 处理登录
  handleLogin: function() {
    wx.showModal({
      title: '微信登录',
      content: '是否使用微信账号登录？',
      success: (res) => {
        if (res.confirm) {
          app.login().then(userInfo => {
            this.setData({
              hasLogin: true,
              userInfo: userInfo
            });
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
          }).catch(err => {
            console.error('登录失败', err);
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            });
          });
        }
      }
    });
  },

  // 退出登录
  logout: function() {
    if (!this.data.hasLogin) return;
    
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 调用app的退出登录方法
          app.logout();
          
          // 更新页面状态
          this.setData({
            hasLogin: false,
            userInfo: {
              nickName: '未登录',
              avatarUrl: '',
              studentId: '请先登录'
            }
          });
          
          wx.showToast({
            title: '已退出',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 手动登录按钮
  loginButtonTap: function() {
    if (this.data.hasLogin) {
      this.viewProfile();
    } else {
      this.handleLogin();
    }
  }
});

