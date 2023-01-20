import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { User } from "..";

type Album = { id: number; title: string; userId: number };

const albumsApi = createApi({
  tagTypes: ["albums"],
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<Album[], User>({
        query: (user) => ({ url: "/albums", params: { userId: user.id }, method: "GET" }),
        providesTags: (result, error, arg) => (result ? [{ type: "albums", id: arg.id }] : ["albums"]),
      }),
      addAlbum: builder.mutation<unknown, User>({
        query: (user) => ({
          url: "/albums",
          method: "POST",
          body: { title: faker.commerce.product(), userId: user.id },
        }),
        invalidatesTags: (result, error, arg) => [{ type: "albums", id: arg.id }],
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
