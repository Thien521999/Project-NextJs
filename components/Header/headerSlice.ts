// libs
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// api
import categoryApi from "../../api/categoryApi";

export const getCategory:any = createAsyncThunk("category/getCategory", async () => {
  const data= await categoryApi.get();
  return data?.data?.categories; 
});

const headerSlice = createSlice({
  name: "category",
  initialState: {
    dataCategory: {}
  },
  reducers: {},
  extraReducers: {
    [getCategory.fulfilled]: (state, action) => {
      state.dataCategory = action.payload;
    },
  },
});

const { actions, reducer } = headerSlice;
export default reducer;
