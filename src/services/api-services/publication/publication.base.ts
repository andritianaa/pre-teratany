import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "store/hooks";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const publicationsApi = createApi({
  reducerPath: "publications",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "same-origin",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Accept", "application/json");
      const { token } = (getState() as RootState).teratany_user;
      if (token) {
        headers.set("Authorization", token);
      } else {
        throw new Error("Invalid token provided");
      }

      return headers;
    },
  }),
  //  try to refetch all subscribed queries after regaining a network connection.
  // this will not be evaluated until skip is false.
  refetchOnReconnect: true,
  endpoints: () => ({}),
});

export default publicationsApi;
