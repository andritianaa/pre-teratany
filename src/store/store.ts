import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "store/reducer/user.reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import pageReducer from "./reducer/page.reducer";
import accountReducer from "./reducer/account.reducer";

import { ThunkDispatch } from "@reduxjs/toolkit";
import historyReducer from "./reducer/history.reducer";
import publicationReducer from "./reducer/publication.reducer";
import chatReducer from "./reducer/chat.reducer";

const userPersistConfig = {
    key: "teratany_user",
    storage,
};

const chatPersistConfig = {
    key: "teratany_chat",
    storage
}
const acccountPersistConfig = {
    key: "teratany_account",
    storage,
};


const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const accountPersistedReducer = persistReducer(acccountPersistConfig, accountReducer);
const chatPersistedReducer = persistReducer(chatPersistConfig, chatReducer);

const rootReducer = combineReducers({
    teratany_user: userPersistedReducer,
    teratany_page: pageReducer,
    teratany_account: accountPersistedReducer,
    teratany_profile_history: historyReducer,
    teratany_publications: publicationReducer,
    teratany_chat: chatPersistedReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const persistor = persistStore(store)