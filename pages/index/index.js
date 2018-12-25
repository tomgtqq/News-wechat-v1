Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsCategory: [
      { name: '国内', value: 'gn', checked: 'true' },
      { name: '国际', value: 'gj' },
      { name: '财经', value: 'cj' },
      { name: '娱乐', value: 'yl' },
      { name: '军事', value: 'js' },
      { name: '体育', value: 'ty' },
      { name: '其他', value: 'other' }
    ],
    textWhite: '#ffffff',
    textGrey: '#888888',
    textBold: 'bold',
    textNormal: 'normal',
    news: [],
    newsType: 'gn',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews()
  },
  getNews(callback) {
    //获取网络JSON数据
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newsType
      },
      success: res => {
        let result = res.data.result
        let news = []
        for (let i = 0; i < result.length; i += 1) {
          news.push({
            id: result[i].id,
            title: result[i].title,
            newsSubTitle: `${result[i].source || '来源未知 '}` +"\xa0\xa0 "+ `${result[i].date.substring(11, 16)}`,
            firstImage: result[i].firstImage
          })
        }
        this.setData({
          news: news
        })
      },
      fail: res => {
        console.log(res)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  newsTypeSelect(res) {
    console.log('发生change事件，携带value值为：', res.detail.value)
    var checked = res.detail.value
    this.setData({
      newsType: checked
    })
    var changed = {}
    for (var i = 0; i < this.data.newsCategory.length; i++) {
      if (checked.indexOf(this.data.newsCategory[i].value) !== -1) {
        changed['newsCategory[' + i + '].checked'] = true
      } else {
        changed['newsCategory[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    this.getNews()
  },

  onTapShowDetail(event){
    console.log(event.currentTarget.dataset.newsId)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.newsId
    })
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})