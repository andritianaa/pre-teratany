import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "components/common/Button";
import useLoadingButton from "hooks/useLoadingButton";
import { withAsync } from "helpers/withAsync";
import { sendEmailRecovery } from "api/ProfileApi";
import { AxiosError } from "axios";
import { ErrorData, ThrowErrorHandler } from "helpers/HandleError";

const ForgotPassword = () => {
  const [isLoading, startLoading, endLoading] = useLoadingButton();
  const [email, setEmail] = useState<string>();
  const navigate = useNavigate();

  const sendMail = async () => {
    startLoading();
    const { error } = await withAsync(() => sendEmailRecovery(email!));
    if (error instanceof AxiosError) {
      endLoading();
      ThrowErrorHandler(error as ErrorData);
    } else {
      navigate("/reset-password");
    }
  };

  return (
    <div className="flex items-center h-screen">
      <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white rounded-xl shadow-xs white:bg-gray-800 white:border-gray-700 border-2 border-gray-100">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600 mb-8">
                Remember your password?
                <span className="mr-1"></span>
                <Link
                  to="/signin"
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="flex text-sm text-gray-600 font-normal ml-1 mb-2"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 custom-border px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 white:bg-gray-800 white:border-gray-700 white:text-gray-400"
                      required
                    />
                  </div>
                </div>
                <Button
                  name="Reset password"
                  className="!mr-0"
                  isLoading={isLoading}
                  onClick={sendMail}
                  isDisabled={!email ? true : false}
                />
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

export default ForgotPassword;
