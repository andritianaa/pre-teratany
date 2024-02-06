import { withAsync } from "../../helpers/withAsync";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedPublication } from "../../api/PublicationApi";
import { IPublication } from "../../types/publication.type";

type PublicationInitialState = {
    loading: boolean,
    error: string,
    publications: IPublication[]
}

const initialState: PublicationInitialState = {
    loading: false,
    error: "",
    publications: []
}

export interface PublicationProperty {
    token: string,
    ownId: string
}

export const fetchFeedPublications = createAsyncThunk('publications_feed/fetch', async (publicationProperty: PublicationProperty, { rejectWithValue }) => {

    const { error, response } = await withAsync(() =>
        getFeedPublication(publicationProperty.token, publicationProperty.ownId!)
    );
    if (error) {
        ThrowErrorHandler(error as ErrorData);
        return rejectWithValue(error)
    } else {
        return response?.data as IPublication[]
    }
})

export const publicationSlice = createSlice({
    name: "publications",
    initialState,
    reducers: {


    },

    extraReducers: (builder) => {
        builder.addCase(fetchFeedPublications.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchFeedPublications.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.publications = payload as IPublication[];
        });
        builder.addCase(fetchFeedPublications.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = String(payload);
        });
    }

})

// export const {  } = historySlice.actions;
export default publicationSlice.reducer;