/**
 *Attention: Please do not publish the following code into your online official version of the App for the following reasons:
 *
 *Although the code in this file can correctly calculate UserSig, it is only suitable for quickly adjusting the basic functions of the SDK and is not suitable for online products.
 *This is because the SECRETKEY in the client code is easily decompiled and reverse-engineered, especially the web-side code, which is almost zero difficulty in cracking.
 *Once your key is leaked, an attacker can calculate the correct UserSig to steal your Tencent Cloud traffic.
 *
 *The correct approach is to put the UserSig calculation code and encryption key on your business server, and then have the App obtain the real-time calculated UserSig from your server on demand.
 *Since it is more expensive to crack a server than a client app, a server-computed approach better protects your encryption keys.
 *Document: https://cloud.tencent.com/document/product/647/17275#Server
 */
import { SDKAPPID, SECRETKEY, EXPIRETIME } from "@app/config";
import LibGenerateTestUserSig from "@app/lib-generate-test-usersig.min.js";

//a soft reminder to guide developer to configure sdkAppId/secretKey
if (SDKAPPID === "" || SECRETKEY === "") {
  alert(
    "Please configure your account information first: SDKAPPID and SECRETKEY " +
      "\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in src/app/config.js"
  );
}

const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);

/**
 *Get userSig and privateMapKey
 *@param {string} userID username
 */
export async function getLatestUserSig(userID) {
  const userSig = generator.genTestUserSig(userID);
  return {
    userSig,
    privateMapKey: 255,
  };
}
