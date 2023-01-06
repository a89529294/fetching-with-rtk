import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "..";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");
  await new Promise((r) => setTimeout(r, 10000));
  return response.data as User[];
});

export { fetchUsers };
