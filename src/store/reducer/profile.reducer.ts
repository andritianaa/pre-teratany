import { withAsync } from "../../helpers/withAsync";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProfile } from "../../types/profile.type";
import {  getFollowedProfile } from "../../api/ProfileApi";

type ProfileInitialState = {
  loading: boolean;
  error: string;
  followed_profiles: IProfile[];
};

const initialState: ProfileInitialState = {
  loading: false,
  error: "",
  followed_profiles: [],
};

export interface ProfileProperty {
  token: string;
  profileId: string;
}

export const fetchFollowedProfiles = createAsyncThunk(
  "followed_profile/fetch",
  async (profile_property: ProfileProperty, { rejectWithValue }) => {
    const { error, response } = await withAsync(() =>
      getFollowedProfile(profile_property.token, profile_property.profileId!)
    );
    if (error) {
      ThrowErrorHandler(error as ErrorData);
      return rejectWithValue(error);
    } else {
      return response?.data as IProfile[];
    }
  }
);

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchFollowedProfiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFollowedProfiles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.followed_profiles = payload as IProfile[];
    });
    builder.addCase(fetchFollowedProfiles.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  },
});

// export const {  } = profileSlice.actions;
export default profileSlice.reducer;
