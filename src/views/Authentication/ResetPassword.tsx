import Button from "components/common/Button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormField from "components/common/FormField";
import ErrorMessageForm from "components/common/ErrorMessageForm";
import useLoadingButton from "hooks/useLoadingButton";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { withAsync } from "helpers/withAsync";
import { resetPassword } from "api/ProfileApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ErrorData, ThrowErrorHandler } from "helpers/HandleError";

interface resetPasswordFormValues {
  email: string;
  password: string;
  code: string;
}

const ResetPassword = () => {
  const [isLoading, startLoading, endLoading] = useLoadingButton();
  const navigate = useNavigate();

  const initialValues: resetPasswordFormValues = {
    email: "",
    password: "",
    code: "",
  };

  const resetPasswordSubmission = async (values: resetPasswordFormValues) => {
    startLoading();
    const { error } = await withAsync(() =>
      resetPassword(values.email, values.password, values.code)
    );

    if (error instanceof AxiosError) {
      endLoading();
      ThrowErrorHandler(error as ErrorData);
    } else {
      endLoading();
      navigate("/signin");
      setTimeout(() => {
        toast.success("Password updated");
      }, 1000);
    }
  };

  return (
    <div className="flex items-center h-screen">
      <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white rounded-xl shadow-xs white:bg-gray-800 white:border-gray-700 border-2 border-gray-100">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                Reset your password
              </h1>
            </div>

            <div className="mt-5">
              <div className="grid gap-y-4">
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Required"),
                    password: Yup.string()
                      .matches(
                        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                        "Password must contain at least 8 characters with a capital letter and a number"
                      )
                      .required("Required"),
                    code: Yup.number().required("Required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      resetPasswordSubmission(values);
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  <Form>
                    <div className="grid text-start gap-y-2">
                      <FormField
                        label="Email Address"
                        type="email"
                        mark="email"
                        height="py-3"
                        width="w-full"
                      />
                      <ErrorMessageForm name="email" />
                      <FormField
                        label="New password"
                        type="password"
                        mark="password"
                        height="py-3"
                        width="w-full"
                      />
                      <ErrorMessageForm name="password" />
                      <FormField
                        label="Verification code"
                        type="text"
                        mark="code"
                        height="py-3"
                        width="w-full"
                      />
                      <ErrorMessageForm name="code" />

                      <Button
                        name="Change password"
                        className=" mt-2 !mr-0"
                        isLoading={isLoading}
                      />
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-center text-gray-600 white:text-gray-400">
          Don't have an account yet ?
          <Link
            className="text-blue-600 decoration-2 hover:underline font-medium ml-1"
            to="/register"
          >
            Sign up here
          </Link>
        </p>
      </main>
    </div>
  );
};

export default ResetPassword;
