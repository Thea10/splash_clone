import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  RootState } from "../../app/store";
import axios from "axios";
import { API_KEY } from "./keys";

interface SearchState {
  imageList: Array<any>;
  searchText: string;
  status: string;
  error: any;
}
const initialState: SearchState = {
  imageList: [],
  searchText:"",
  status: "empty",
  error: null,
};

export const searchImages = createAsyncThunk(
  "search/searchMovies",
  async (text: string) => {
    let url = "https://api.unsplash.com/";
    const response = await axios.get(
      `${url}/search/photos/?client_id=${API_KEY}&query=${text}&page=1&per_page=8`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept-Version": "v1",
        },
      }
    );
    if (response.data.Error) {
      return response.data.Error;
    }
    return response.data.results;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    storeImages: (state, action: PayloadAction<any[]>) => {
      let { payload } = action;
      state.imageList.push(payload);
      console.log(state.imageList);
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      let { payload } = action;
      state.searchText = payload;
    },
    setDefaultStatus: (state, action: PayloadAction<any>) => {
      let { status, text } = action.payload;
      state.status = status;
      state.searchText = text;
    },
  },
  extraReducers: builder => {
    builder
     .addCase(searchImages.pending, (state) => {
      state.status = "loading";
    })
    .addCase(searchImages.fulfilled, (state, { payload }) => {
        if (Array.isArray(payload)) {
          state.status = "succeeded";
          console.log(payload)
          state.imageList = payload;
        } else {
          state.status = "failed";
          state.error = payload;
        }
      }) 
      .addCase(searchImages.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message;
      });
  },
});


export const {storeImages, setSearchText, setDefaultStatus}  = searchSlice.actions;

export const getSearchText = (state: RootState) => state.search.searchText;
export const getStatus = (state: RootState)=> state.search.status;
export const getImages = (state: RootState) => state.search.imageList;
export const getError = (state: RootState) => state.search.error;

export default searchSlice.reducer;