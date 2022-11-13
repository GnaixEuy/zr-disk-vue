import request from "../utils/request";

function modifyNick(params) {
  return new Promise((resolve, reject) => {
    request
      .put("/user/modifyNick", params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function modifyPass(params) {
  return new Promise((resolve, reject) => {
    request
      .put("/user/modifyCipher", params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function findPass(params) {
  return new Promise((resolve, reject) => {
    request
      .put("/author/findPass", params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function modifyHeadImg(params) {
  return new Promise((resolve, reject) => {
    request
      .post("/user/modifyHeadImg", params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getUserInfo(params) {
  return new Promise((resolve, reject) => {
    request
      .get("/user/getUserInfo", params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updateUserInfo(params) {
  return new Promise((resolve, reject) => {
    request
      .put("/user/updateUserInfo", params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function searchUser(params) {
  return new Promise((resolve, reject) => {
    request
      .get(`/user/searchUser/${params}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function isFollow(params) {
  return new Promise((resolve, reject) => {
    request
      .get(`/user/isFollow/${params}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function follow(params) {
  return new Promise((resolve, reject) => {
    request
      .post(`/user/follow`, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getFollowers() {
  return new Promise((resolve, reject) => {
    request
      .get(`/user/getFollowers`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getFans() {
  return new Promise((resolve, reject) => {
    request
      .get(`/user/getFans`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export {
  modifyNick,
  modifyHeadImg,
  modifyPass,
  getUserInfo,
  findPass,
  updateUserInfo,
  searchUser,
  isFollow,
  follow,
  getFollowers,
  getFans,
};
