// search/index.js
Page({
  data: {
    searchValue: '',
    hotKeywords: ['助学贷款', '创业扶持', '勤工俭学', '公益活动', '校园活动', '生活缴费'],
    historyKeywords: [],
    searchResults: []
  },

  onLoad: function (options) {
    // 加载历史搜索
    this.loadHistory();
  },

  // 加载搜索历史
  loadHistory: function() {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({
      historyKeywords: history
    });
  },

  // 输入搜索内容
  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  // 执行搜索
  onSearch: function() {
    const keyword = this.data.searchValue.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      });
      return;
    }

    // 保存搜索历史
    this.saveSearchHistory(keyword);

    // 执行搜索
    wx.showLoading({
      title: '搜索中...'
    });

    // 模拟搜索
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: `搜索: ${keyword}`,
        icon: 'none'
      });
    }, 1000);
  },

  // 点击热门关键词
  onHotKeywordClick: function(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      searchValue: keyword
    });
    this.onSearch();
  },

  // 点击历史搜索
  onHistoryKeywordClick: function(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      searchValue: keyword
    });
    this.onSearch();
  },

  // 保存搜索历史
  saveSearchHistory: function(keyword) {
    let history = wx.getStorageSync('searchHistory') || [];
    // 移除重复项
    history = history.filter(item => item !== keyword);
    // 添加到开头
    history.unshift(keyword);
    // 只保留最近10条
    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    // 保存
    wx.setStorageSync('searchHistory', history);
    this.setData({
      historyKeywords: history
    });
  },

  // 清空历史
  clearHistory: function() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('searchHistory');
          this.setData({
            historyKeywords: []
          });
        }
      }
    });
  }
});

