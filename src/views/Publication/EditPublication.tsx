import { useEffect, useState } from "react";
import PublicationForm from "./components/PublicationForm";
import { useParams } from "react-router-dom";
import { withAsync } from "../../helpers/withAsync";
import { getOnePublication } from "../../api/PublicationApi";
import useToken from "../../hooks/useToken";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useFetchProfile from "../../hooks/useFetchProfile";
import { useTranslation } from "react-i18next";

const EditPublication = () => {
  const profileConnectedUser = useFetchProfile();
  const [content, setContent] = useState<any | unknown | string>();

  const token = useToken();

  const { id } = useParams();
  const { t } = useTranslation();

  const fetchPublication = async () => {
    if (profileConnectedUser?._id) {
      const { error, response } = await withAsync(() =>
        getOnePublication(token, id!, profileConnectedUser?._id!)
      );
      if (error instanceof AxiosError) {
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

  const fetchOnePub = async () => {
    const onePub: any = await fetchPublication();
    setContent(onePub ? onePub[0]?.content : "");
  };

  useEffect(() => {
    fetchOnePub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileConnectedUser?._id]);

  return (
    <PublicationForm
      _id={id}
      content={content}
      isNewPub={false}
      btnText={t("settings.save")}
    />
  );
};

export default EditPublication;
