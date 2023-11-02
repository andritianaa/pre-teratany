import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "store/reducer/user.reducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import pageReducer from "./reducer/page.reducer";
import accountReducer from "./reducer/account.reducer";



const userPersistConfig = {
    key: "teratany_user",
    storage,
};
const acccountPersistConfig = {
    key: "teratany_account",
    storage,
};


const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const accountPersistedReducer = persistReducer(acccountPersistConfig, accountReducer);

const rootReducer = combineReducers({
    teratany_user: userPersistedReducer,
    teratany_page: pageReducer,
    teratany_account: accountPersistedReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)