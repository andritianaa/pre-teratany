import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { IProfile } from "../../types/profile.type";
import { withAsync } from "../../helpers/withAsync";
import { getById } from "../../api/ProfileApi";

export interface UserInitialState {
  id: string | null | undefined;
  token?: string | null | undefined;
  isAuthenticated?: boolean;
  profile?: IProfile | undefined;
}

export interface ProfileProperty {
  token: string;
  profileId: string;
}

const initialState: UserInitialState = {
  id: "",
  token: "",
  isAuthenticated: false,
  profile: undefined,
};

export const fetchConnectedProfile = createAsyncThunk(
  "connected_profile/fetch",
  async (profile_property: ProfileProperty, { rejectWithValue }) => {
    const { error, response } = await withAsync(() =>
      getById(
        profile_property.token,
        profile_property.profileId,
        profile_property.profileId
      )
    );
    if (error) {
      ThrowErrorHandler(error as ErrorData);
      return rejectWithValue(error);
    } else {
      return response?.data as IProfile;
    }
  }
);

export const userSlice = createSlice({
  name: "teratany_user",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<UserInitialState>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.profile = action.payload.profile;
    },
    syncAuthProfile: (state) => {
      state.id = undefined;
      state.token = undefined;
      state.profile = undefined;
      state.isAuthenticated = true;
    },
    resetUserAuthentication: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnectedProfile.fulfilled, (state, { payload }) => {
      state.profile = payload;
    });
  },
});

export const { setAuthentication, resetUserAuthentication, syncAuthProfile } =
  userSlice.actions;
export default userSlice.reducer;
