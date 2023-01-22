import { useAddAlbumMutation, User } from "../store";
import { useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }: { user: User }) {
  const { data, error, isLoading, isFetching, isUninitialized } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  let content;
  if (isUninitialized) content = "";
  else if (isLoading || isFetching) content = <Skeleton times={3} className="h-10 w-full" />;
  else if (error) content = <div>Error loading albums.</div>;
  else content = data.map((album) => <AlbumsListItem key={album.id} album={album} />);

  return (
    <div>
      <div className="m-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button onClick={() => addAlbum(user)} loading={results.isLoading}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
