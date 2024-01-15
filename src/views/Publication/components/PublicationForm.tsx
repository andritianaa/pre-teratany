import React, { useEffect, useState } from "react";
import TopBar from "components/common/TopBar";
import Button from "components/common/Button";
import useLoadingButton from "hooks/useLoadingButton";
import { BiPhotoAlbum } from "@react-icons/all-files/bi/BiPhotoAlbum";
import useFetchProfile from "hooks/useFetchProfile";
import { FileServerURL, uploadFile } from "api/FileApi";
import { withAsync } from "helpers/withAsync";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { editPublication, postPublication } from "api/PublicationApi";
import useToken from "hooks/useToken";
import { useNavigate } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import profileDefault from "../../../assets/userPics.jpg";
import { useTranslation } from "react-i18next";

interface PublicationFormProps {
  _id?: string;
  content?: string;
  isNewPub: boolean;
  btnText: string;
}

const PublicationForm: React.FC<PublicationFormProps> = ({
  _id,
  content,
  isNewPub,
  btnText,
}) => {
  const [files, setFile] = useState<any>();
  const [selectedPhoto, setSelectedPhoto] = useState<string>("Photo");
  const [isLoading, startLoading, endLoading] = useLoadingButton();
  const [fileViewers, setFileViewers] = useState<string[]>([]);
  const [publicationText, setPublicationText] = useState<string>();
  const { t } = useTranslation();
  const toastMessage = [t("toast.error"), t("toast.success")];

  const token = useToken();
  const navigate = useNavigate();

  const profile = useFetchProfile();

  const handleFileChange = (e: any) => {
    setFileViewers([]);
    setSelectedPhoto(
      `${
        e.target.files.length > 1
          ? e.target.files.length + " images "
          : e.target.files.length + " image "
      }  selected`
    );
    for (let index = 0; index < e.target.files.length; index++) {
      setFileViewers((prevState) => [
        ...prevState,
        URL.createObjectURL(e.target.files[index]),
      ]);
    }

    setFile(e.target.files);
  };

  const uploadImageFile = async () => {
    if (files) {
      let formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        formData.append("images", files[index]);
      }

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
    }
  };

  const AddPost = async () => {
    startLoading();
    const images = await uploadImageFile();

    if (publicationText) {
      const { error } = await withAsync(() =>
        postPublication(token, profile?._id!, publicationText, images)
      );

      if (error instanceof AxiosError) {
        endLoading();
        const error_message: string =
          error?.response?.data.description ||
          error?.response?.data ||
          error.message;
        toast.error(error_message);
      } else {
        endLoading();
        toast.success(toastMessage[1]);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else {
      toast.error(toastMessage[0]);
      endLoading();
    }
  };

  const EditPost = async () => {
    startLoading();

    if (publicationText) {
      const { error } = await withAsync(() =>
        editPublication(token, _id!, publicationText)
      );

      if (error instanceof AxiosError) {
        endLoading();
        const error_message: string =
          error?.response?.data.description ||
          error?.response?.data ||
          error.message;
        toast.error(error_message);
      } else {
        endLoading();
        toast.success(toastMessage[1]);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else {
      toast.error(toastMessage[0]);
      endLoading();
    }
  };

  useEffect(() => {
    setPublicationText(content);
  }, [content]);

  return (
    <div className="flex flex-col justify-center items-center">
      <TopBar text={`${isNewPub ? t("addPub") : t("editPub")}`} />
      <div className="w-[90%] flex justify-start items-center space-x-4 mt-20">
        <img
          className="w-10 h-10 rounded-full"
          src={profile?.image ? FileServerURL + profile?.image : profileDefault}
          alt="profileImage"
        />
        <p className="flex font-medium">{profile?.name}</p>
      </div>
      <InputEmoji
        value={publicationText!}
        onChange={setPublicationText}
        cleanOnEnter
        placeholder={t("publicationPlaceholder")}
        inputClass="custom-emoji-style"
        keepOpened={true}
      />

      {isNewPub && (
        <div className="flex justify-start z-50 items-center w-[90%]">
          <label
            htmlFor="image"
            className="flex justify-start items-center -mt-11"
          >
            <BiPhotoAlbum size={30} />
            <p className="ml-2">{selectedPhoto}</p>
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </div>
      )}
      <div className="w-[90%] flex flex-wrap justify-start">
        {fileViewers.map((file) => (
          <img
            className="w-10 h-10 rounded-md mt-2 mr-2 object-cover"
            src={file}
            alt="selectedPhoto"
          />
        ))}
      </div>
      <Button
        className="mt-2.5"
        name={btnText}
        width="w-[90%] !mr-0"
        isLoading={isLoading}
        onClick={isNewPub ? AddPost : EditPost}
      />
    </div>
  );
};

export default PublicationForm;
