import React from "react";
import { useTranslation } from "react-i18next";
const FeedNoPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center w-[90%] max-w-[600px] h-[8rem] bg-slate-200 shadow-sm rounded-lg p-4">
      <h1 className="text center text-lg">
        {t("greeting")}
        <br /> {t("noPublication")}
      </h1>
    </div>
  );
};

export default FeedNoPage;
