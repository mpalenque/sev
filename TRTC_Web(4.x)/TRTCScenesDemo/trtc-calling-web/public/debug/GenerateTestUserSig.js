import * as LibGenerateTestUserSig from "./lib-generate-test-usersig.min.js";

/**
 *Tencent Cloud SDKAppId needs to be replaced with the SDKAppId under your own account.
 *
 *Enter Tencent Cloud Real-time Audio and Video [Console] (https://console.cloud.tencent.com/rav) to create an application and you will see the SDKAppId.
 *It is the unique identifier used by Tencent Cloud to distinguish customers.
 */
const SDKAPPID = 0;

/**
 *It is recommended not to set the signature expiration time too short.
 *<p>
 *Time unit: seconds
 *Default time: 7 x 24 x 60 x 60 = 604800 = 7 days
 */
const EXPIRETIME = 604800;

/**
 *The encryption key used to calculate the signature, the steps to obtain are as follows:
 *
 *step1. Enter Tencent Cloud Real-time Audio and Video [Console] (https://console.cloud.tencent.com/rav), if there is no application yet, create one.
 *step2. Click "Application Configuration" to enter the basic configuration page, and further find the "Account System Integration" section.
 *step3. Click the "View Key" button to see the encrypted key used to calculate UserSig. Please copy it to the following variable
 *
 *Note: This solution is only suitable for debugging Demo. Please migrate the UserSig calculation code and key to your backend server before official launch to avoid traffic theft caused by encryption key leakage.
 *Document: https://cloud.tencent.com/document/product/647/17275#Server
 */
const SECRETKEY = "";

/*
 *Module: GenerateTestUserSig
 *
 *Function: Used to generate UserSig for testing. UserSig is a security protection signature designed by Tencent Cloud for its cloud services.
 *The calculation method is to encrypt SDKAppID, UserID and EXPIRETIME, and the encryption algorithm is HMAC-SHA256.
 *
 *Attention: Please do not publish the following code into your online official version of the App for the following reasons:
 *
 *Although the code in this file can correctly calculate UserSig, it is only suitable for quickly adjusting the basic functions of the SDK and is not suitable for online products.
 *This is because the SECRETKEY in the client code is easily decompiled and reverse-engineered, especially the web-side code, which is almost zero difficulty in cracking.
 *Once your key is leaked, an attacker can calculate the correct UserSig to steal your Tencent Cloud traffic.
 *
 *The correct approach is to put the UserSig calculation code and encryption key on your business server, and then have the App obtain the real-time calculated UserSig from your server on demand.
 *Since it is more expensive to crack a server than a client app, a server-computed approach better protects your encryption keys.
 *
 *Reference: https://cloud.tencent.com/document/product/647/17275#Server
 */
export function genTestUserSig(userID) {
  const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userID);

  return {
    sdkAppID: SDKAPPID,
    userSig: userSig,
  };
}
