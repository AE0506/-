// app.js
App({
  globalData: {
    userInfo: null,
    token: null,
    hasLogin: false
  },

  onLaunch: function() {
    console.log('小程序启动');
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    
    // 检查是否有已登录的用户信息
    this.checkLoginStatus();
  },
  
  // 检查登录状态
  checkLoginStatus: function() {
    const token = wx.getStorageSync('userToken');
    const userInfo = wx.getStorageSync('userInfo');
    
    if (token && userInfo) {
      // 验证token是否有效（实际项目中应该调用后端接口验证）
      this.validateToken(token).then(valid => {
        if (valid) {
          this.globalData.token = token;
          this.globalData.userInfo = userInfo;
          this.globalData.hasLogin = true;
          console.log('用户已登录');
        } else {
          // Token无效，清除存储的信息
          this.logout();
        }
      });
    }
  },
  
  // 验证Token（模拟）
  validateToken: function(token) {
    return new Promise((resolve) => {
      // 实际项目中应该调用后端接口验证token
      setTimeout(() => {
        resolve(true); // 模拟token有效
      }, 300);
    });
  },
  
  // 微信登录
  login: function() {
    return new Promise((resolve, reject) => {
      // 显示登录中提示
      wx.showLoading({ title: '登录中...' });
      
      // 调用微信登录接口
      wx.login({
        success: res => {
          if (res.code) {
            console.log('获取微信登录code成功', res.code);
            
            // 调用后端接口换取openId和session_key
            // 这里使用模拟数据，实际项目中应该调用真实接口
            this.getTokenFromServer(res.code).then(result => {
              if (result.success) {
                // 保存token
                this.globalData.token = result.token;
                wx.setStorageSync('userToken', result.token);
                
                // 获取用户信息
                this.getUserProfile().then(userInfo => {
                  wx.hideLoading();
                  this.globalData.userInfo = userInfo;
                  this.globalData.hasLogin = true;
                  wx.setStorageSync('userInfo', userInfo);
                  resolve(userInfo);
                }).catch(err => {
                  wx.hideLoading();
                  reject(err);
                });
              } else {
                wx.hideLoading();
                reject(new Error('登录失败'));
              }
            }).catch(err => {
              wx.hideLoading();
              reject(err);
            });
          } else {
            wx.hideLoading();
            reject(new Error('登录失败：' + res.errMsg));
          }
        },
        fail: err => {
          wx.hideLoading();
          reject(err);
        }
      });
    });
  },
  
  // 从服务器获取token（模拟）
  getTokenFromServer: function(code) {
    return new Promise((resolve) => {
      // 实际项目中应该调用后端接口
      setTimeout(() => {
        resolve({
          success: true,
          token: 'mock_token_' + Date.now(),
          openId: 'mock_openid_' + Math.random().toString(36).substr(2, 9)
        });
      }, 1000);
    });
  },
  
  // 获取用户信息
  getUserProfile: function() {
    return new Promise((resolve, reject) => {
      // 使用wx.getUserProfile获取用户信息（微信推荐的方式）
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: res => {
          console.log('获取用户信息成功', res.userInfo);
          resolve({
            ...res.userInfo,
            studentId: '2021' + Math.floor(Math.random() * 10000).toString().padStart(4, '0')
          });
        },
        fail: err => {
          console.error('获取用户信息失败', err);
          // 如果用户拒绝授权，使用默认信息
          resolve({
            nickName: '匿名用户',
            avatarUrl: '',
            studentId: '未设置学号'
          });
        }
      });
    });
  },
  
  // 退出登录
  logout: function() {
    this.globalData.userInfo = null;
    this.globalData.token = null;
    this.globalData.hasLogin = false;
    wx.removeStorageSync('userToken');
    wx.removeStorageSync('userInfo');
    console.log('用户已退出登录');
  }
})

