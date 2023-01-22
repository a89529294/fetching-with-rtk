import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { Album } from "..";

export type Photo = { url: string; albumId: number; id: number };
const PhotoString = "Photo" as const;
const AlbumsPhotosString = "AlbumsPhotos" as const;

const photosApi = createApi({
  tagTypes: [PhotoString, AlbumsPhotosString],
  reducerPath: "photos",
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
      fetchPhotos: builder.query<Photo[], Album>({
        query: (album) => ({ url: "/photos", params: { albumId: album.id }, method: "GET" }),
        providesTags: (result, error, album) => {
          const photosTags = result
            ? result.map((photo) => ({ type: PhotoString, id: photo.id }))
            : [{ type: AlbumsPhotosString }];
          return [{ type: AlbumsPhotosString, id: album.id }, ...photosTags];
        },
      }),
      addPhoto: builder.mutation<unknown, Album>({
        query: (album) => ({
          url: "/photos",
          method: "POST",
          body: { url: faker.image.abstract(150, 150, true), albumId: album.id },
        }),
        invalidatesTags: (result, error, album) => [{ type: AlbumsPhotosString, id: album.id }],
      }),
      deletePhoto: builder.mutation<Record<string, never>, Photo>({
        query: (photo) => ({
          url: `/photos/${photo.id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, photo) => [{ type: PhotoString, id: photo.id }],
      }),
    };
  },
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photosApi;
export { photosApi };
