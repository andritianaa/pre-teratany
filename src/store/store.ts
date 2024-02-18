import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "store/reducer/user.reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import pageReducer from "./reducer/page.reducer";
import accountReducer from "./reducer/account.reducer";
import historyReducer from "./reducer/history.reducer";
import publicationReducer from "./reducer/publication.reducer";
import chatReducer from "./reducer/chat.reducer";
// import socketReducer from "./reducer/socket.reducer";
import profileReducer from "./reducer/profile.reducer";
import publicationsApi from "../services/api-services/publication/publication.base";
import { setupListeners } from "@reduxjs/toolkit/query";

const userPersistConfig = {
  key: "teratany_user",
  storage,
};

const chatPersistConfig = {
  key: "teratany_chat",
  storage,
};
const acccountPersistConfig = {
  key: "teratany_account",
  storage,
};

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const accountPersistedReducer = persistReducer(
  acccountPersistConfig,
  accountReducer
);
const chatPersistedReducer = persistReducer(chatPersistConfig, chatReducer);

const rootReducer = combineReducers({
  teratany_user: userPersistedReducer,
  teratany_page: pageReducer,
  teratany_account: accountPersistedReducer,
  teratany_profile_history: historyReducer,
  teratany_publications: publicationReducer,
  teratany_chat: chatPersistedReducer,
  // teratany_socket: socketReducer,
  teratany_profiles: profileReducer,
  [publicationsApi.reducerPath]: publicationsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(publicationsApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
