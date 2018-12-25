// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newId: '',
    titleText: "",
    newsSubTitle: "",
    readCount: "",
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: ''
      },
      children: [{
        type: '',
        text: ''
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsId: options.id
    })
    this.getNewsDetail()
  },
  getNewsDetail(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsId
      },
      success: res => {
        this.setNewsDetail(res)
      },
      fail: res => {
        console.log(res)
      },
      complete: () => {
        callback && callback()
      }
    })
  },

  setNewsDetail(res) {
    let result = res.data.result
    let titleText = result.title
    let readCount = '阅读' + "\xa0\xa0 " + result.readCount
    let newsSubTitle = `${result.source || '来源未知 '}` + "\xa0\xa0 " + `${result.date.substring(11, 16)}`
    let nodes = []
    for (let i = 0; i < result.content.length; i++) {

      if (result.content[i].type === "image") {
        nodes.push({
          name: 'img',
          attrs: {
            class: 'img_class',
            src: result.content[i].src
          }
        })
      }
      else {
        nodes.push({
          name: result.content[i].type,
          attrs: {
            class:'p_class',
          },
          children: [{
          type: `${result.content[i].type === "p" ? 'text' : result.content[i].type}`,
          text: `${result.content[i].text}`
          }]
        })
      }
      this.setData({
        titleText: titleText,
        readCount: readCount,
        newsSubTitle: newsSubTitle,
        nodes: nodes
      })
    }
  },

  // 返回前一页面
  onTapNavBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  onPullDownRefresh() {
    this.getNewsDetail(() => {
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})