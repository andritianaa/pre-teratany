import React from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withAsync } from "../../helpers/withAsync";
import useToken from "../../hooks/useToken";
import { deletePublication } from "../../api/PublicationApi";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface DrawerProps {
  openBottom: any;
  closeBottom: any;
  id?: string;
}

const DrawerSettings: React.FC<DrawerProps> = ({
  openBottom,
  closeBottom,
  id,
}) => {
  const handleClickClose = () => {
    // Appel de la fonction closeBottom du composant parent
    closeBottom();
  };
  const { t } = useTranslation();

  const toastMessage = t("publications.deleted");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const token = useToken();

  useEffect(() => {
    setIsDrawerOpen(openBottom);
  }, [openBottom]);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  const detelePost = async () => {
    const { error } = await withAsync(() => deletePublication(token, id!));

    if (error instanceof AxiosError) {
      const error_message: string =
        error?.response?.data.description ||
        error?.response?.data ||
        error.message;
      toast.error(error_message);
    } else {
      toast.success(toastMessage);
    }
  };

  return (
    <>
      <React.Fragment>
        <Drawer
          placeholder=""
          overlay={true}
          placement="bottom"
          open={openBottom}
          onClose={closeBottom}
          className="p-4 z-1000 w-[560px] rounded-3xl !h-[40%] !left-0"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <Typography
              placeholder=""
              className="text-lg font-semibold border-b border-b-1 border-gray-300"
              color="black"
            >
              {t("publications.singular")}
            </Typography>
            <IconButton
              placeholder=""
              variant="text"
              color="blue-gray"
              onClick={handleClickClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 absolute -top-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div className=" h-[60%] w-full overflow-y-scroll">
            <hr className="z-50" />
            <hr className="z-50" />
            <Link to={`/publication/${id}`}>
              <p className="hover:bg-slate-100 py-4">
                {t("publications.edit")}
              </p>
            </Link>
            <hr />
            <p
              className="text-red-500 py-4 hover:bg-slate-100"
              onClick={detelePost}
            >
              {t("comments.delete")}
            </p>
          </div>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default DrawerSettings;
