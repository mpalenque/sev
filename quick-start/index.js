import { ArSdk } from "tencentcloud-webar";
import sha256 from "sha256";

/** ----- Authentication configuration ----- */

/**
 * Tencent Cloud APPID
 *
 * View the APPID at [Tencent Cloud Account Center] (https://console.tencentcloud.com/developer)
 */
const APPID = "1358852517"; // your appid;

/**
 * Web LicenseKey
 *
 * Obtain a LicenseKey by creating a project at [Web License Management] (https://console.tencentcloud.com/magic/web)
 */
const LICENSE_KEY = "62dc005f0f91fe840eb38bd26bd978e7"; // your licenseKey;

/**
 * This Token is the secret key used for calculating the signature.
 *
 * Obtain a Token by creating a project at [Web License Management] (https://console.tencentcloud.com/magic/web)
 */
const token = "47a92265fa5d610342c208cc0d901860"; // 'your token';

/** ----------------------- */

/**
 * Obtain Signature Function
 *
 * WARNING: This is only for demo and debugging purposes.
 * In the production environment, please keep the Token on the server side and migrate the signature calculation method to the server side.
 * The signature can be obtained by calling the Interface from the front end.
 *
 * eg：
 * async function () {
 *  return fetch('http://xxx.com/get-ar-sign').then(res => res.json());
 * };
 */
const getSignature = function () {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = sha256(timestamp + token + APPID + timestamp).toUpperCase();
  return { signature, timestamp };
};

let width = 405;
let height = 720;

const makeups = [];
const stickers = [];
const filters = [];

const ar = new ArSdk({
  auth: {
    authFunc: getSignature,
    appId: APPID,
    licenseKey: LICENSE_KEY,
  },
  camera: {
    width,
    height,
    mirror: true,
  },
  // Loading config
  loading: {
    enable: true,
    lineWidth: 4,
  },
  // init beautify config
  beautify: {
    whiten: 0.0, // 0-1
    dermabrasion: 1,
    lift: 0.0,
    shave: 0,
    eye: 0,
    chin: 0,
  },
});

ar.on("created", () => {
  // fetch preset effect list
  ar.getEffectList({
    Type: "Preset",
  })
    .then((res) => {
      const list = res.map((item) => ({
        name: item.Name,
        id: item.EffectId,
        cover: item.CoverUrl,
        url: item.Url,
        label: item.Label,
        type: item.PresetType,
      }));
      console.log("list", list);
      makeups.push(...list.filter((item) => item.label.indexOf("Makeup") >= 0));
      stickers.push(
        ...list.filter((item) => item.label.indexOf("Sticker") >= 0)
      );
    })
    .catch((e) => {
      console.log(e);
    });

  // fetch preset filter list
  ar.getCommonFilter()
    .then((res) => {
      const list = res.map((item) => ({
        name: item.Name,
        id: item.EffectId,
        cover: item.CoverUrl,
        url: item.Url,
        label: item.Label,
        type: item.PresetType,
      }));
      filters.push(...list);
    })
    .catch((e) => {
      console.log(e);
    });
});

ar.on("ready", async (e) => {
  if (!APPID || !LICENSE_KEY || !token) {
    throw new Error("please enter APPID and LICENSE_KEY");
  }
  const mediaStream = await ar.getOutput();
  const video = document.createElement("video");
  video.setAttribute("playsinline", "");
  video.crossOrigin = "anonymous";
  document.body.appendChild(video);
  video.addEventListener("canplay", () => {
    video.play();
  });
  video.srcObject = mediaStream;

  // set Beautify
  // ar.setBeautify({
  //   whiten:
  //   dermabrasion:
  //   lift:
  //   shave:
  //   eye:
  //   chin:
  // })
  // set makeup and sticker
  // if (!makeups?.length) return;
  ar.setEffect([
    // {
    //   id: makeups[0].id,
    //   intensity: 1,
    //   filterIntensity: 0, // preset filter in makeup package
    // },
    // stickers[0].id, // Casco 3D (sticker) desactivado
  ]);
  // set filter(extra filter)
  ar.setFilter(filters[0].id);
});

ar.on("error", (e) => {
  console.log(e);
});
