import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";
import type { User } from "../";

export const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: faker.name.fullName(),
  });
  await new Promise((r) => setTimeout(r, 1000));
  return response.data as User;
});
