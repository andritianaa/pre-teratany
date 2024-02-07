import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  text: string;
}
export const InfoModal: React.FC<Props> = ({ title, text }) => {
  const [showModal, setShowModal] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      {showModal && (
        <div className="w-screen h-screen background bg-black bg-opacity-50 z-1000 fixed top-0 left-0 right-0">
          <div
            data-modal-backdrop="static"
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full "
          >
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 ">
                    {text}
                  </p>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                  <button
                    data-modal-hide="static-modal"
                    type="button"
                    className="text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={() => setShowModal(false)}
                  >
                    {t("settings.addPage.accept")}
                  </button>
                  <button
                    data-modal-hide="static-modal"
                    type="button"
                    className="text-gray-500 bg-white  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                    onClick={() => navigate("/")}
                  >
                    {t("settings.addPage.decline")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
