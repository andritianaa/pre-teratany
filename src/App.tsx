import "App.css";
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "components/common/NavBar";
import Home from "views/Home";
import SignInAuth from "views/Authentication/SignInAuth";
import RegisterAuth from "views/Authentication/RegisterAuth";

import ToastNotification from "components/common/ToastNotification";
import AddPublication from "./views/Publication/AddPublication";
import Map from "./views/Map/Map";
import EditUserMenu from "./views/Profile/EditProfileMenu";
import ProfileGeneral from "./views/Profile/ProfileGeneral";
import ProfilePassword from "./views/Profile/ProfilePassword";
import ProfilePicture from "./views/Profile/ProfilePicture";
import ProfileLocation from "./views/Profile/ProfileLocation";
import Search from "./views/Search/Search";
import AddPageStep1 from "./views/Page/AddPageStep1";
import SearchResult from "./views/Search/SearchResultPage";
import Notification from "./views/Notification/Notification";
import SearchFilterResult from "./views/Search/SearchFilterResult";
import PageList from "./views/Page/PageList";
import AddPageStep2 from "./views/Page/AddPageStep2";
import AddPageStep3 from "./views/Page/AddPageStep3";
import { HomeChat } from "./views/chat/HomeChat";
import { OneChat } from "./views/chat/OneChat";
import Profile from "./views/Profile/Profile";
import ProfileCategory from "./views/Profile/ProfileCategory";
import ProtectedRoute from "./services/ProtectedRoute";
import EditPublication from "./views/Publication/EditPublication";
import ForgotPassword from "./views/Authentication/ForgotPassword";
import ResetPassword from "./views/Authentication/ResetPassword";
import { App as CapacitorApp } from "@capacitor/app";
import { useEffect } from "react";
import socketIO from "socket.io-client";

import { useDispatch } from "react-redux";
//socket
import { syncChat } from "./store/reducer/chat.reducer";
import useFetchProfile from "./hooks/useFetchProfile";

// Désactive le traitement passif pour tous les événements tactiles
document.addEventListener("touchstart", function () {}, { passive: false });
document.addEventListener("touchmove", function () {}, { passive: false });
document.addEventListener("touchend", function () {}, { passive: false });
document.addEventListener("touchcancel", function () {}, { passive: false });


const socket = socketIO("http://localhost:9900").connect();
console.log("connected, ===> ", socket);


const App: React.FC = () => {
  const profileConnectedUser = useFetchProfile();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("zanjy");

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

  useEffect(() => {
      console.log("profileConnectedUser ===> ", profileConnectedUser);
      console.log("connected, ===> ", socket);


      socket.on("connect", ()=>{
        console.log("connected, ===> ", socket);
        
      })
  }, []);

  return (
    <div className="App">
      <ToastNotification />
      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            {/* // authentication routes */}
            <Route path="/signin" element={<SignInAuth />} />
            <Route path="/register" element={<RegisterAuth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/page/add/step-1"
              element={
                <ProtectedRoute>
                  <AddPageStep1 />
                </ProtectedRoute>
              }
            />

            <Route
              path="/page/add/step-2"
              element={
                <ProtectedRoute>
                  <AddPageStep2 />
                </ProtectedRoute>
              }
            />

            <Route
              path="/page/add/step-3"
              element={
                <ProtectedRoute>
                  <AddPageStep3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/one"
              element={
                <ProtectedRoute>
                  <OneChat />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route element={<WithNav />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* // publication */}
            <Route
              path="/publication"
              element={
                <ProtectedRoute>
                  <AddPublication />
                </ProtectedRoute>
              }
            />
            <Route
              path="/publication/:id"
              element={
                <ProtectedRoute>
                  <EditPublication />
                </ProtectedRoute>
              }
            />
            {/* // Map */}
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <Map />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pages/:query"
              element={
                <ProtectedRoute>
                  <PageList />
                </ProtectedRoute>
              }
            />
            {/*CHAT*/}
            <Route
              path="/chat/list"
              element={
                <ProtectedRoute>
                  <HomeChat />
                </ProtectedRoute>
              }
            />

            {/* SEARCH */}
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search/result/:query"
              element={
                <ProtectedRoute>
                  <SearchResult />
                </ProtectedRoute>
              }
            />
            {/* Notifications */}
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search/result/publication/:query"
              element={
                <ProtectedRoute>
                  <SearchFilterResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search/result/user/:query"
              element={
                <ProtectedRoute>
                  <SearchFilterResult />
                </ProtectedRoute>
              }
            />

            {/* PROFILE */}
            <Route
              path="/profile/edit/menu"
              element={
                <ProtectedRoute>
                  <EditUserMenu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit/general"
              element={
                <ProtectedRoute>
                  <ProfileGeneral />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit/password"
              element={
                <ProtectedRoute>
                  <ProfilePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit/picture"
              element={
                <ProtectedRoute>
                  <ProfilePicture />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit/location"
              element={
                <ProtectedRoute>
                  <ProfileLocation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit/category"
              element={
                <ProtectedRoute>
                  <ProfileCategory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const WithNav = () => {
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

export default App;
