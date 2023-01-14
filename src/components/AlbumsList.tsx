import React from "react";
import { User } from "../store";

function AlbumsList({ user }: { user: User }) {
  return <div>Albums for {user.name}</div>;
}

export default AlbumsList;
