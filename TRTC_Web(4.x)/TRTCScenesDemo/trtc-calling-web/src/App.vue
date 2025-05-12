<template>
  <div id="app">
    <header-nav></header-nav>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <el-dialog
      :title="callTypeDisplayName"
      :visible.sync="isShowNewInvitationDialog"
      width="400px"
    >
      <span>{{ this.getNewInvitationDialogContent() }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleRejectCall">Reject</el-button>
        <el-button type="primary" @click="handleAccept">Accept</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { log } from "./utils";
import { getUsernameByUserid } from "./service";
import HeaderNav from "./components/header-nav";
let timeout;

export default {
  name: "App",
  components: {
    HeaderNav,
  },
  watch: {
    isLogin: function (newIsLogin, oldIsLogin) {
      if (newIsLogin !== oldIsLogin) {
        if (newIsLogin) {
          if (this.$router.history.current.path === "/login") {
            //Prevent pushing again under the '/' route
            this.$router.push("/");
          }
        } else {
          this.$router.push("/login");
        }
      }
    },
  },
  computed: mapState({
    isLogin: (state) => state.isLogin,
    loginUserInfo: (state) => state.loginUserInfo,
    callStatus: (state) => state.callStatus,
    isAccepted: (state) => state.isAccepted,
    meetingUserIdList: (state) => state.meetingUserIdList,
    muteVideoUserIdList: (state) => state.muteVideoUserIdList,
    muteAudioUserIdList: (state) => state.muteAudioUserIdList,
  }),
  async created() {
    this.initListener();
    await this.handleAutoLogin();
  },
  data() {
    return {
      isInviterCanceled: false,
      isShowNewInvitationDialog: false,
      inviterName: "",
      callTypeDisplayName: "",
      inviteData: {},
      inviteID: "",
    };
  },
  destroyed() {
    this.removeListener();
  },
  methods: {
    handleAutoLogin: async function () {},
    initListener: function () {
      this.$trtcCalling.on(this.TrtcCalling.EVENT.ERROR, this.handleError);
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.INVITED,
        this.handleNewInvitationReceived
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.USER_ACCEPT,
        this.handleUserAccept
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.USER_ENTER,
        this.handleUserEnter
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.USER_LEAVE,
        this.handleUserLeave
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.REJECT,
        this.handleInviteeReject
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.LINE_BUSY,
        this.handleInviteeLineBusy
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.CALLING_CANCEL,
        this.handleInviterCancel
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.KICKED_OUT,
        this.handleKickedOut
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.CALLING_TIMEOUT,
        this.handleCallTimeout
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.NO_RESP,
        this.handleNoResponse
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.CALLING_END,
        this.handleCallEnd
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.USER_VIDEO_AVAILABLE,
        this.handleUserVideoChange
      );
      this.$trtcCalling.on(
        this.TrtcCalling.EVENT.USER_AUDIO_AVAILABLE,
        this.handleUserAudioChange
      );
    },
    removeListener: function () {
      this.$trtcCalling.off(this.TrtcCalling.EVENT.ERROR, this.handleError);
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.INVITED,
        this.handleNewInvitationReceived
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.USER_ACCEPT,
        this.handleUserAccept
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.USER_ENTER,
        this.handleUserEnter
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.USER_LEAVE,
        this.handleUserLeave
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.REJECT,
        this.handleInviteeReject
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.LINE_BUSY,
        this.handleInviteeLineBusy
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.CALLING_CANCEL,
        this.handleInviterCancel
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.KICKED_OUT,
        this.handleKickedOut
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.CALLING_TIMEOUT,
        this.handleCallTimeout
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.NO_RESP,
        this.handleNoResponse
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.CALLING_END,
        this.handleCallEnd
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.USER_VIDEO_AVAILABLE,
        this.handleUserVideoChange
      );
      this.$trtcCalling.off(
        this.TrtcCalling.EVENT.USER_AUDIO_AVAILABLE,
        this.handleUserAudioChange
      );
    },
    handleError: function () {},
    handleNewInvitationReceived: async function (payload) {
      const { inviteID, sponsor, inviteData } = payload;
      log(`handleNewInvitationReceived ${JSON.stringify(payload)}`);
      if (inviteData.callEnd) {
        //The last person sends invite to hang up
        this.$store.commit("updateCallStatus", "idle");
        return;
      }
      if (sponsor === this.loginUserInfo.userId) {
        //The inviter is yourself, and the same account may be logged in from multiple terminals.
        return;
      }
      //Here you need to consider the busy situation
      if (this.callStatus === "calling" || this.callStatus === "connected") {
        await this.$trtcCalling.reject({ inviteID, isBusy: true });
        return;
      }

      const { callType } = inviteData;
      this.inviteData = inviteData;
      this.inviteID = inviteID;
      this.isInviterCanceled = false;
      this.$store.commit("updateIsInviter", false);
      this.$store.commit("updateCallStatus", "calling");
      const userName = sponsor;
      this.inviterName = userName;
      this.callTypeDisplayName =
        callType === this.TrtcCalling.CALL_TYPE.AUDIO_CALL
          ? "Voice calls"
          : "video call";
      this.isShowNewInvitationDialog = true;
    },
    getNewInvitationDialogContent: function () {
      return `${this.callTypeDisplayName} from ${this.inviterName}`;
    },
    handleRejectCall: async function () {
      try {
        const { callType } = this.inviteData;
        await this.$trtcCalling.reject({
          inviteID: this.inviteID,
          isBusy: false,
          callType,
        });
        this.dissolveMeetingIfNeed();
      } catch (e) {
        this.dissolveMeetingIfNeed();
      }
    },

    handleAccept: function () {
      this.handleDebounce(this.handleAcceptCall(), 500);
    },

    handleDebounce: function (func, wait) {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    },

    handleAcceptCall: async function () {
      try {
        const { callType, roomID } = this.inviteData;
        this.$store.commit("userJoinMeeting", this.loginUserInfo.userId);
        await this.$trtcCalling.accept({
          inviteID: this.inviteID,
          roomID,
          callType,
        });
        this.isShowNewInvitationDialog = false;
        if (
          callType === this.TrtcCalling.CALL_TYPE.AUDIO_CALL &&
          this.$router.history.current.fullPath !== "/audio-call"
        ) {
          this.$router.push("/audio-call");
        } else if (
          callType === this.TrtcCalling.CALL_TYPE.VIDEO_CALL &&
          this.$router.history.current.fullPath !== "/video-call"
        ) {
          this.$router.push("/video-call");
        }
      } catch (e) {
        this.dissolveMeetingIfNeed();
      }
    },
    handleUserAccept: function ({ userID }) {
      this.$store.commit("userAccepted", true);
      console.log(userID, "accepted");
    },
    handleUserEnter: function ({ userID }) {
      //establish connection
      this.$store.commit("userJoinMeeting", userID);
      if (this.callStatus === "calling") {
        //If it is the inviter, establish the connection
        this.$nextTick(() => {
          //You need to wait for the node of the remote user id to be rendered on the dom
          this.$store.commit("updateCallStatus", "connected");
        });
      } else {
        //The nth (n >= 3) person is invited to join the meeting, and he is not the inviter of the nth person
        this.$nextTick(() => {
          //You need to wait for the node of the remote user id to be rendered on the dom
          this.$trtcCalling.startRemoteView({
            userID: userID,
            videoViewDomID: `video-${userID}`,
          });
        });
      }
    },
    handleUserLeave: function ({ userID }) {
      if (this.meetingUserIdList.length == 2) {
        this.$store.commit("updateCallStatus", "idle");
      }
      this.$store.commit("userLeaveMeeting", userID);
    },
    handleInviteeReject: async function ({ userID }) {
      const userName = await getUsernameByUserid(userID);
      this.$message.warning(`${userName} refuses call`);
      this.dissolveMeetingIfNeed();
    },
    handleInviteeLineBusy: async function ({ userID }) {
      const userName = await getUsernameByUserid(userID);
      this.$message.warning(`${userName} is busy`);
      this.dissolveMeetingIfNeed();
    },
    handleInviterCancel: function () {
      //Invitation is canceled
      this.isShowNewInvitationDialog = false;
      this.$message.warning("Call canceled");
      this.dissolveMeetingIfNeed();
    },
    handleKickedOut: function () {
      //Repeat login and be kicked out of the room
      this.$store.commit("userAccepted", false);
      this.$trtcCalling.logout();
      this.$store.commit("userLogoutSuccess");
    },
    //Will be received as the invited party. Receiving this callback means that the call has timed out and has not been answered.
    handleCallTimeout: function () {
      this.isShowNewInvitationDialog = false;
      this.$message.warning("Call timed out and no response");
      this.dissolveMeetingIfNeed();
    },
    handleCallEnd: function () {
      this.$message.success("The call has ended");
      this.$trtcCalling.hangup();
      this.dissolveMeetingIfNeed();
      this.$router.push("/");
      this.$store.commit("userAccepted", false);
    },
    handleNoResponse: async function ({ userID }) {
      const userName = await getUsernameByUserid(userID);
      this.$message.warning(`${userName} no response`);
      this.dissolveMeetingIfNeed();
    },
    handleUserVideoChange: function ({ userID, isVideoAvailable }) {
      log(
        `handleUserVideoChange userID, ${userID} isVideoAvailable ${isVideoAvailable}`
      );
      if (isVideoAvailable) {
        const muteUserList = this.muteAudioUserIdList.filter(
          (currentID) => currentID !== userID
        );
        this.$store.commit("updateMuteVideoUserIdList", muteUserList);
      } else {
        const muteUserList = this.muteAudioUserIdList.concat(userID);
        this.$store.commit("updateMuteVideoUserIdList", muteUserList);
      }
    },
    handleUserAudioChange: function ({ userID, isAudioAvailable }) {
      log(
        `handleUserAudioChange userID, ${userID} isAudioAvailable ${isAudioAvailable}`
      );
      if (isAudioAvailable) {
        const muteUserList = this.muteAudioUserIdList.filter(
          (currentID) => currentID !== userID
        );
        this.$store.commit("updateMuteAudioUserIdList", muteUserList);
      } else {
        const muteUserList = this.muteAudioUserIdList.concat(userID);
        this.$store.commit("updateMuteAudioUserIdList", muteUserList);
      }
    },
    dissolveMeetingIfNeed() {
      this.$store.commit("updateCallStatus", "idle");
      this.isShowNewInvitationDialog = false;
      if (this.meetingUserIdList.length < 2) {
        this.$store.commit("dissolveMeeting");
      }
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background: aliceblue;
  height: 100%;
}
@media screen and (max-width: 767px) {
  .el-message {
    min-width: 180px;
  }
}
</style>
