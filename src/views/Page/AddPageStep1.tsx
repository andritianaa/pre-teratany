import React, { useState } from "react";
import TopBar from "../../components/layouts/TopBar";
import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InfoModal } from "../../components/common/InfoModal";
import useLoadingButton from "../../hooks/useLoadingButton";
import ErrorMessageForm from "../../components/common/ErrorMessageForm";
import { resetPageInfo, setPageInfo } from "../../store/reducer/page.reducer";
import SelectCountryPage from "./components/SelectCountryPage";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/hooks";

interface addNewPageField {
  name: string;
  email: string;
  phone: string;
  website?: string;
  country?: string;
  address?: string;
}

const initialValues: addNewPageField = {
  name: "",
  email: "",
  phone: "",
  website: "",
  country: "",
  address: "",
};

const AddPageStep1: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, startLoading] = useLoadingButton();
  const [profileType, setProfileType] = useState<string>("association");
  const [country, setCountry] = useState<string>("Madagascar");
  const [description, setDescription] = useState<string>();
  const { t } = useTranslation();

  const handleChangePageType = (e: any) => {
    setProfileType(e.target.value);
  };
  const selectCountry = (e: any) => {
    setCountry(e.target.value);
  };

  const addPageFirstStep = (values: addNewPageField) => {
    startLoading();
    dispatch(resetPageInfo());

    dispatch(
      setPageInfo({
        name: values.name,
        email: values.email,
        address: values.address,
        phoneNumber: values.phone,
        website: values.website,
        description,
        country,
        profileType,
      })
    );
    setTimeout(() => {
      navigate("/page/add/step-2");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="fixed top-0 z-20 pt-4 bg-white flex items-center w-full max-w-[500px]">
        <TopBar text={t("settings.addPage.name")} />
      </div>

      <InfoModal
        title={t("settings.addPage.titleModal")}
        text={t("settings.addPage.text")}
      />

      <div className="mt-16 flex flex-col items-center mx-4 w-full max-w-[450px]">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            phone: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              addPageFirstStep(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="w-5/6">
            <label
              htmlFor="pageType"
              className="text-left block text-sm white:text-white my-2"
            >
              {t("settings.addPage.typeChoice.name")}
            </label>
            <select
              name="pageType"
              className="py-2 custom-border px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 white:bg-gray-800 white:border-gray-700 white:text-gray-400"
              id="pageType"
              onChange={handleChangePageType}
            >
              <option value="association">
                {t("settings.addPage.typeChoice.assoc")}
              </option>
              <option value="entreprise">
                {t("settings.addPage.typeChoice.entreprise")}
              </option>
            </select>
            <FormField
              label={t("settings.generalUser.name")}
              type="name"
              mark="name"
              height="py-2"
              width="w-full"
            />
            <ErrorMessageForm name="name" />

            <FormField
              label={t("settings.generalUser.email")}
              type="email"
              mark="email"
              height="py-2"
              width="w-full"
            />
            <ErrorMessageForm name="email" />

            <FormField
              label={t("settings.generalUser.address")}
              type="text"
              mark="address"
              height="py-2"
              width="w-full"
            />
            <ErrorMessageForm name="address" />
            <FormField
              label={t("settings.generalUser.phone")}
              type="phone"
              mark="phone"
              height="py-2"
              width="w-full"
            />
            <ErrorMessageForm name="phone" />
            <SelectCountryPage onChange={selectCountry} />

            <FormField
              label={t("settings.generalPage.website")}
              type="url"
              mark="website"
              height="py-2"
              width="w-full"
            />

            <label
              htmlFor="description"
              className="text-left block text-sm white:text-white my-2"
            >
              {t("settings.generalPage.description")}
            </label>
            <textarea
              name="description"
              rows={4}
              className="py-2 custom-border px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 white:bg-gray-800 white:border-gray-700 white:text-gray-400 h-24 max-h-24"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="my-6 w-full">
              <Button
                isLoading={isLoading}
                width="w-full"
                height="py-3"
                name={t("settings.generalPage.next")}
              />
              <button
                className="w-full text-gray-500 bg-white  rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 mt-4"
                onClick={() => navigate("/")}
              >
                {t("settings.generalPage.cancel")}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddPageStep1;
