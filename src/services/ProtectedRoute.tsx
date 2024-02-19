import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
  children: React.JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.teratany_user.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to={"/signin"} replace />;
  }

  return children;
};
export default ProtectedRoute;
