import request from "../utils/request";

function getFile(params) {
  return request.get("/file/getFile", { params });
}

function uploadFiles(params) {
  return request.post("/file/upload", params);
}

function merge(params) {
  return request.post("/file/merge", params);
}

function uploadHeadImg(params) {
  return request.post("/file/uploadHeadImg", params);
}

function delFile(params) {
  return request.delete("/file/delFile", { params });
}

function mkdir(params) {
  return request.post("/file/mkdir", params);
}

function modify(params) {
  return request.put("/file/modify", params);
}

function move(params) {
  return request.put("/file/move", params);
}

function getUserUsedDrive(params) {
  return request.get("/user/getUsedDrive", params);
}

function getSearch(searchWord) {
  return request.get(`/file/search/${searchWord}`);
}

function getFolder(params) {
  return request.get(`/file/getFolder/${params}`);
}

function getCollection(params) {
  return request.get("/file/getCollection", params);
}

function setCollection(params) {
  return request.put("/file/setCollection", params);
}

function getPhoto(params) {
  return request.get("/file/getPhoto", params);
}

function downloadFile(file_id) {
  return request.get(`/file/getFileDownloadUrl/${file_id}`);
}

function getFileTotal(params) {
  return request.get("/file/getFileTotal", params);
}

export {
  move,
  mkdir,
  merge,
  modify,
  getFile,
  delFile,
  getPhoto,
  getFolder,
  getSearch,
  getFileTotal,
  uploadFiles,
  downloadFile,
  setCollection,
  getCollection,
  uploadHeadImg,
  getUserUsedDrive,
};
