This article mainly introduces how to quickly run through the web version of TRTCCalling Demo. The Demo includes voice call and video call scenarios:

\-Voice call: pure voice interaction, supports multi-person interactive voice chat.

\-Video call: Video call, for online customer service and other communication scenarios that require face-to-face communication.

### Environmental requirements

*Please use the latest version of Chrome browser.
*TRTCCalling relies on the following ports for data transmission. Please add them to the firewall whitelist. After the configuration is completed, you can visit and experience [official website Demo](https://web.sdk.qcloud.com/component/trtccalling/demo/web/latest/index.html) Check whether the configuration takes effect.
-TCP port: 8687
-UDP ports: 8000, 8080, 8800, 843, 443, 16285
-Domain name: qcloud.rtc.qq.com

> -Generally, to experience the Demo, you need to deploy it to the server and access it through https://domain name/xxx, or build the server directly locally and access it through the localhost: port.
> -At present, the desktop Chrome browser supports the TRTC desktop browser SDK and the related features are relatively complete, so it is recommended to use the Chrome browser for experience.

### Prerequisites

You have [registered a Tencent Cloud](https://cloud.tencent.com/document/product/378/17985) account and completed [real-name authentication](https://cloud.tencent.com/document/product/378 /3629).

### Reuse Demo’s UI interface

<span id="step1"></span>

#### Step 1: Create a new application

1. Log in to the real-time audio and video console, select [Development Assistance] > [Quick Run Demo] (https://console.cloud.tencent.com/trtc/quickstart)].

2. Click [Start Now], enter the application name, such as `TestTRTC`, and click [Create Application].

<span id="step2"></span>

#### Step 2: Download SDK and Demo source code

2. Move the mouse to the corresponding card, click [[Github](https://github.com/tencentyun/TRTCSDK/tree/master/Web/TRTCScenesDemo/trtc-calling-web)] to jump to Github (or click [[ZIP](https://web.sdk.qcloud.com/trtc/webrtc/download/webrtc_latest.zip)]), download the relevant SDK and supporting Demo source code.
   ![](https://main.qcloudimg.com/raw/0f35fe3bafe9fcdbd7cc73f991984d1a.png)
3. After the download is completed, return to the real-time audio and video console and click [I have downloaded, Next] to view the SDKAppID and key information.

<span id="step3"></span>

#### Step 3: Configure Demo project file

1. Unzip the source code package downloaded in [Step 2](#step2).
2. Find and open the `Web/TRTCScenesDemo/TRTCCalling/public/debug/GenerateTestUserSig.js` file.

3. Set the relevant parameters in the `GenerateTestUserSig.js` file:

  <ul><li>SDKAPPID: The default is 0, please set it to the actual SDKAppID. </li>

  <li>SECRETKEY: The default is an empty string, please set it to the actual key information. </li></ul>

  <img src="https://main.qcloudimg.com/raw/0ae7a197ad22784384f1b6e111eabb22.png">

4. Return to the real-time audio and video console and click [Paste Complete, Next].

5. Click [Close the guide and enter the console management application].

> The solution for generating UserSig mentioned in this article is to configure SECRETKEY in the client code. In this method, SECRETKEY can easily be decompiled and reversely cracked. Once your key is leaked, the attacker can steal your Tencent Cloud traffic, so\***\*This method is only suitable for local run-through Demo and functional debugging\*\***.
> The correct way to issue UserSig is to integrate the UserSig calculation code into your server and provide an App-oriented interface. When UserSig is needed, your App initiates a request to the business server to obtain the dynamic UserSig. For more details, please see [Server-side generation of UserSig](https://cloud.tencent.com/document/product/647/17275#Server).

#### Step 4: Run Demo

> -Synchronization dependencies: npm install
> -Start the project: npm run serve
> -Open the link in the browser: http://localhost:8080/

-The Demo running interface is as shown in the figure:
![](https://main.qcloudimg.com/raw/90118deded971621db7bb14b55073bcc.png)
-Enter the user userid and click [Login]
![](https://main.qcloudimg.com/raw/f430fb067cddbb52ba32e4d0660cd331.png)
-Enter the calling user userid to make a video call
![](https://main.qcloudimg.com/raw/66562b4c14690de4eb6f2da58ee6f4df.png)
-video call
![](https://main.qcloudimg.com/raw/592189d0f18c91c51cdf7184853c6437.png)

### Implement custom UI interface

#### Step 1: Integrate SDK

NPM integration

> From v0.6.0 onwards, you need to manually install the dependencies [trtc-js-sdk](https://www.npmjs.com/package/trtc-js-sdk) and [tim-js-sdk](https://www.npmjs.com/package/tim-js-sdk) and [tsignaling](https://www.npmjs.com/package/tsignaling)
> -In order to reduce the size of trtc-calling-js.js and avoid version conflicts with trtc-js-sdk, tim-js-sdk and tsignaling already used on the access side, trtc-js-sdk and tim-js-sdk and tsignaling are no longer packaged in trtc-calling-js.js. You need to manually install the dependencies before use.

```javascript
  npm i trtc-js-sdk --save
  npm i tim-js-sdk --save
  npm i tsignaling --save
  npm i trtc-calling-js --save

  //If you use trtc-calling-js through script, you need to manually introduce trtc.js in order
  <script src="./trtc.js"></script>

  //Then manually introduce tim-js.js
  <script src="./tim-js.js"></script>

  //Then manually introduce tsignaling.js
<script src="./tsignaling.js"></script>

  //Finally, manually introduce trtc-calling-js.js
  <script src="./trtc-calling-js.js"></script>
```

Import modules into project scripts

```javascript
import TrtcCalling from "trtc-calling-js";
```

#### Step 2: Create trtcCalling object

> -sdkAppID: the sdkAppID you applied for from Tencent Cloud

```javascript
let options = {
  SDKAppID: 0, //You need to replace 0 with the SDKAppID of your cloud communication application when accessing
};
const trtcCalling = new TRTCCalling(options);
```

#### Step 3: Log in

> -userID: user ID
> -userSig: user signature, for calculation method, please refer to [How to calculate userSig](https://cloud.tencent.com/document/product/647/17275)

```javascript
trtcCalling.login({
  userID,
  userSig,
});
```

#### Step 4: Implement 1v1 call

> #### Dial:
>
> -userID: user ID
> -type: call type, 0-unknown, 1-voice call, 2-video call
> -timeout: invitation timeout, unit s (seconds)

```javascript
trtcCalling.call({
  userID,
  type: 2,
  timeout,
});
```

> #### Answer
>
> -inviteID: invitation ID, identifies an invitation
> -roomID: call room ID
> -callType: 0-unknown, 1-voice call, 2-video call

```javascript
trtcCalling.accept({
  inviteID,
  roomID,
  callType,
});
```

> #### Open local camera

```javascript
trtcCalling.openCamera();
```

> #### Display the remote screen
>
> -userID: remote user ID
> -videoViewDomID: The user data will be rendered into the DOM ID node

```javascript
trtcCalling.startRemoteView({
  userID,
  videoViewDomID,
});
```

> #### Show local screen
>
> -userID: local user ID
> -videoViewDomID: The user data will be rendered into the DOM ID node

```javascript
trtcCalling.startLocalView({
  userID,
  videoViewDomID,
});
```

> #### Hang up/reject call

```javascript
trtcCalling.hangup();
```

> -inviteID: invitation id, identifies an invitation
> -isBusy: Whether it is busy, 0-unknown, 1-voice call, 2-video call

```javascript
trtcCalling.reject({
  inviteID,
  isBusy,
});
```

### Supported platforms

| Operating System |    Browser Type    | Minimum Browser Version Requirements |
| :--------------: | :----------------: | :----------------------------------: |
|      Mac OS      |   Desktop Safari   |                 11+                  |
|      Mac OS      | Chrome for desktop |                 56+                  |
|     Windows      | Chrome for desktop |                 56+                  |
|     Windows      | Desktop QQ Browser |                 10.4                 |

### common problem

#### 1. When viewing the key, only the public key and private key information can be obtained. How to obtain the key?

TRTC SDK version 6.6 (August 2019) starts to enable the new signature algorithm HMAC-SHA256. Applications that have been created before this need to upgrade the signature algorithm before obtaining a new encryption key. If you do not upgrade, you can continue to use the old version of the algorithm ECDSA-SHA256. If you have upgraded, you can switch to the old and new algorithms as needed.

Upgrade/switch operation:

1. Log in to the real-time audio and video console.

2. Select [Application Management] in the left navigation bar and click [Application Information] in the row of the target application.

3. Select the [Quick Start] tab, and click [Click here to upgrade], [Asymmetric Encryption] or [HMAC-SHA256] in the [Step 2 Obtain the key to issue UserSig] area.

-upgrade:

![](https://main.qcloudimg.com/raw/69bd0957c99e6a6764368d7f13c6a257.png)

-Switch back to the old version algorithm ECDSA-SHA256:

![](https://main.qcloudimg.com/raw/f89c00f4a98f3493ecc1fe89bea02230.png)

-Switch to new version algorithm HMAC-SHA256:
![](https://main.qcloudimg.com/raw/b0412153935704abc9e286868ad8a916.png)

#### 2. What are the restrictions on firewalls?

Since the SDK uses the UDP protocol for audio and video transmission, it cannot be used in office networks that intercept UDP. If you encounter similar problems, please refer to the document: [Coping with company firewall restrictions] (https://cloud.tencent.com/document /product/647/34399).
