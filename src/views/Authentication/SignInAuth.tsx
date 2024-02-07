import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { withAsync } from "helpers/withAsync";
import { signinAuth } from "api/AuthenticationApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { toast } from "react-toastify";
import TeratanyLogo from "assets/Teratany_ico/apple-touch-icon-180x180.png";
import FormField from "components/common/FormField";
import Button from "components/common/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ErrorMessageForm from "components/common/ErrorMessageForm";
import {
  UserInitialState,
  setAuthentication,
} from "store/reducer/user.reducer";
import jwtDecode from "jwt-decode";
import { AxiosError } from "axios";
import useLoadingButton from "hooks/useLoadingButton";
import { getById } from "api/ProfileApi";
import { setAccountConnected } from "store/reducer/account.reducer";
import { ErrorData, ThrowErrorHandler } from "helpers/HandleError";
import { useTranslation } from "react-i18next";

interface signinFormValues {
  email: string;
  password: string;
}

const SignInAuth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, startLoading, endLoading] = useLoadingButton();
  const { t } = useTranslation();

  const initialValues: signinFormValues = {
    email: "",
    password: "",
  };

  const fetchProfile = async (token: string, id: string) => {
    const { error, response } = await withAsync(() => getById(token, id, id));

    if (error) {
      ThrowErrorHandler(error as ErrorData);
    } else {
      return response?.data;
    }
  };

  const signInUser = async (values: signinFormValues) => {
    startLoading();
    const { response, error } = await withAsync(() =>
      signinAuth(values.email, values.password)
    );

    if (error instanceof AxiosError) {
      endLoading();
      ThrowErrorHandler(error as ErrorData);
      return;
    } else {
      endLoading();
      const token: string = String(response?.data);
      const user: UserInitialState = jwtDecode(token);
      dispatch(
        setAuthentication({
          id: user.id,
          name: user.name,
          email: user.email,
          token,
          isAuthenticated: true,
        })
      );

      const profile: any = await fetchProfile(token, user.id as string);

      const accountSwitcher: any[] = [];

      accountSwitcher.push({
        id: profile?._id,
        name: profile?.name,
        followers: profile?.followers?.length,
        image: profile?.image,
      });

      profile?.administratedProfiles?.forEach((account: any) => {
        accountSwitcher.push({
          id: account?.id,
          name: account?.name,
          followers: account?.numberOfFollowers,
          image: account?.image,
        });
      });

      dispatch(setAccountConnected({ account: accountSwitcher }));

      navigate("/");
      const successLogin = t("authsignin.successlogin");
      toast.success(successLogin);
    }
  };
  const isAuthenticated = useSelector<RootState>(
    (state) => state.teratany_user.isAuthenticated
  ) as boolean;
  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <main className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm white:bg-gray-800 white:border-gray-700">
            <div className="flex justify-center">
              <img src={TeratanyLogo} alt="" className=" w-20 h-20" />
            </div>
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 white:text-white">
                  {t("authsignin.welcome")}
                </h1>
                <p className="mt-2 text-sm text-gray-600 white:text-gray-400">
                  {t("authsignin.question")}
                  <Link
                    className="text-blue-600 decoration-2 hover:underline font-medium ml-1"
                    to="/register"
                  >
                    {t("authsignin.signup")}
                  </Link>
                </p>
              </div>

              <div className="mt-5">
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email(t("authsignin.formik.email"))
                      .required(t("authsignin.formik.required")),
                    password: Yup.string()
                      .min(1)
                      .required(t("authsignin.formik.required")),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      signInUser(values);
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  <Form>
                    <div className="grid text-start gap-y-2">
                      <FormField
                        label={t("authsignin.formik.emailAddress")}
                        type="email"
                        mark="email"
                        height="py-3"
                        width="w-full"
                        extra={false}
                      />
                      <ErrorMessageForm name="email" />

                      <FormField
                        label={t("authsignin.formik.password")}
                        type="password"
                        mark="password"
                        height="py-3"
                        width="w-full"
                        extra={false}
                        extraDesc="Forgot Password?"
                      />
                      <ErrorMessageForm name="password" />

                      <div className="flex items-center ">
                        <Link
                          className="text-gray-500 text-sm decoration-2 hover:underline font-normal ml-1"
                          to="/forgot-password"
                        >
                          {t("authsignin.forgot")}
                        </Link>
                      </div>
                      <Button
                        isLoading={isLoading}
                        width="px-4"
                        height="py-3"
                        name={t("authsignin.signinbutton")}
                      />
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SignInAuth;
