import { RouteObject } from "react-router-dom";
import SignInAuth from "../views/Authentication/SignInAuth";
import RegisterAuth from "../views/Authentication/RegisterAuth";
import ForgotPassword from "../views/Authentication/ForgotPassword";
import ResetPassword from "../views/Authentication/ResetPassword";
import { routes } from "../constants/route.contant";
import { OneChat } from "../views/Chat/OneChat";

const withoutNavRouter: RouteObject[] = [
  {
    path: routes.signin,
    element: <SignInAuth />,
  },
  {
    path: routes.register,
    element: <RegisterAuth />,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
  },
  {
    path: routes.resetPassword,
    element: <ResetPassword />,
  },
  {
    path: routes.oneChat,
    element: <OneChat />,
  },
];

export default withoutNavRouter;
