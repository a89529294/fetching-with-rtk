import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "..";

type Album = { id: number; title: string; userId: number };

const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<Album[], User>({
        query: (user) => ({ url: "/albums", params: { userId: user.id }, method: "GET" }),
      }),
    };
  },
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
