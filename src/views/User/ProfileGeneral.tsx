import React from "react";
import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import TopBar from "../../components/common/TopBar";
import ErrorMessageForm from "../../components/common/ErrorMessageForm";
import { withAsync } from "../../helpers/withAsync";
import { updateGeneralInfo } from "../../api/UserApi";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useToken from "../../hooks/useToken";
import useLoadingButton from "../../hooks/useLoadingButton";
import useFetchProfile from "../../hooks/useFetchProfile";

interface GeneralUserInfo {
  name: string | undefined;
  email: string | undefined;
  description?: string | undefined;
}

const ProfileGeneral: React.FC = () => {
  const token = useToken();
  const profile = useFetchProfile();
  const [isLoading, startLoading, endLoading] = useLoadingButton();

  const initialValues: GeneralUserInfo = {
    name: profile?.name,
    email: profile?.contact?.email,
    description: profile?.description,
  };

  const updateUserGeneral = async (values: GeneralUserInfo) => {
    startLoading();
    const { error } = await withAsync(() =>
      updateGeneralInfo(
        token,
        profile?._id,
        values.name,
        values.email,
        values.description
      )
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
      toast.success("General information updated!");
    }
  };

  return (
    <>
      <TopBar text="Edit Profile" />

      <div className="mt-20 flex flex-col items-center mx-4">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().required("Required"),
            description: Yup.string(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              updateUserGeneral(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {(
            formik // Utilisez la fonction useFormik fournie par Formik
          ) => (
            <form className="w-[90%]" onSubmit={formik.handleSubmit}>
              <FormField
                label="Name"
                type="name"
                mark="name"
                height="py-2"
                width="w-full"
                extra={false}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <ErrorMessageForm name="name" />
              <FormField
                label="Email"
                type="email"
                mark="email"
                height="py-2"
                width="w-full"
                extra={false}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <ErrorMessageForm name="email" />
              {profile?.profileType !== "user" && (
                <>
                  <label
                    htmlFor="description"
                    className="text-left block text-sm white:text-white my-2"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formik.values.description}
                    className="py-2 custom-border px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 white:bg-gray-800 white:border-gray-700 white:text-gray-400 h-24 max-h-24"
                    id="description"
                    onChange={formik.handleChange}
                  ></textarea>
                </>
              )}

              <div className="my-10 w-full">
                <Button
                  height="py-3"
                  width="w-full"
                  name="Save"
                  isLoading={isLoading}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default ProfileGeneral;
