import api from "api/api";
const URLS = { uploadFile: "/upload" };
export const uploadFile = (images: any) => {
  return api.post(URLS.uploadFile, images);
};

export const FileServerURL = "https://backend.teratany.org/public/";
// export const FileServerURL = "http://localhost:9900/public/";
