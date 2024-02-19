import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import NavBar from "../components/layouts/NavBar";
import ProtectedRoute from "../services/ProtectedRoute";
import withoutNavRouter from "./without-nav.route";
import withNavRouter from "./with-nav.route";
import { App as CapacitorApp } from "@capacitor/app";
import { useEffect } from "react";

const WithNav = () => {
  useEffect(() => {
    const handleBackButton = () => {
      const currentPath = window.location.pathname;
      if (currentPath === "/signin") {
        CapacitorApp.minimizeApp();
      } else {
        window.history.back();
      }
    };
    document.addEventListener("backbutton", handleBackButton);
    return () => {
      document.removeEventListener("backbutton", handleBackButton);
    };
  }, []);
  return (
    <>
      <div className="w-full mb-14">
        <Outlet />
      </div>
      <NavBar />
    </>
  );
};
const WithoutNav = () => {
  return <Outlet />;
};

export const router: RouteObject[] = [
  {
    element: <WithoutNav />,
    children: withoutNavRouter,
  },
  {
    element: (
      <ProtectedRoute>
        <WithNav />
      </ProtectedRoute>
    ),
    children: withNavRouter,
  },
];

export default createBrowserRouter(router);
