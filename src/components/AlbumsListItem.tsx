import { Album, useDeleteAlbumMutation } from "../store";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";

function AlbumsListItem({ album }: { album: Album }) {
  const [removeAlbum, results] = useDeleteAlbumMutation();

  const header = (
    <div className="flex gap-2">
      <Button onClick={() => removeAlbum(album)} loading={results.isLoading}>
        <GoTrashcan />
      </Button>
      {album.title}
    </div>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}
export default AlbumsListItem;
