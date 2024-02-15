import { IPublication } from "types/publication.type";
import publicationsApi from "./publication.base";
import { publicationUrls } from "./publication.url";

const publicationsEndpointApi = publicationsApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedPublication: builder.query<IPublication[], string>({
      query: (ownId) => ({
        url: `${publicationUrls.getFeedPublication}/${ownId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFeedPublicationQuery, useLazyGetFeedPublicationQuery } =
  publicationsEndpointApi;
