//pages/export/export.js
Page({
  /**
   *Initial data of the page
   */
  data: {
    file: "",
    backBtnTop: 40,
  },

  /**
   *Life cycle function--listen to page loading
   */
  onLoad: function (options) {
    this.setData({
      file: options.file,
    });
  },

  /**
   *Life cycle function--listen to the completion of the initial rendering of the page
   */
  onReady: function () {},

  /**
   *Life cycle function--monitoring page display
   */
  onShow: function () {},
  onClickExport() {
    wx.saveVideoToPhotosAlbum({
      filePath: this.data.file,
      success: () => {
        wx.showToast({
          title: "Export successful!",
        });
        setTimeout((_) => {
          wx.navigateBack({
            delta: 2,
          });
        }, 1000);
      },
    });
  },
  goBack() {
    wx.showModal({
      title: "Tips",
      content:
        "Returning will lose the current shooting effect. Are you sure you want to return? ",
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        } else if (res.cancel) {
          console.log("User clicks cancel");
        }
      },
    });
  },
});
