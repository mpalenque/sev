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

/** ----------------------- */

/**
 * Obtain Signature Function
 *
 * Fetches the signature from a secure backend endpoint.
 */
const getSignature = async function () {
  // REEMPLAZA ESTA URL con la URL real de tu endpoint de backend desplegado
  const backendSignatureUrl = 'https://TU_ENDPOINT_DE_BACKEND_AQUI.com/get-ar-sign';

  try {
    const response = await fetch(backendSignatureUrl, {
      method: 'POST', // o 'GET', según cómo hayas diseñado tu backend
      headers: {
        'Content-Type': 'application/json',
      },
      // Puedes enviar el APPID si tu backend lo espera, o si el backend ya lo conoce
      body: JSON.stringify({ appId: APPID }) 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from backend:', response.status, errorText);
      throw new Error(`Failed to get signature from server: ${response.status}`);
    }

    const data = await response.json();
    if (!data.signature || typeof data.timestamp === 'undefined') {
      console.error('Invalid response from signature server:', data);
      throw new Error('Invalid signature data from server');
    }
    return { signature: data.signature, timestamp: data.timestamp };
  } catch (error) {
    console.error('Error fetching signature:', error);
    // Es importante que el SDK de AR sepa que la autenticación falló.
    // Lanzar el error o devolver una promesa rechazada es una forma.
    throw error; 
  }
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
  if (!APPID || !LICENSE_KEY) {
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
