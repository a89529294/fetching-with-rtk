import { useAddAlbumMutation, User } from "../store";
import { useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }: { user: User }) {
  const { data, error, isLoading, isUninitialized } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  let content;
  if (isUninitialized) content = "";
  else if (isLoading) content = <Skeleton times={3} />;
  else if (error) content = <div>Error loading albums.</div>;
  else
    content = data.map((album) => (
      <ExpandablePanel key={album.id} header={<div>{album.title}</div>}>
        List of photos in the album.
      </ExpandablePanel>
    ));

  return (
    <div>
      <div>
        Albums for {user.name} <Button onClick={() => addAlbum(user)}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
