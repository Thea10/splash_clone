import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "./img_images/ImageList";
import Loaders from "./search/Loaders";
import Search from "./search/Search";
import {
  getSearchText,
  getStatus,
  getError,
  //getImages,
  searchImages,
} from "./search/SearchSlice";

function Main() {
  let mainContent;
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const searchText = useSelector(getSearchText);
  const error = useSelector(getError);
 // const imgItems = useSelector(getImages);
  let initialLoading: boolean = false;
  let searchingPhotos: boolean = false;
  let retreivedPhotos: boolean = false;

  useEffect(() => {
    if (status === "empty") {
      dispatch(searchImages("hello"));
    }
  }, [status, dispatch]);

  if (status === "loading" && !searchText) {
    initialLoading = true;
    mainContent = (
      <Loaders />

      //   <div>
      //     <Search
      //       initialLoad={true}
      //       searchingPhotos={false}
      //       retrievedPhotos={false}
      //       errorMessage={""}
      //       searchText={""}
      //     />
      //     <Loaders />
      //   </div>
    );
  } else if (status === "loading" && searchText) {
    searchingPhotos = true;
    mainContent = (
      <Loaders />

      //   <div>
      //     <Search
      //       initialLoad={false}
      //       searchingPhotos={true}
      //       retrievedPhotos={false}
      //       errorMessage={""}
      //       searchText={searchText}
      //     />
      //     <Loaders />
      //   </div>
    );
  }

  if (status === "succeeded") {
    retreivedPhotos = true;
    mainContent = (
      <ImageList />

      //   <div>
      //     <Search
      //       initialLoad={false}
      //       searchingPhotos={false}
      //       retrievedPhotos={true}
      //       errorMessage={""}
      //       searchText={""}
      //     />
      //     <ImageList />
      //   </div>
    );
  }
  //   else if (status === "succeeded" && searchText) {
  //     mainContent = (
  //       <div>
  //         <Search
  //           initialLoad={false}
  //           searchingPhotos={false}
  //           retrievedPhotos={true}
  //           errorMessage={""}
  //           searchText={searchText}
  //         />
  //         <ImageList />
  //       </div>
  //     );
  //   }

  if (status === "failed") {
    initialLoading = false;
    searchingPhotos = true;
    retreivedPhotos = false;
    mainContent = (
      <Loaders />

      //   <div>
      //     <Search
      //       initialLoad={false}
      //       searchingPhotos={false}
      //       retrievedPhotos={false}
      //       errorMessage={error}
      //       searchText={''}
      //     />
      //     <Loaders />
      //   </div>
    );
  }

  //   else if (status === "failed" && searchText) {
  //     mainContent = (
  //       <div>
  //         <Search
  //           initialLoad={false}
  //           searchingPhotos={true}
  //           retrievedPhotos={false}
  //           errorMessage={error}
  //           searchText={searchText}
  //         />
  //         <Loaders />
  //       </div>
  //     );
  //   }
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
