import { getUserInfo } from "../api/users";
import { getUserUsedDrive } from "../api/file";
import catchError from "../utils/catchError";
import app from "../main";
const state = {
  userInfo: {},
};
const actions = {
  async getUserInfo({ commit }) {
    let [err, { data, code, message }] = await catchError(getUserInfo());
    if (err) app.$message.error(err);
    if (code == 200) {
      commit("SET_USERINFO", data);
    } else {
      app.$message.error(message);
    }
  },
  async getUserDrive({ commit }) {
    let [err, { data, code, message }] = await catchError(getUserUsedDrive());
    if (err) {
      app.$message.error(err);
    }
    if (code == 200) commit("SET_USERINFO_DRIVE", data);
    else app.$message.error(message);
  },
};
const mutations = {
  SET_USERINFO(state, data) {
    state.userInfo = data;
  },
  SET_USERINFO_DRIVE(userInfo) {
    state.userInfo["driveUsed"] = userInfo.driveUsed;
    state.userInfo["driveSize"] = userInfo.driveSize;
  },
};
const getters = {
  getUserInfo(state) {
    return state.userInfo;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
