import { IProfile } from "../../../types/profile.type";
import profileApi from "./profile.base";
import { profileUrls } from "./profile.url";

type profileParametersType = {
  id: string;
  ownId: string;
};

const profilesEndpointApi = profileApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileById: builder.query<IProfile, profileParametersType>({
      keepUnusedDataFor: 300,
      query: ({ id, ownId }) => ({
        url: `${profileUrls.getById}/${id}/${ownId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileByIdQuery } = profilesEndpointApi;
