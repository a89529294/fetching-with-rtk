import { configureStore, Dispatch } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(albumsApi.middleware, photosApi.middleware),
});

setupListeners(store.dispatch);

export { store };
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } from "./apis/albumsApi";
export { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } from "./apis/photosApi";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { User } from "./slices/usersSlice";
export type { Album } from "./apis/albumsApi";
export type { Photo } from "./apis/photosApi";
export type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};
