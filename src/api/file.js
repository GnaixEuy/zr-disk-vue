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
  return request.post("/api/file/mkdir", params);
}

function modify(params) {
  return request.post("/api/file/modify", params);
}

function move(params) {
  return request.post("/api/file/move", params);
}

function getUserUsedDrive(params) {
  return request.get("/user/getUsedDrive", params);
}

function getSearch(params) {
  return request.post("/file/search", params);
}

function getFolder(params) {
  return request.post("/file/getFolder", params);
}

function getCollection(params) {
  return request.post("/file/getCollection", params);
}

function setCollection(params) {
  return request.post("/file/setCollection", params);
}

function getPhoto(params) {
  return request.get("/file/getPhoto", params);
}

function downloadFile(file_id, drive_id) {
  return request.get(
    `/file/getFileDownloadUrl?file_id=${file_id}&drive_id=${drive_id}`
  );
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
