This article mainly introduces how to quickly run Tencent Cloud TRTC Web SDK Demo.

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
> -You can open the [WebRTC Capability Test](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) page in your browser to check whether WebRTC is fully supported. For example, browser environments such as official accounts.
> -Due to H.264 copyright restrictions, Huawei's Chrome browser and Chrome WebView-based browsers do not support the normal operation of TRTC's Web version SDK.
>
> <span id="requirements"></span>

## Environmental requirements

-Please use the latest version of Chrome browser.
-TRTC Web SDK relies on the following ports for data transmission, please add them to the firewall whitelist, refer to: [Which ports or domain names need to be configured as whitelists for WebRTC? ](https://cloud.tencent.com/document/product/647/34399#webrtc-.E9.9C.80.E8.A6.81.E9.85.8D.E7.BD.AE.E5.93. AA.E4.BA.9B.E7.AB.AF.E5.8F.A3.E6.88.96.E5.9F.9F.E5.90.8D.E4.B8.BA.E7.99.BD.E5.90.8 D.E5.8D.95.EF.BC.9F) After the configuration is completed, you can visit and experience the [official website Demo](https://web.sdk.qcloud.com/trtc/webrtc/demo/api-sample /login.html) Check whether the configuration takes effect.

## Prerequisites

You have [registered a Tencent Cloud](https://cloud.tencent.com/document/product/378/17985) account and completed [real-name authentication](https://cloud.tencent.com/document/product/378 /3629).

## Steps

<span id="step1"></span>

### Step 1: Create a new application

1. Log in to the real-time audio and video console, select [Development Assistance] > [Quick Run Demo] (https://console.cloud.tencent.com/trtc/quickstart)].
2. Click [Start Now], enter the application name, such as `TestTRTC`, and click [Create Application].

<span id="step2"></span>

### Step 2: Download SDK and Demo source code

1. Move the mouse to the corresponding card, click [[Github](https://github.com/tencentyun/TRTCSDK/tree/master/Web)] to jump to Github (or click [[ZIP](https://web.sdk.qcloud.com/trtc/webrtc/download/webrtc_latest.zip)]), download the relevant SDK and supporting Demo source code.
   ![](https://main.qcloudimg.com/raw/0f35fe3bafe9fcdbd7cc73f991984d1a.png)
2. After the download is completed, return to the real-time audio and video console and click [I have downloaded, Next] to view the SDKAppID and key information.

<span id="step3"></span>

### Step 3: Configure Demo project files

1. Unzip the source code package downloaded in [Step 2](#step2).
2. Find and open the `Web/base-js/js/debug/GenerateTestUserSig.js` file.
3. Set the relevant parameters in the `GenerateTestUserSig.js` file:
<ul><li>SDKAPPID: The default is 0, please set it to the actual SDKAppID. </li>
  <li>SECRETKEY: The default is an empty string, please set it to the actual key information. </li></ul>
<img src="https://main.qcloudimg.com/raw/1732ea2401af6111b41259a78b5330a4.png">
4. Return to the real-time audio and video console and click [Paste Complete, Next].
5. Click [Close the guide and enter the console management application].

> ! The solution to generate UserSig mentioned in this article is to configure SECRETKEY in the client code. In this method, SECRETKEY can easily be decompiled and reverse cracked. Once your key is leaked, the attacker can steal your Tencent Cloud traffic. Therefore **This method is only suitable for local run-through Demo and functional debugging**.
> The correct way to issue UserSig is to integrate the UserSig calculation code into your server and provide an App-oriented interface. When UserSig is needed, your App initiates a request to the business server to obtain the dynamic UserSig. For more details, please see [Server-side generation of UserSig](https://cloud.tencent.com/document/product/647/17275#Server).

### Step 4: Run Demo

Use the Chrome browser to open the `index.html` file in the Demo root directory to run the Demo.

> !
> -Generally, to experience the Demo, you need to deploy it to a server and access it through `https://domain name/xxx`, or build a server directly locally and access it through `localhost:port`.
> -At present, the desktop Chrome browser supports the TRTC Web SDK related features relatively completely, so it is recommended to use the Chrome browser to experience it.

The Demo running interface is shown in the figure:
![](https://main.qcloudimg.com/raw/e989c968446e6e3bdcc19c58e40e2b86.png)
-Click [Join Room] to join the audio and video call room and publish local audio and video streams.
You can open multiple pages and click [Join Room] on each page. Under normal circumstances, you can see multiple screens and simulate real-time audio and video calls.
-Click the camera icon to select a camera device.
-Click on the microphone chart to select a microphone device.

> ?WebRTC requires the use of a camera and microphone to collect audio and video. During the experience, you may receive relevant prompts from the Chrome browser. Click [Allow].
> ![](https://main.qcloudimg.com/raw/1a2c1e7036720b11f921f8ee1829762a.png)

## common problem

### 1. Basic environmental issues

#### Which browsers does the web SDK support?

For detailed browser support of TRTC Web SDK, you can view [TRTC Web SDK browser support](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-05 -info-browser.html).
For environments not listed above, you can open [TRTC Capability Test](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) in your current browser to test whether it is fully supported. WebRTC features.

#### Audio and video equipment test before call?

You can view [Pre-call environment and device detection](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-23-advanced-support-detection.html).

#### How to detect the current network situation in real time?

[Network quality test before call](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-24-advanced-network-quality.html)

#### Does it support mixed streaming, bypass push streaming, large and small streams, and beauty?

You can check these documents to implement advanced functions: [Mixing](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Client.html#startMixTranscode), [Bypass Push](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-26-advanced-publish-cdn-stream.html), [Big and small streams](https://web.sdk. qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-27-advanced-small-stream.html), [Beauty](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-28-advanced-beauty.html)

### 2. Push-pull flow problem

#### What do the errors NotFoundError, NotAllowedError, NotReadableError, OverConstrainedError and AbortError reported in the web SDK log mean?

| Error name           | Description                                                                                                                                                                                                                                     | Handling suggestions                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NotFoundError        | The media type (including audio, video, screen sharing) that satisfies the request parameters cannot be found. For example: if the PC does not have a camera, but requests the browser to obtain the video stream, this error will be reported. | It is recommended to guide the user to check the camera or microphone required for the call before starting the call. If there is no camera and a voice call is required, [TRTC.createStream({ audio: true, video: false })](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/TRTC.html#.createStream) specifies that only the microphone is collected. |
| NotAllowedError      | The user has denied access to audio, video, or screen sharing for the current browser instance.                                                                                                                                                 | Prompts users that they will not be able to make audio and video calls without authorizing camera/microphone access.                                                                                                                                                                                                                                    |
| NotReadableError     | The user has authorized the use of the corresponding device, but the device cannot be accessed due to a hardware, browser or web-level error on the operating system.                                                                           | Handle the error message according to the browser and prompt the user that "the camera/microphone cannot be accessed temporarily. Please ensure that no other application currently requests access to the camera/microphone and try again."                                                                                                            |
| OverConstrainedError | The value of cameraId/microphoneId parameter is invalid.                                                                                                                                                                                        | Please ensure that the cameraId/microphoneId passed value is correct and valid.                                                                                                                                                                                                                                                                         |
| AbortError           | The device cannot be used for some unknown reason.                                                                                                                                                                                              | -                                                                                                                                                                                                                                                                                                                                                       |

See [initialize](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html?#initialize) for more details.

#### Browsers on some mobile phones cannot run TRTC properly for push and pull streaming?

For detailed browser support of TRTC Web SDK, you can view [TRTC Web SDK browser support](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-05 -info-browser.html).
For environments not listed above, you can open [TRTC Capability Test](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html) in your current browser to test whether it is fully supported. WebRTC features.

#### Is it applicable to all browsers when setting the width and height to push the streaming resolution on the web side?

Due to device and browser limitations, the video resolution may not match exactly. In this case, the browser will automatically adjust the resolution to be close to the resolution corresponding to the Profile. For details, see [setVideoProfile](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html?#setVideoProfile).

#### Does the style of screen sharing on the web side support modification?

The style of screen sharing is controlled by the browser and cannot be modified currently.

#### Does the web side support mixed streaming?

The web side supports initiating mixed streaming, [click to see how to call the mixed streaming transcoding interface](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Client.html#startMixTranscode).

#### How to clear the data in the camera list if the camera is unplugged during use of the Web SDK?

You can try calling the [TRTC.getCameras](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/TRTC.html#.getCameras) method to see if the new device list can be obtained. If there is still The unplugged camera information indicates that the bottom layer of the browser has not refreshed the list, and the web SDK cannot obtain new device list information.

### Is the WeChat embedded browser on iOS unable to push streams normally?

[Click to view](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-05-info-browser.html) WeChat embedded browser on iOS supports push and pull streams Condition.

### 3. Playback issues

#### Is there a picture but no sound problem during audio and video interaction?

Due to browser autoplay policy restrictions, audio playback will cause a PLAY_NOT_ALLOWED exception. At this time, the business layer needs to guide the user to manually operate Stream.resume() to resume audio playback. [Recommendations for Handling Restricted Autoplay] (https://web.sdk .qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-21-advanced-auto-play-policy.html).
Caused by an unknown exception, please check the audioLevel & audioEnergy of both sending and receiving ends through the monitoring dashboard.

#### The web call screen cannot be displayed?

Check whether the data is obtained on the Web page. When confirming that the data is sent and received normally, you can check whether the srcObject attribute of the `<video>` element is assigned the correct mediaStream object. If the assignment is wrong, it will definitely not be displayed.

#### Are there echoes, noises, noises, or low sounds during web calls?

It is normal for the devices of both parties to call to be too close to each other. Please keep them farther away from each other when testing. When other terminals hear echo, noise, noise, etc. in the Web terminal's voice, it means that the Web terminal's 3A processing is not effective.
If you use the browser's native [getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) API for custom collection, you need to manually set the 3A parameters:
-echoCancellation: echo cancellation switch
-noiseSuppression: noise suppression switch
-autoGainControl: Automatic gain switch? For detailed settings, please refer to [Media Tracking Constraints](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaTrackConstraints).

If you use the [TRTC.createStream](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/TRTC.html#createStream) interface for collection, you do not need to manually set the 3A parameters. The SDK defaults Turn on 3A.

### 4. Others

#### When running the web SDK, an error occurs: "RtcError: no valid ice candidate found". How to deal with it?

This error indicates that TRTC Web SDK failed to establish the media transmission channel. Please check the firewall configuration. TRTC Web SDK relies on the following ports for data transmission. Please add them to the firewall whitelist. After the configuration is completed, you can visit and experience [official website Demo](https://web.sdk.qcloud.com/trtc/webrtc/demo /latest/official-demo/index.html) Check whether the configuration takes effect.
Please check [Related to dealing with firewall restrictions](https://cloud.tencent.com/document/product/647/34399)

#### How to deal with the client error: "RtcError: ICE/DTLS Transport connection failed" or "RtcError: DTLS Transport connection timeout"?

This error indicates that TRTC Web SDK failed to establish the media transmission channel. Please check the firewall configuration. TRTC Web SDK relies on the following ports for data transmission. Please add them to the firewall whitelist. After the configuration is completed, you can visit and experience [official website Demo](https://web.sdk.qcloud.com/trtc/webrtc/demo /latest/official-demo/index.html) Check whether the configuration takes effect.
Please check [Related to dealing with firewall restrictions](https://cloud.tencent.com/document/product/647/34399)

### Can the web SDK obtain the current volume?

You can get the current volume through [getAudioLevel](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html#getAudioLevel). [Please view the detailed tutorial](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-13-basic-switch-camera-mic.html).

#### What situations will trigger Client.on(‘client-banned’)?

This event will be triggered through the backend RESTAPI [Remove User](https://cloud.tencent.com/document/product/647/40496?from=10680). It should be noted that users with the same name logging in at the same time will not trigger this event. This behavior is a business logic error and should be avoided logically. If the customer needs to manage the mutual kicking of members in the room, it is recommended that the customer use the WebIM SDK to implement the relevant logic.

#### Can the web end monitor the remote end leaving the room?

Supports monitoring remote check-out events, it is recommended to use [client.on('peer-leave')](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/in client events module-Event.html) event to implement remote user check-out notification.

#### Are the web, applet, and PC sides of real-time audio and video synchronized?

Yes, real-time audio and video support interoperability across all platforms.

#### How to implement the screenshot function of real-time audio and video web side?

Refer to the [Stream.getVideoFrame()](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/Stream.html#getVideoFrame) interface.

#### How to record pure audio streaming using the web SDK? Why is the recording not successful when turning on automatic bypass and automatic recording on the console?

The pureAudioPushMode parameter of [createClient](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/TRTC.html#.createClient) needs to be set.

#### How to deal with Client.on(‘error’) problem?

This means that the SDK encountered an unrecoverable error, and the business layer must either refresh the page and try again or call Client.leave to check out and then call Client.join to try again.

#### Do mini programs and web terminals support custom stream IDs?

Web version 4.3.8 or above already supports custom stream IDs, and the SDK version can be updated. Mini programs are currently not supported.

#### How to collect system sound during screen sharing on the web side?

[Click to view the tutorial](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-16-basic-screencast.html#h2-6), collecting system sound only supports Chrome M74+ , on Windows and Chrome OS, can capture the entire system's audio, on Linux and Mac, only the tab's audio can be captured. Other Chrome versions, other systems, and other browsers are not supported.

#### How to switch the camera and microphone on the web?

[Click to view the tutorial](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/tutorial-13-basic-switch-camera-mic.html), you can first obtain the system After installing the camera and microphone devices, call [switchDevice](https://web.sdk.qcloud.com/trtc/webrtc/doc/zh-cn/LocalStream.html#switchDevice) to switch.
