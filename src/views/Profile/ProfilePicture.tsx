import React, { useEffect, useState } from "react";
import defaultProfilePicture from "../../assets/userPics.jpg";
import Button from "../../components/common/Button";
import TopBar from "../../components/common/TopBar";
import { withAsync } from "../../helpers/withAsync";
import { updateProfileImage } from "../../api/ProfileApi";
import useToken from "../../hooks/useToken";
import { AxiosError } from "axios";
import useLoadingButton from "../../hooks/useLoadingButton";
import { toast } from "react-toastify";
import { FileServerURL, uploadFile } from "../../api/FileApi";
import useFetchProfile from "../../hooks/useFetchProfile";
import profileDefault from "../../assets/userPics.jpg";
import { useTranslation } from "react-i18next";

const ProfilePicture: React.FC = () => {
  const token = useToken();
  const [file, setFile] = useState<any>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [fileViewer, setFileViewer] = useState<string>(defaultProfilePicture);
  const [isLoading, startLoading, endLoading] = useLoadingButton();
  const { t } = useTranslation();

  const handleChange = (e: any) => {
    setFileViewer(URL.createObjectURL(e.target.files[0]));
    if (e.target.files) {
      setFile(e.target.files);
      setIsDisabled(false);
    }
  };

  const uploadImageFile = async () => {
    if (file) {
      let formData = new FormData();
      formData.append("images", file[0], file[0]?.name);

      const { error, response } = await withAsync(() => uploadFile(formData));
      if (error instanceof AxiosError) {
        endLoading();
        const error_message: string =
          error?.response?.data.description ||
          error?.response?.data ||
          error.message;
        toast.error(error_message);
      } else {
        return response?.data;
      }
    } else {
      setIsDisabled(true);
    }
  };

  const updateProfilePicture = async () => {
    startLoading();

    const file = await uploadImageFile();

    const { error } = await withAsync(() =>
      updateProfileImage(token, profile?._id, file)
    );
    if (error instanceof AxiosError) {
      endLoading();
      const error_message: string =
        error?.response?.data.error.description ?? error.message;
      toast.error(error_message);
    } else {
      endLoading();
      const successToast = t("settings.picture.success");
      toast.success(successToast);
    }
  };

  const profile = useFetchProfile();

  useEffect(() => {
    if (profile?.image) {
      setFileViewer(FileServerURL + profile?.image);
    }
  }, [profile]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="fixed top-0 z-20 pt-4 bg-white flex items-center w-full max-w-[500px]">
        <TopBar text={t("settings.picture.name")} />
      </div>

      <div className="mt-20 w-[90%] max-w-[400px] mx-auto flex flex-col items-center justify-center">
        <img
          src={fileViewer ? fileViewer : profileDefault}
          alt=""
          className="w-32 h-32 border-2 rounded-full mx-3 my-6 object-cover"
        />
        <input
          accept=".jpg,.jpeg,.png"
          className="max-h-7 h-7 cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
          type="file"
          onChange={handleChange}
        />
        <div className="my-10 w-full">
          <Button
            height="py-3"
            width="w-full"
            name={t("settings.save")}
            onClick={updateProfilePicture}
            isLoading={isLoading}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};
export default ProfilePicture;
