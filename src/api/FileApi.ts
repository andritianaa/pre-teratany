import api from "api/api";
const URLS = { uploadFile: "/upload" };
export const uploadFile = (images: any) => {
  return api.post(URLS.uploadFile, images);
};

// export const FileServerURL = "https://backend.teratany.org/public/";
export const FileServerURL = process.env.REACT_APP_BASE_URL + "/public/";
