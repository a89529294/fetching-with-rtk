import { useEffect } from "react";
import useAsyncThunk from "../hooks/useAsyncThunk";
import { fetchUsers, addUser } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeUser } from "../store/thunks/removeUser";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";

function UsersList() {
  const [doFetchUsers, isLoadingUser, loadingUserError] = useAsyncThunk(fetchUsers);
  const [doAddUser, isCreatingUser, creatingUserError] = useAsyncThunk(addUser);
  const { data } = useAppSelector((state) => state.users);

  const handleUserAdd = () => doAddUser();

  useEffect(() => {
    doFetchUsers();
  }, []);

  const renderedUsers = (() => {
    if (isLoadingUser) return <Skeleton times={6} className="h-10 w-full" />;
    if (loadingUserError) return <div>{loadingUserError.message}</div>;
    return data.map((user) => <UsersListItem user={user} key={user.id} />);
  })();

  return (
    <div>
      <div className="flex flex-row items-center justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "Error creating user"}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
