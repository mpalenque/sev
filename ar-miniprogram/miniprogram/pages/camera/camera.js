//Reference method for versions 0.3.0 and later (2 files + initialize 3d module on demand)
import "../../miniprogram_npm/tencentcloud-webar/lib.js";
import "../../miniprogram_npm/tencentcloud-webar/core.js";
//Initialize the 3D plug-in on demand. If you don't need 3D, you don't need to reference it.
import "../../miniprogram_npm/tencentcloud-webar/lib-3d.js";
import { plugin3d } from "../../miniprogram_npm/tencentcloud-webar/plugin-3d";
//Import ArSdk
import { ArSdk } from "../../miniprogram_npm/tencentcloud-webar/index.js";
import { default as localStorage } from "../../utils/localStorage";
import sha256 from "../../utils/sha256";

/**-----Authentication configuration -----*/

/**
 *Tencent Cloud APPID
 *
 *View the APPID at [Tencent Cloud Account Center] (https://console.tencentcloud.com/developer)
 */
const APPID = ""; //your appid;

/**
 *Web LicenseKey
 *
 *Obtain a LicenseKey by creating a project at [Web License Management] (https://console.tencentcloud.com/magic/web)
 */
const LICENSE_KEY = ""; //your licenseKey;

/**
 *This Token is the secret key used for calculating the signature.
 *
 *Obtain a Token by creating a project at [Web License Management] (https://console.tencentcloud.com/magic/web)
 */
const token = ""; //'your token';

/**-----------------------*/
const BEAUTY_OPTION_LIST = [
  {
    name: "whitening",
    key: "whiten",
  },
  {
    name: "dermabrasion",
    key: "dermabrasion",
  },
  {
    name: "face-slimming",
    key: "lift",
  },
  {
    name: "shaving face",
    key: "shave",
  },
  {
    name: "Big Eye",
    key: "eye",
  },
  {
    name: "chin",
    key: "chin",
  },
];
Page({
  /**
   *Initial data of the page
   */
  data: {
    backBtnTop: 40, //Return to button position
    beautyOptions: BEAUTY_OPTION_LIST,
    beautyValue: undefined,
    showFilter: undefined,
    showBeauty: undefined,
    showMakeup: undefined,
    showSticker: undefined,
    activeOptName: undefined,
    recordStatus: "",
  },

  /**
   *Life cycle function--listen to page loading
   */
  onLoad: function (options) {},

  /**
   *Life cycle function--listen to the completion of the initial rendering of the page
   */
  onReady: function () {
    this.init();
    this.start();
  },

  onShow: function () {},
  init() {
    this.data._beauty = {
      whiten: 0.1,
      dermabrasion: 0.5,
      lift: 0,
      shave: 0,
      eye: 0.2,
      chin: 0,
    };
    this.data._makeupId = this.data._stickerId = "none";
    this.setData({
      beautyValue: { ...this.data._beauty },
      recordStatus: "paused",
    });
  },

  async start() {
    wx.showLoading({
      title: "Initializing...",
    });

    const canvas = await this.getCanvasNode();
    const sdk = new ArSdk({
      auth: {
        authFunc: this.getSignature,
        appId: APPID,
        licenseKey: LICENSE_KEY, //Console default key
      },
      camera: {
        width: 720,
        height: 1280,
      },
      output: canvas,
      beautify: this.data._beauty, //Default beauty parameters
      loading: {
        enable: true,
        lineWidth: 8,
        strokeColor: 0xffffff,
        size: 100,
      },
    });

    sdk.on("error", (error) => {
      console.log("sdk error", error);
    });
    this.sdk = sdk;
    //Need to obtain material information in the created callback
    sdk.on("created", async (_) => {
      await this.preloadResources();
      wx.hideLoading();
    });
  },

  /**
   *Define the signature acquisition method
   *
   *Note: It is recommended that the signature method be implemented on the server side, provided through the interface, and the front-end calls to pull the signature. In order to help you run through it quickly, the signature is calculated on the front-end.
   *like:
   *getSignature(){
   *return new Promise((resolve,reject)=>{
   *wx.request({
   *url: 'https://xxx.com/get-ar-sign',
   *method: 'GET',
   *success(res) {
   *console.log('getSignature ok', res)
   *         resolve(res.data);
   *      },
   *      fail(e){
   *        console.log('getSignature error', e)
   *      }
   *    })
   *  })
   *},
   */
  getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = sha256(
      timestamp + token + APPID + timestamp
    ).toUpperCase();
    return { signature, timestamp };
  },

  async getCanvasNode() {
    return new Promise((resolve) => {
      this.createSelectorQuery()
        .select("#main-canvas")
        .node()
        .exec((res) => {
          const canvasNode = res[0].node;
          resolve(canvasNode);
        });
    });
  },

  onClickRecord() {
    if (this.data.recordStatus !== "recording") {
      this.startRecord();
    } else {
      this.stopRecord();
    }
  },
  async stopRecord() {
    wx.showLoading({
      title: "Video processing",
    });
    const result = await this.sdk.stopRecord();
    this.setData({
      recordStatus: "paused",
    });
    console.log("export result", result);
    const { tempFilePath } = result;
    wx.hideLoading();
    wx.navigateTo({
      url: `../export/export?file=${tempFilePath}`,
    });
  },

  async startRecord() {
    await this.sdk.startRecord();
    this.setData({
      recordStatus: "recording",
    });
  },
  onClickFilterIcon() {
    this.setData({
      showFilter: true,
      activeOptName: "showFilter",
    });
  },
  onClickBeautyIcon() {
    this.setData({
      showBeauty: true,
      activeOptName: "showBeauty",
    });
  },
  onClickMakeupIcon() {
    this.setData({
      showMakeup: true,
      activeOptName: "showMakeup",
    });
  },
  onClickStickerIcon() {
    this.setData({
      showSticker: true,
      activeOptName: "showSticker",
    });
  },
  //Mask layer click event
  onClickMask() {
    this.setData({
      [this.data.activeOptName]: false,
    });
  },
  preloadResources() {
    const getFilterList = () => {
      return new Promise(async (resolve, reject) => {
        let cache = localStorage.getItem("filter"); //Simple caching strategy, avoid calling the interface every time, adjust according to your own business needs
        if (!cache) {
          const filterList = await this.sdk.getCommonFilter(); //Get the built-in filter through the getCommonFilter interface of sdk
          cache = filterList.map((f) => {
            return {
              name: f.Name,
              previewImage: f.CoverUrl,
              key: "filter-" + f.EffectId,
              weight: f.Weight,
            };
          });
          localStorage.setItem("filter", cache);
        }
        cache.sort((a, b) => b.weight - a.weight);
        cache.unshift({
          key: "none",
          name: "None",
          selected: true,
          previewImage:
            "https://webar-static.tencent-cloud.com/assets/icon/none.png",
        });
        this.setData({
          filterList: cache,
        });
        resolve(cache);
      });
    };
    const getEffectList = () => {
      return new Promise(async (resolve, reject) => {
        let cache = localStorage.getItem("effect");
        if (!cache) {
          //Get the list of built-in makeup and stickers
          const effectList = await this.sdk.getEffectList({
            Type: "Preset",
          });
          cache = effectList.map((f) => {
            return {
              name: f.Name,
              previewImage: f.CoverUrl,
              key: "effect-" + f.EffectId,
              label: f.Label,
              weight: f.Weight,
            };
          });
          localStorage.setItem("effect", cache);
        }
        //console.log('cache',cache)
        const makeupList = cache.filter(
          (item) => item.label.indexOf("Makeup") >= 0
        );
        const stickerList = cache.filter(
          (item) => item.label.indexOf("Sticker") >= 0
        );
        //makeupList.sort((a,b)=>b.weight-a.weight)
        makeupList.unshift({
          key: "none",
          name: "None",
          selected: true,
          previewImage:
            "https://webar-static.tencent-cloud.com/assets/icon/none.png",
        });
        //stickerList.sort((a,b)=>b.weight-a.weight)
        stickerList.unshift({
          key: "none",
          name: "None",
          selected: true,
          previewImage:
            "https://webar-static.tencent-cloud.com/assets/icon/none.png",
        });
        this.setData({
          makeupList,
          stickerList,
        });
        resolve(cache);
      });
    };
    Promise.all([getFilterList(), getEffectList()]).then(() => {
      console.log("preloadResources success");
    });
  },
  onChangeFilter(e) {
    let { id } = e.detail;
    if (id === "none") {
      this.sdk.setFilter("", 0); //Clear filter effect
      return;
    }
    const parts = id.split("-");
    parts.shift();
    id = parts.join("-");
    this.sdk.setFilter(id);
  },
  onChangeMakeup(e) {
    let { id } = e.detail;
    if (id === "none") {
      this.data._makeupId = "none";
      this.sdk.setEffect(
        this.data._stickerId === "none" ? [] : [this.data._stickerId]
      ); //Clear the beauty effects
      return;
    }
    const parts = id.split("-");
    parts.shift();
    id = parts.join("-");
    this.data._makeupId = id;
    this.sdk.setEffect(
      this.data._stickerId === "none" ? [id] : [id, this.data._stickerId]
    );
  },
  onChangeSticker(e) {
    let { id } = e.detail;
    if (id === "none") {
      this.data._stickerId = "none";
      this.sdk.setEffect(
        this.data._makeupId === "none" ? [] : [this.data._makeupId]
      ); //Clear sticker effect
      return;
    }
    const parts = id.split("-");
    parts.shift();
    id = parts.join("-");
    this.data._stickerId = id;
    this.sdk.setEffect(
      this.data._makeupId === "none" ? [id] : [this.data._makeupId, id]
    );
  },
  onChangeBeauty(e) {
    const key = e.currentTarget.dataset.key;
    this.data._beauty[key] = e.detail.value / 100; //Data normalization
    this.sdk.setBeautify(this.data._beauty);
  },
  onUnload() {
    console.log("onUnload");
    this.sdk && this.sdk.destroy();
  },
});
