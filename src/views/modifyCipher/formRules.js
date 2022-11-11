export default {
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "电话号码是必须的", trigger: "blur" },
          { validator: this.usernameValid, trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "密码是必须的", trigger: "blur" },
          {
            min: 8,
            max: 14,
            message: "长度不对哦！长度应在8-14之间",
            trigger: "blur",
          },
        ],
        cPassword: [
          { required: true, message: "密码是必须的", trigger: "blur" },
          {
            min: 8,
            max: 14,
            message: "长度不对哦！长度应在8-14之间",
            trigger: "blur",
          },
          {
            validator: this.cpasswordValid,
            trigger: "blur",
          },
        ],
        yanzrealVerificationCodehengma: [
          { required: true, message: "验证码是必须的", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
        ],
      },
    };
  },
  methods: {
    // username验证回调
    usernameValid(rule, value, callback) {
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg.test(value)) {
        callback(new Error("手机号码格式不正确！"));
      }
      callback();
    },
    //确认密码验证回调
    cpasswordValid(rule, value, callback) {
      if (this.modifyUser.newPassword !== value) {
        callback(new Error("两次密码不相同！"));
      }
      callback();
    },
  },
};
