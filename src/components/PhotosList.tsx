import { Album, useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";

function PhotosList({ album }: { album: Album }) {
  const { data, isFetching, isLoading, isError, isUninitialized } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handleAddPhoto = () => addPhoto(album);

  const content = (() => {
    if (isUninitialized) return <div>You shouldn't see this.</div>;
    if (isLoading || isFetching) return <Skeleton className="h-20 w-20 mr-2" times={4} />;
    if (isError) return <div>Error fetching photos.</div>;

    return data.map((photo) => <PhotosListItem key={photo.id} photo={photo} />);
  })();

  return (
    <div>
      <div className="m-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-wrap justify-center">{content}</div>
    </div>
  );
}
export default PhotosList;
