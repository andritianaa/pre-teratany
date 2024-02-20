import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import ToastNotification from "components/common/ToastNotification";

// Désactive le traitement passif pour tous les événements tactiles
document.addEventListener("touchstart", function () {}, { passive: false });
document.addEventListener("touchmove", function () {}, { passive: false });
document.addEventListener("touchend", function () {}, { passive: false });
document.addEventListener("touchcancel", function () {}, { passive: false });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastNotification />
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
