// credit-evaluation/index.js
Page({
  data: {
    creditScore: 0,
    creditLevel: '',
    currentDate: '',
    evaluationList: [
      { label: '学习表现', score: 0, fullScore: 100, description: '' },
      { label: '日常行为', score: 0, fullScore: 100, description: '' },
      { label: '参与活动', score: 0, fullScore: 100, description: '' },
      { label: '志愿服务', score: 0, fullScore: 100, description: '' }
    ],
    aiSuggestions: [],
    isLoading: true,
    userData: null
  },
  
  // 获取当前日期
  getCurrentDate: function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  onLoad: function (options) {
    console.log('信誉评估页面加载');
    // 设置当前日期
    const currentDate = this.getCurrentDate();
    this.setData({ 
      isLoading: true,
      currentDate: currentDate 
    });
    
    // 模拟获取用户数据
    this.fetchUserData().then(() => {
      // 进行AI评估
      this.performAIEvaluation();
    });
  },

  // 模拟获取用户数据
  fetchUserData: function() {
    return new Promise((resolve) => {
      // 这里应该是从服务器获取用户的真实数据
      // 现在使用模拟数据进行演示
      setTimeout(() => {
        const mockUserData = {
          studyPerformance: {
            gpa: 3.8,
            attendanceRate: 0.95,
            awardsCount: 3,
            failCourses: 0
          },
          dailyBehavior: {
            disciplineRecords: 0,
            dormitoryScore: 92,
            libraryVisits: 45,
            campusViolations: 0
          },
          activities: {
            joinedCount: 8,
            organizedCount: 2,
            activityHours: 64,
            activityFeedback: 4.8
          },
          volunteerService: {
            hours: 72,
            projectsCount: 5,
            serviceFeedback: 4.9
          }
        };
        
        this.setData({ userData: mockUserData });
        resolve();
      }, 1000);
    });
  },

  // 执行AI评估
  performAIEvaluation: function() {
    if (!this.data.userData) return;
    
    const data = this.data.userData;
    let evaluationList = [...this.data.evaluationList];
    let totalScore = 0;
    
    // 评估学习表现
    const studyScore = this.evaluateStudyPerformance(data.studyPerformance);
    evaluationList[0].score = studyScore;
    evaluationList[0].description = this.getStudyDescription(studyScore);
    totalScore += studyScore * 0.4; // 学习表现占40%
    
    // 评估日常行为
    const behaviorScore = this.evaluateDailyBehavior(data.dailyBehavior);
    evaluationList[1].score = behaviorScore;
    evaluationList[1].description = this.getBehaviorDescription(behaviorScore);
    totalScore += behaviorScore * 0.3; // 日常行为占30%
    
    // 评估参与活动
    const activityScore = this.evaluateActivities(data.activities);
    evaluationList[2].score = activityScore;
    evaluationList[2].description = this.getActivityDescription(activityScore);
    totalScore += activityScore * 0.15; // 参与活动占15%
    
    // 评估志愿服务
    const volunteerScore = this.evaluateVolunteerService(data.volunteerService);
    evaluationList[3].score = volunteerScore;
    evaluationList[3].description = this.getVolunteerDescription(volunteerScore);
    totalScore += volunteerScore * 0.15; // 志愿服务占15%
    
    // 计算总分和等级
    const finalScore = Math.round(totalScore);
    const level = this.getCreditLevel(finalScore);
    
    // 生成AI建议
    const suggestions = this.generateAISuggestions(evaluationList, finalScore);
    
    // 更新数据
    setTimeout(() => {
      this.setData({
        evaluationList,
        creditScore: finalScore,
        creditLevel: level,
        aiSuggestions: suggestions,
        isLoading: false
      });
    }, 800);
  },

  // 评估学习表现
  evaluateStudyPerformance: function(data) {
    let score = 0;
    // GPA评分 (0-4.0 scale)
    score += (data.gpa / 4.0) * 40;
    // 出勤率评分
    score += data.attendanceRate * 30;
    // 获奖情况评分
    score += Math.min(data.awardsCount * 5, 20);
    // 挂科扣分
    score -= data.failCourses * 10;
    return Math.max(0, Math.min(100, Math.round(score)));
  },

  // 评估日常行为
  evaluateDailyBehavior: function(data) {
    let score = 100;
    // 纪律记录扣分
    score -= data.disciplineRecords * 15;
    // 违纪记录严重扣分
    score -= data.campusViolations * 30;
    // 宿舍评分
    score = (score * 0.5) + (data.dormitoryScore * 0.5);
    // 图书馆访问加分
    score += Math.min(data.libraryVisits / 5, 10);
    return Math.max(0, Math.min(100, Math.round(score)));
  },

  // 评估活动参与
  evaluateActivities: function(data) {
    let score = 0;
    // 参与活动数量
    score += Math.min(data.joinedCount * 5, 40);
    // 组织活动数量
    score += Math.min(data.organizedCount * 10, 20);
    // 活动时长
    score += Math.min(data.activityHours / 4, 20);
    // 活动反馈
    score += (data.activityFeedback / 5) * 20;
    return Math.max(0, Math.min(100, Math.round(score)));
  },

  // 评估志愿服务
  evaluateVolunteerService: function(data) {
    let score = 0;
    // 服务时长
    score += Math.min(data.hours / 2, 50);
    // 项目数量
    score += Math.min(data.projectsCount * 8, 30);
    // 服务反馈
    score += (data.serviceFeedback / 5) * 20;
    return Math.max(0, Math.min(100, Math.round(score)));
  },

  // 获取信誉等级
  getCreditLevel: function(score) {
    if (score >= 90) return '优秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '一般';
    if (score >= 60) return '及格';
    return '较差';
  },

  // 获取学习表现描述
  getStudyDescription: function(score) {
    if (score >= 90) return '学习成绩优异，表现突出';
    if (score >= 80) return '学习态度认真，成绩良好';
    if (score >= 70) return '学习表现一般，仍有提升空间';
    if (score >= 60) return '学习基础薄弱，需要加强努力';
    return '学习表现较差，建议及时改进';
  },

  // 获取日常行为描述
  getBehaviorDescription: function(score) {
    if (score >= 90) return '行为规范，是同学的榜样';
    if (score >= 80) return '日常行为良好，遵守校纪校规';
    if (score >= 70) return '行为表现一般，偶有小问题';
    if (score >= 60) return '存在一些行为问题，需要注意改进';
    return '行为表现较差，需要深刻反思';
  },

  // 获取活动参与描述
  getActivityDescription: function(score) {
    if (score >= 90) return '积极参与各项活动，表现活跃';
    if (score >= 80) return '参与活动较多，有一定的活跃度';
    if (score >= 70) return '参与活动一般，可以更加积极';
    if (score >= 60) return '活动参与较少，建议多参与';
    return '几乎不参与活动，需要改变态度';
  },

  // 获取志愿服务描述
  getVolunteerDescription: function(score) {
    if (score >= 90) return '志愿服务表现突出，极具奉献精神';
    if (score >= 80) return '积极参与志愿服务，乐于奉献';
    if (score >= 70) return '有一定的志愿服务经历';
    if (score >= 60) return '志愿服务参与较少';
    return '几乎没有志愿服务经历';
  },

  // 生成AI建议
  generateAISuggestions: function(evaluationList, totalScore) {
    const suggestions = [];
    
    // 基于总分的建议
    if (totalScore >= 90) {
      suggestions.push('继续保持优秀表现，你已经成为校园中的佼佼者');
    } else if (totalScore >= 80) {
      suggestions.push('表现良好，继续努力可以更进一步');
    } else if (totalScore >= 70) {
      suggestions.push('整体表现一般，需要在多个方面加强');
    } else if (totalScore >= 60) {
      suggestions.push('目前处于及格边缘，需要付出更多努力');
    } else {
      suggestions.push('表现较差，建议制定详细的改进计划');
    }
    
    // 基于各个维度的建议
    evaluationList.forEach(item => {
      if (item.score < 70) {
        switch (item.label) {
          case '学习表现':
            suggestions.push('建议加强学习投入，提高出勤率，争取更好的成绩');
            break;
          case '日常行为':
            suggestions.push('注意遵守校纪校规，改善日常行为习惯');
            break;
          case '参与活动':
            suggestions.push('多参与校园活动，拓展社交圈，丰富校园生活');
            break;
          case '志愿服务':
            suggestions.push('积极参与志愿服务，培养社会责任感');
            break;
        }
      }
    });
    
    // 通用建议
    suggestions.push('定期查看信誉评分，了解自己的进步情况');
    
    return suggestions;
  },

  // 刷新评估
  onRefresh: function() {
    // 更新日期
    const currentDate = this.getCurrentDate();
    this.setData({ 
      isLoading: true,
      currentDate: currentDate 
    });
    
    setTimeout(() => {
      this.performAIEvaluation();
      wx.showToast({
        title: '评估已更新',
        icon: 'success'
      });
    }, 1500);
  },

  // 查看详细报告
  viewDetailedReport: function() {
    wx.showModal({
      title: 'AI评估详情',
      content: `基于您的个人数据，AI系统从学习表现、日常行为、参与活动和志愿服务四个维度进行了综合分析。\n\n您的综合评分为${this.data.creditScore}分，等级为${this.data.creditLevel}。\n\n详细报告将发送到您的消息中心，请注意查收。`,
      showCancel: false
    });
  }
});

