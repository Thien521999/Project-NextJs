//1.Setup userSlice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import userApi from "../../api/userApi";
import { Storekeys } from "../../constants/Login";

// First, create the thunk
export const register = createAsyncThunk("user/register", async (payload:any) => {
  //payload : là tham so mà thang user nó truyền vào khi nó goi thang register
  //call API to register
  const data = await userApi.register(payload); //payload:thong tin nhap tren form
  //save data to local storage
  localStorage.setItem(Storekeys.TOKEN, data?.data?.token); //token
  localStorage.setItem(Storekeys.USER, JSON.stringify(data?.data?.user)); // do user là 1 object nen phai dùng JSON.stringify(data.user)
  //(nhớ)return về  user data
  return data?.data;
});

export const login = createAsyncThunk("user/login", async (payload:any) => {
  //payload : là tham so mà thang user nó truyền vào khi nó goi thang login
  //call API to login
  const data = await userApi.login(payload); //payload:thong tin hap tren form
  // console.log(data);
  //save data to local storage
  localStorage.setItem(Storekeys.TOKEN, data?.data?.token); //token
  localStorage.setItem(Storekeys.USER, JSON.stringify(data?.data?.user)); // do user là 1 object nen phai dùng JSON.stringify(data.user)
  // console.log(data?.data);
  //(nhớ)return về  user data
  return data?.data;
});

export const changePassword = createAsyncThunk("user/changePassword", async (payload:any) => {
  const data = await userApi.getChangePassword(payload);
  return data?.data;
});

export const updateProfile = createAsyncThunk("user/updateProfile", async (payload:any) =>{
  const data = await userApi.updateProfile(payload);
  
  localStorage.setItem(Storekeys.USER, JSON.stringify(data?.data?.user));
  return data?.data?.user;
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {}, //thong tin cua thang login user
    settings: {},
  }, //gia tri khoi tao
  reducers: {
    //Asynchronous actions
    logout(state) {
      localStorage.removeItem(Storekeys.TOKEN);
      localStorage.removeItem(Storekeys.USER);
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      register.fulfilled, (state, action) => {
        state.current = action.payload;
      },
    )
    builder.addCase(
      login.fulfilled, (state, action) => {
        state.current = action.payload;
      },
    )
    builder.addCase(
      changePassword.fulfilled, (state, action) => {
        state.current = action.payload;
      },
    )
    builder.addCase(
      updateProfile.fulfilled, (state, action) => {
        state.current = action.payload;
      },
    )
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;

export default reducer;
