import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeUser = createAsyncThunk("users/remove", async (userId: number) => {
  const response = await axios.delete(`http://localhost:3005/users/${userId}`);
  await new Promise((r) => setTimeout(r, 1000));
  if (response.status === 200) return userId;
  else throw new Error(`Cannot delete user with id ${userId}`);
});
