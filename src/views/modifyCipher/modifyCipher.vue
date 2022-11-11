<template>
  <div class="modifyCipher">
    <div class="login-big-box">
      <login-left-area />
      <div class="login-box">
        <div class="icon" style="margin-bottom: 10px">
          <img src="../../assets/icon.png" height="40" style="vertical-align: middle" /><span
            style="font-weight: 500">小破盘</span>
        </div>
        <h2 id="title">修改密码</h2>
        <el-form :model="modifyUser" :rules="rules" ref="modifyUser">
          <el-form-item prop="username">
            <el-input type="text" v-model="modifyUser.username" autocomplete="off" placeholder="请输入手机号" clearable>
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword">
            <el-input type="password" v-model="modifyUser.newPassword" autocomplete="off" placeholder="请输入新密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="cPassword">
            <el-input type="password" v-model="modifyUser.cPassword" autocomplete="off" placeholder="确认新密码"></el-input>
          </el-form-item>
          <el-form-item prop="realVerificationCode">
            <el-row :gutter="15">
              <el-col :span="16">
                <el-input type="text" v-model.number="modifyUser.realVerificationCode" autocomplete="off" maxlength="6"
                  placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" :disabled="isLoading" @click="sendAnPwd()" style="font-size: 13px"
                  v-loading="isLoading" element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(255, 255, 255, 0.5)" class="btn">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyForm('modifyUser')" style="width: 100%">修改</el-button>
          </el-form-item>
          <el-row>
            <el-col :span="6" :offset="16">
              <el-link @click="goBack" icon="el-icon-link" style="margin-top: -12px" target="_blank">返回登录</el-link>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { sendPwd } from "../../api/login";
import { findPass } from "../../api/users";
import LoginLeftArea from "../../components/LoginLeftArea/LoginLeftArea.vue";
import { mapState } from "vuex";
import rules from "./formRules";
export default {
  data() {
    return {
      modifyUser: {
        cPassword: "",
        newPassword: "",
        realVerificationCode: "",
        username: "",
      },
      isLoading: false,
    };
  },
  mixins: [rules],
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    // 发送验证码
    sendAnPwd() {
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(this.modifyUser.username)) {
        this.isLoading = true;
        sendPwd(this.modifyUser.username).then((res) => {
          this.$message({ message: res.message, type: "success" });
          this.isLoading = false;
        }).catch(() => {
          this.$message({ message: "手机号码已发送，请注意查收", type: "error" });
          this.isLoading = false;
        })
      } else {
        this.$message.error("手机号码格式不正确");
      }
    },
    modifyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          findPass({
            password: this.modifyUser.newPassword,
            username: this.modifyUser.username,
            verificationCode: this.modifyUser.realVerificationCode
          })
            .then((data) => {
              if (data.code !== 200) return this.$message.error(data.message);
              this.$message.success(data.message);
              setTimeout(() => {
                window.close();
              }, 1000);
            })
            .catch((err) => {
              this.$message.error(err.message);
            });
        }
      });
    },
    goBack() {
      window.close();
    },
  },
  components: {
    LoginLeftArea,
  },
  created() {
    console.log(this);
  },
};
</script>
<style lang="less" scoped>
.modifyCipher {
  width: 100vw;
  height: 100vh;
  user-select: none;
  background-color: #ebeffe;

  .login-big-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    padding: 30px 20px 60px 20px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    #title {
      margin: 10px 0;
      text-align: center;
      font-size: 18px;
    }
  }

  .login-box {
    width: 350px;
    border-radius: 10px;
    text-align: center;
    overflow: hidden;
    right: 200px;
    padding: 25px 20px;
    border-radius: 0px;
    background-color: #fff;

    .el-tabs--border-card {
      background-color: #fff;
    }
  }
}

.btn /deep/ .el-loading-spinner {
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0;
}
</style>