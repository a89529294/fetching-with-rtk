import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { User } from "..";

export type Album = { title: string; userId: number; id: number };
const AlbumString = "Album" as const;
const UsersAlbumsString = "UsersAlbums" as const;

const albumsApi = createApi({
  tagTypes: [AlbumString, UsersAlbumsString],
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await new Promise((r) => setTimeout(r, 1000));
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      // <returnType, paramType> of query
      fetchAlbums: builder.query<Album[], User>({
        query: (user) => ({ url: "/albums", params: { userId: user.id }, method: "GET" }),
        providesTags: (result, error, user) => {
          const albumsTags = result
            ? result.map((album) => ({ type: AlbumString, id: album.id }))
            : [{ type: UsersAlbumsString }];
          return [{ type: UsersAlbumsString, id: user.id }, ...albumsTags];
        },
      }),
      addAlbum: builder.mutation<unknown, User>({
        query: (user) => ({
          url: "/albums",
          method: "POST",
          body: { title: faker.commerce.product(), userId: user.id },
        }),
        invalidatesTags: (result, error, user) => [{ type: UsersAlbumsString, id: user.id }],
      }),
      deleteAlbum: builder.mutation<Record<string, never>, Album>({
        query: (album) => ({
          url: `/albums/${album.id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, album) => [{ type: AlbumString, id: album.id }],
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } = albumsApi;
export { albumsApi };
