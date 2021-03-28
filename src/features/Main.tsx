import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "./img_images/ImageList";
import Loaders from "./search/Loaders";
import Search from "./search/Search";
import {
  getSearchText,
  getStatus,
  getError,
  getImages,
  getInitialImages,
} from "./search/SearchSlice";

function Main() {
  let mainContent;
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const searchText = useSelector(getSearchText);
  const error = useSelector(getError);
  const imgItems = useSelector(getImages);
  let initialLoading: boolean = false;
  let searchingPhotos: boolean = false;
  let retreivedPhotos: boolean = false;

  useEffect(() => {
    if (status === "empty") {
      dispatch(getInitialImages());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    searchText ? (searchingPhotos = true) : (initialLoading = true);
    mainContent = <Loaders />;
  }

  if (status === "succeeded") {
    retreivedPhotos = true;
    mainContent = <ImageList images={imgItems} />;
  }

  if (status === "failed") {
    initialLoading = false;
    searchingPhotos = true;
    retreivedPhotos = false;
    mainContent = <Loaders />;
  }

  return (
    <div>
      <Search
        initialLoad={initialLoading}
        searchingPhotos={searchingPhotos}
        retrievedPhotos={retreivedPhotos}
        errorMessage={error}
      />

      {mainContent}
    </div>
  );
}

export default Main;
