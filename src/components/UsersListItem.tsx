import { GoTrashcan } from "react-icons/go";
import useAsyncThunk from "../hooks/useAsyncThunk";
import { removeUser, User } from "../store";
import AlbumsList from "./AlbumsList";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

function UsersListItem({ user }: { user: User }) {
  const [doRemoveUser, isLoading, error] = useAsyncThunk(removeUser);

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={() => doRemoveUser(user.id)}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user.</div>}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
