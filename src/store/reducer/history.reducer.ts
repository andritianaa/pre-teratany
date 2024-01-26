import { IHistory } from "../../types/historique.type";
import { IProfile } from "../../types/profile.type";
import { withAsync } from "../../helpers/withAsync";
import { getSearchHistory } from "../../api/SearchApi";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
type HistoryInitialState = {
    loading: boolean,
    error: string,
    history: IHistory[]
}

const initialState: HistoryInitialState = {
    loading: false,
    error: "",
    history: []
}

export interface HistoryProperty {
    token: string,
    profile: IProfile
}

export const fetchProfileHistory = createAsyncThunk('history/fetch', async (history: HistoryProperty, { rejectWithValue }) => {
    if (history.profile) {
        const { error, response } = await withAsync(() =>
            getSearchHistory(history.token, history.profile._id!)
        );
        if (error) {
            ThrowErrorHandler(error as ErrorData);
            return rejectWithValue(error)
        } else {
            return response?.data as IHistory[]
        }
    }
})

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addHistoryData: (state, action: PayloadAction<IHistory>) => {
            if (!state.history.find((h) => h.text === action.payload.text) || (state.history.find((h) => h.text === action.payload.text) && action.payload.profileId)) {
                state.history.unshift({
                    _id: action.payload._id,
                    owner: action.payload.owner,
                    profileId: action.payload.profileId,
                    pictureUrl: action.payload.pictureUrl,
                    text: action.payload.text,
                })
            }
        },

        removeHistoryData: (state, action: PayloadAction<IHistory>) => {
            state.history = state.history.filter((h) => h.text !== action.payload.text)
        }


    },

    extraReducers: (builder) => {
        builder.addCase(fetchProfileHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProfileHistory.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.history = payload as IHistory[];
        });
        builder.addCase(fetchProfileHistory.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = String(payload);
        });

    }

})

export const { addHistoryData, removeHistoryData } = historySlice.actions;
export default historySlice.reducer;