[WebRTC API Examples](https://web.sdk.qcloud.com/trtc/webrtc/demo/api-sample/index.html) demonstrates [WebRTC API interface](https://web.sdk.qcloud. com/trtc/webrtc/doc/zh-cn/Client.html) usage scenarios to facilitate customers to understand the API interface functions and quickly integrate into existing projects.

[WebRTC API Examples](https://web.sdk.qcloud.com/trtc/webrtc/demo/api-sample/index.html) Use [Next.js](https://www.nextjs.cn/) For development, if necessary, you can read the relevant documents on the official website.

This article mainly introduces how to quickly run Tencent Cloud WebRTC API Examples.

## Directory Structure

```
├── README.md
├── jsconfig.json
├── next.config.js
├── package.json
├── public
│ ├── favicon.ico
└── src
    ├── api --get data
    ├── app --Configure real-time audio and video application information
    ├── components --WebRTC API Examples public components
    ├── config --configuration data
    ├── i18n --Internationalization
    ├── pages --WebRTC API usage examples
    ├── styles --styles
    └── utils --general functions
```

## Prerequisites

You have [registered a Tencent Cloud](https://cloud.tencent.com/document/product/378/17985) account and completed [real-name authentication](https://cloud.tencent.com/document/product/378 /3629).

## Steps

### Step 1: Create a new application

1. Log in to the real-time audio and video console, select [Development Assistance] > [Quick Run Demo] (https://console.cloud.tencent.com/trtc/quickstart)].
2. Click [Start Now], enter the application name, such as `TestTRTC`, and click [Create Application].

### Step 2: Configure API Examples project files

1. Find and open the `src/app/config.js` file.
2. Set relevant parameters in the `config.js` file:
  <ul><li>SDKAPPID: The default is 0, please set it to the actual SDKAppID. </li>
  <li>SECRETKEY: The default is an empty string, please set it to the actual key information. </li></ul>
<img src="https://main.qcloudimg.com/raw/1732ea2401af6111b41259a78b5330a4.png">
3. Return to the real-time audio and video console and click [Paste Complete, Next].
4. Click [Close the guide and enter the console management application].

> ⚠️Note:
> The solution for generating UserSig mentioned in this article is to configure SECRETKEY in the client code. In this method, SECRETKEY can be easily decompiled and reversely cracked. Once your key is leaked, the attacker can steal your Tencent Cloud traffic, so**This method is only suitable for local run-through Demo and functional debugging**.
>
> The correct way to issue UserSig is to integrate the UserSig calculation code into your server and provide an App-oriented interface. When UserSig is needed, your App initiates a request to the business server to obtain the dynamic UserSig. For more details, please see [Server-side generation of UserSig](https://cloud.tencent.com/document/product/647/17275#Server).

### Step 3: Run API Examples

> ⚠️Note:
>
> 1. It is recommended that the node environment is v14.16.0
> 2. Please use yarn to install dependencies and run the project

#### 1. Install dependencies

```bash
yarn
```

#### 2. Development environment operation

```bash
yarn run dev
```

Use Chrome browser to open `http://localhost:3000/basic-rtc` to view the development page

#### 3. Production environment packaging

```bash
yarn run build
```

You can see the packaging results under the `/.next` folder and deploy the packaging results on the server as needed

#### 4. Production environment operation

```bash
yarn run build
yarn run start
```

You can use Chrome browser to open `http://localhost:3000/basic-rtc` to view the page deployed on the local server

#### 5. Package and export static files in the production environment

```bash
yarn run export
```

You can see the exported static files under the `/out` folder, and the static files can be directly uploaded to CDN

The Demo running interface is shown in the figure:
![](https://web.sdk.qcloud.com/trtc/webrtc/assets/API-examples-page.png)
WebRTC requires the use of a camera and microphone to collect audio and video. During the experience, you may receive relevant prompts from the Chrome browser. Click [Allow].
![](https://web.sdk.qcloud.com/trtc/webrtc/assets/API-examples-device-request.png)

## Supported platforms

WebRTC technology was first proposed by Google. Currently, it has relatively complete support on the desktop version of Chrome browser, desktop version of Safari browser and mobile version of Safari browser. The support status of other platforms (such as Android platform browsers) is relatively low. Difference.
-It is recommended to use [mini program](https://cloud.tencent.com/document/product/647/32399) solution on the mobile side. WeChat and mobile QQ mini programs are both supported and are powered by the Native technology of each platform. Realization, audio and video performance is better, and targeted adaptation for mainstream mobile phone brands.
-If your application scenario is mainly an educational scenario, then the teacher side recommends using the more stable [Electron](https://cloud.tencent.com/document/product/647/38549) solution, which supports both large and small channels. screen, a more flexible screen sharing solution and stronger but weak network resilience.

<table>
<tr>
<th>Operating System</th>
<th width="22%">Browser type</th><th>Browser minimum <br>version requirements</th><th width="16%">Receive (play)</th><th width="16%">Send (on the mic)</th><th>Screen sharing</th><th>SDK version requirements</th>
</tr><tr>
<td>Mac OS</td>
<td>Desktop Safari browser</td>
<td>11+</td>
<td>Support</td>
<td>Support</td>
<td>Supported (requires Safari13+ version)</td>
<td>-</td>
</tr>
<tr>
<td>Mac OS</td>
<td>Desktop Chrome browser</td>
<td>56+</td>
<td>Support</td>
<td>Support</td>
<td>Supported (requires Chrome72+ version)</td>
<td>-</td>
</tr>
<tr>
<td>Mac OS</td>
<td>Desktop version of Firefox browser</td>
<td>56+</td>
<td>Support</td>
<td>Support</td>
<td>Supported (requires Firefox66+ version)</td>
<td>v4.7.0+</td>
</tr>
<tr>
<td>Mac OS</td>
<td>Desktop version of Edge browser</td>
<td>80+</td>
<td>Support</td>
<td>Support</td>
<td>Support</td>
<td>v4.7.0+</td>
</tr>
<tr>
<td>Windows</td>
<td>Desktop Chrome browser</td>
<td>56+</td>
<td>Support</td>
<td>Support</td>
<td>Supported (requires Chrome72+ version)</td>
<td>-</td>
</tr>
<tr>
<td>Windows</td>
<td>Desktop version of QQ browser (extremely fast kernel)</td>
<td>10.4+</td>
<td>Support</td>
<td>Support</td>
<td>Not supported</td>
<td>-</td>
</tr>
<tr>
<td>Windows</td>
<td>Desktop version of Firefox browser</td>
<td>56+</td>
<td>Support</td>
<td>Support</td>
<td>Supported (requires Firefox66+ version)</td>
<td>v4.7.0+</td>
</tr>
<tr>
<td>Windows</td>
<td>Desktop version of Edge browser</td>
<td>80+</td>
<td>Support</td>
<td>Support</td>
<td>Support</td>
<td>v4.7.0+</td>
</tr>
<tr>
<td>iOS 11.1.2+</td>
<td>Mobile Safari</td>
<td>11+</td>
<td>Support</td>
<td>Support</td>
<td>Not supported</td>
<td>-</td>
</tr>
<tr>
<td>iOS 12.1.4+</td>
<td>WeChat embedded web page</td>
<td>-</td>
<td>Support</td>
<td>Not supported</td>
<td>Not supported</td>
<td>-</td>
</tr>
<tr>
<td>Android</td>
<td>Mobile QQ Browser</td>
<td>-</td>
<td>Not supported</td>
<td>Not supported</td>
<td>Not supported</td>
<td>-</td>
</tr>
<tr>
<td>Android</td>
<td>Mobile UC Browser</td>
<td>-</td>
<td>Not supported</td>
<td>Not supported</td>
<td>Not supported</td>
<td>-</td>
</tr>
<tr>
<td>Android</td>
<td>WeChat embedded web page (TBS core)</td>
<td>-</td>
<td>Support</td>
<td>Support</td>
<td>Not supported</td>
<td>-</td>
</tr>
<tr>
<td>Android</td>
<td>WeChat embedded web page (XWEB core)</td>
<td>-</td>
<td>Support</td>
<td>Support</td>
<td>Not supported</td>
<td>-</td>
</tr>
</table>

> !
> -You can open the [WebRTC Ability Test](https://www.qcloudtrtc.com/webrtc-samples/abilitytest/index.html) page in your browser to check whether WebRTC is fully supported. For example, browser environments such as official accounts.
> -Due to H.264 copyright restrictions, Huawei's Chrome browser and Chrome WebView-based browsers do not support the normal operation of TRTC's Web version SDK.

<span id="requirements"></span>

## Environmental requirements

-Please use the latest version of Chrome browser.
-TRTC Web SDK relies on the following ports for data transmission. Please add them to the firewall whitelist. After the configuration is completed, you can visit and experience [official website Demo](https://trtc-1252463788.file.myqcloud.com/web/demo/official-demo/index.html) Check whether the configuration takes effect.
-TCP port: 8687
-UDP ports: 8000; 8080; 8800; 843; 443; 16285
-Domain name: qcloud.rtc.qq.com

## common problem

### 1. When viewing the key, only the public key and private key information can be obtained. How to obtain the key?

TRTC SDK version 6.6 (August 2019) starts to enable the new signature algorithm HMAC-SHA256. Applications that have been created before this need to upgrade the signature algorithm before obtaining a new encryption key. If you do not upgrade, you can continue to use [old version algorithm ECDSA-SHA256](https://cloud.tencent.com/document/product/647/17275#.E8.80.81.E7.89.88.E6.9C.AC .E7.AE.97.E6.B3.95).

Upgrade operation:

1. Log in to [Real-time Audio and Video Console](https://console.cloud.tencent.com/trtc).
2. Select [Application Management] in the left navigation bar and click [Application Information] in the row of the target application.
3. Select the [Quick Start] tab and click [Click here to upgrade] in the [Step 2 Obtain the key to issue UserSig] area.

### 2. How to deal with the client error: "RtcError: no valid ice candidate found"?

This error indicates that TRTC Web SDK failed to drill holes in STUN. Please check the firewall configuration according to [Environmental Requirements](#requirements).

### 3. How to deal with the client error: "RtcError: ICE/DTLS Transport connection failed" or "RtcError: DTLS Transport connection timeout"?

This error indicates that TRTC Web SDK failed to establish the media transmission channel. Please check the firewall configuration according to [Environmental Requirements](#requirements).

### 4. How to deal with the 10006 error?

If "Join room failed result: 10006 error: service is suspended,if charge is overdue,renew it" appears, please confirm whether the service status of your real-time audio and video application is available.
Log in to [Real-time Audio and Video Console](https://console.cloud.tencent.com/rav), click on the application you created, click [Account Information], and you can confirm the service status in the account information panel.
![](https://main.qcloudimg.com/raw/13c9b520ea333804cffb4e2c4273fced.png)
