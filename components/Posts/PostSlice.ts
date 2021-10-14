//1.Setup userSlice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import postApi from "../../api/postApi";

// First, create the thunk
export const createNewPost = createAsyncThunk("posts/createNewPost", async (payload:any) =>{
  const dataRes = await postApi.createNewPost(payload);
  // console.log(dataRes?.data?.data?.post);
//   localStorage.setItem(Storekeys.USER, JSON.stringify(data?.data?.user));
  return dataRes?.data?.data?.post;
})

export const editPost = createAsyncThunk("posts/editPost", async (payload:any) =>{
  const dataRes = await postApi.editPost(payload);
  // console.log(dataRes?.data?.data?.post);
//   localStorage.setItem(Storekeys.USER, JSON.stringify(data?.data?.user));
  return dataRes?.data?.data?.post;
})

const postSlice = createSlice({
  name: "posts",
  initialState: {
    postData: {}, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
        createNewPost.fulfilled, (state, action) => {
        state.postData = action.payload;
      },
    ),
    builder.addCase(
        editPost.fulfilled, (state, action) => {
        state.postData = action.payload;
      },
    )
  },
});

const { actions, reducer } = postSlice;

export default reducer;
