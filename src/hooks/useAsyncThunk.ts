import { AsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import { AsyncThunkConfig } from "../store";
import { useAppDispatch } from "../store/hooks";

type NoArgThunk = AsyncThunk<any, void, AsyncThunkConfig>;
type NumberArgThunk = AsyncThunk<any, number, AsyncThunkConfig>;

// WATCH OUT!! If you pass in an argument to invokeAsyncThunk, it assumes the underlying
// asyncThunk takes the argument
export default function useAsyncThunk(asyncThunk: NoArgThunk | NumberArgThunk) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | { message?: string }>(null);

  const invokeAsyncThunk = (arg?: number) => {
    setIsLoading(true);

    if (arg) {
      dispatch((asyncThunk as NumberArgThunk)(arg))
        .unwrap()
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    } else {
      dispatch((asyncThunk as NoArgThunk)())
        .unwrap()
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    }
  };

  return [invokeAsyncThunk, isLoading, error] as const;
}
