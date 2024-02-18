import { IPublication } from "types/publication.type";
import publicationsApi from "./publication.base";
import { publicationUrls } from "./publication.url";

const publicationsEndpointApi = publicationsApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedPublication: builder.query<IPublication[], string>({
      // remove cached data if the time is elapsed and subscription for the request is down to zero.

      keepUnusedDataFor: 300,
      query: (ownId) => ({
        url: `${publicationUrls.getFeedPublication}/${ownId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFeedPublicationQuery, useLazyGetFeedPublicationQuery } =
  publicationsEndpointApi;
