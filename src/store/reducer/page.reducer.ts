import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProfile } from "../../types/profile.type";

export type CoordonatesValue = {
  latitude?: number | null;
  longitude?: number | null;
};

export interface PageInitialState {
  name?: string | null;
  description?: string;
  profileType?: string;
  category?: string;
  email?: string | null;
  phoneNumber?: string | null;
  website?: string | null;
  coordonates?: CoordonatesValue;
  address?: string;
  country?: string;
  deviantWalletID?: string;
  profileCoordonates?: CoordonatesValue;
  profiles?: IProfile[];
}

const initialState: PageInitialState = {
  email: "",
  phoneNumber: "",
  website: "",
  name: "",
  coordonates: {
    latitude: null,
    longitude: null,
  },
  description: "",
  address: "",
  country: "",
  deviantWalletID: "",
  profileType: "",
  category: "",
  profileCoordonates: {
    latitude: null,
    longitude: null,
  },
  profiles: [],
};

export const pageSlice = createSlice({
  name: "teratany_page",
  initialState,
  reducers: {
    setPageInfo: (state, action: PayloadAction<PageInitialState>) => {
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.website = action.payload.website;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.address = action.payload.address;
      state.country = action.payload.country;
      state.deviantWalletID = action.payload.deviantWalletID;
      state.profileType = action.payload.profileType;
      state.category = action.payload.category;
    },

    setPageCoordonates: (state, action: PayloadAction<PageInitialState>) => {
      state.coordonates = {
        latitude: action.payload.coordonates?.latitude,
        longitude: action.payload.coordonates?.longitude,
      };
    },
    setCoordonates: (state, action: PayloadAction<PageInitialState>) => {
      state.profileCoordonates = {
        latitude: action.payload.profileCoordonates?.latitude!,
        longitude: action.payload.profileCoordonates?.longitude!,
      };
    },

    setProfilesWithCoordonates: (
      state,
      action: PayloadAction<PageInitialState>
    ) => {
      state.profiles = action.payload.profiles;
    },

    resetPageInfo: (state) => initialState,
  },
});

export const {
  setPageInfo,
  setPageCoordonates,
  resetPageInfo,
  setCoordonates,
  setProfilesWithCoordonates,
} = pageSlice.actions;
export default pageSlice.reducer;
