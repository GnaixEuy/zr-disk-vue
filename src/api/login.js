import request from "../utils/request";

function Login(params) {
  return new Promise((resolve, reject) => {
    request
      .post("/author/login", params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function registerByPhone(params) {
  return new Promise((resolve, reject) => {
    request
      .post("/author/registerByPhone", params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function sendPwd(params) {
  return new Promise((resolve, reject) => {
    request
      .get(`/author/getPhoneVerificationCode/${params}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export { Login, registerByPhone, sendPwd };
