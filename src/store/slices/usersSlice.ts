import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

type UsersState = {
  data: User[];
  isLoading: boolean;
  error: null | { message?: string };
};

const initialState: UsersState = {
  data: [],
  isLoading: false,
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export type User = { id: number; name: string };
