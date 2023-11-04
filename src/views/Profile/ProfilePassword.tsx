import React from "react";
import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TopBar from "../../components/common/TopBar";
import ErrorMessageForm from "../../components/common/ErrorMessageForm";
import { withAsync } from "../../helpers/withAsync";
import { updatePassword } from "../../api/ProfileApi";
import useToken from "../../hooks/useToken";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useLoadingButton from "../../hooks/useLoadingButton";

interface editPasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: editPasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ProfilePassword: React.FC = () => {
  const token = useToken();
  const [isLoading, startLoading, endLoading] = useLoadingButton();

  const updateUserPassword = async (values: editPasswordFormValues) => {
    startLoading();
    const { error } = await withAsync(() =>
      updatePassword(token, values.currentPassword, values.newPassword)
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
      toast.success("Password updated!");
    }
  };

  return (
    <>
      <TopBar text="Edit Password" />
      <div className="mt-20 flex flex-col items-center mx-4">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            currentPassword: Yup.string().required("Required"),
            newPassword: Yup.string()
              .matches(
                /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Password must contain at least 8 characters with a capital letter and a number"
              )
              .required("Required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("newPassword")], "Passwords must match")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              updateUserPassword(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="w-[90%]">
            <FormField
              label="Current password"
              type="text"
              mark="currentPassword"
              height="py-2"
              width="w-full"
            />
            <ErrorMessageForm name="currentPassword" />

            <FormField
              label="New password"
              type="password"
              mark="newPassword"
              height="py-2"
              width="w-full"
            />
            <ErrorMessageForm name="newPassword" />

            <FormField
              label="Confirm password"
              type="password"
              mark="confirmPassword"
              height="py-2"
              width="w-full"
            />
            <ErrorMessageForm name="confirmPassword" />

            <div className="my-10 w-full">
              <Button
                width="w-full"
                height="py-3"
                name="Save"
                isLoading={isLoading}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
export default ProfilePassword;
