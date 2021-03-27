import { IconButton } from "@material-ui/core";
import { ArrowBack, SearchOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Search.module.css";
import { searchImages, setSearchText, getSearchText } from "./SearchSlice";

interface searchProps {
  initialLoad: boolean;
  searchingPhotos: boolean;
   retrievedPhotos: boolean;
  errorMessage: string;
}

function Search({
  initialLoad,
  searchingPhotos,
   retrievedPhotos,
  errorMessage,
}: searchProps) {
  let searchContent;
  const dispatch = useDispatch();
  const searchText = useSelector(getSearchText);
  const [feedbackText, setfeedbackText] = useState("");

  const setText = (text: string) => {
    setfeedbackText(text);
    // dispatch(setDefaultStatus({ status: "empty", text: null }));

    setTimeout(() => {
      setfeedbackText("");
    }, 4000);
  };

  const getImages = (query: string) => {
    dispatch(searchImages(query));
  };

  const handleChange = (event: any) => {
    let input = event.target.value;
    if (input === "") {
      setText("Enter a search term to search for images");

      return;
    } else if (input.length < 3) {
      setText(
        "To get accurate results, your search term should be three or more characters"
      );
      return;
    }
    setfeedbackText("");
    dispatch(setSearchText(input));
    getImages(input);
  };

  const handleBtnClick = () => {
    if (searchText === "" || searchText === null) {
      setText("Enter a search term to search for images");
      return;
    } else if (searchText.length < 3) {
      setText(
        "To get accurate results, your search term should be three or more characters"
      );
      return;
    }
    getImages(searchText);
  };
  const handleBackClick = () => {
    window.location.reload();
  };

  if (initialLoad) {
    searchContent = <h2> Loading Images </h2>;
  } else if (searchingPhotos && searchText) {
    searchContent = (
      <h2 className="d-flex">
        <IconButton onClick={handleBackClick}>
          <ArrowBack />
        </IconButton>
        Searching for <span> " {searchText} " </span>
      </h2>
    );
  } else if (retrievedPhotos && searchText) {
    searchContent = (
      <h2 className="d-flex">
        <IconButton onClick={handleBackClick}>
          <ArrowBack />
        </IconButton>
        Search Results for <span> " {searchText} " </span>
      </h2>
    );
  } else{
      searchContent = (   <div className={styles.search_box}>
        <IconButton
          aria-label="search"
          onClick={handleBtnClick}
          disabled={searchText === null || initialLoad || searchingPhotos}
        >
          <SearchOutlined />
        </IconButton>
        <input
          type="text"
          placeholder="Search for photo"
          onInput={handleChange}
        />
      </div>)
  }
  return (
    <div className={styles.search_holder}>
    
      {searchContent}
      <h4> {feedbackText} </h4> 
      <h4> {errorMessage} </h4>
    
    </div>
  );
}

export default Search;
