import { useEffect } from "react";
import { fetchUsers } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Skeleton from "./Skeleton";

function UsersList() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) return <Skeleton times={6} className="h-10 w-full" />;

  if (error) return <div>{error.message}</div>;

  return <div>{data.length}</div>;
}

export default UsersList;
