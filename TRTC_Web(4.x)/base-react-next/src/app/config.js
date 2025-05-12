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

export { SDKAPPID, EXPIRETIME, SECRETKEY };
