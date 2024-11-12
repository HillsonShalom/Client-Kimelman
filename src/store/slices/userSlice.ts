import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
import { DataStatus, userState } from "../../types/reduxTypes";
import { loginDTO, registerDTO } from "../../types/reqModels/authTDOs";
import { IUser } from "../../types/resModeks/IUser";

const baseUrl = "http://localhost:8200/account/"
  
  const initialState: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null,
  };
  export const fetchRgister = createAsyncThunk(
    "user/register",
    async (dto: registerDTO, thunkApi) => {
      try {
        const res = await fetch(baseUrl + "register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        });
        if (res.status != 201) {
          thunkApi.rejectWithValue("Can't register, please try again");
        }
      } catch (err) {
        thunkApi.rejectWithValue((err as Error).message);
      }
    }
  );
  
  export const fetchLogin = createAsyncThunk(
    "user/login",
    async (dto: loginDTO, thunkApi) => {
      try {
        console.log("entered to login");
        const res = await fetch(baseUrl + "login", {
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        });
        if (res.status != 200) {
          return thunkApi.rejectWithValue("Can't login, please try again");
        }
        const body = await res.json() as {token: string};
        console.log(body.token);
        localStorage.setItem("Authorization", body.token);
      } catch (err) {
        thunkApi.rejectWithValue((err as Error).message);
      }
    }
  );

  export const fetchUser = createAsyncThunk(
    "user/user",
    async (_, thunkApi) => {
      try {
        const res = await fetch(baseUrl, {
          headers: {
            "Authorization": localStorage.getItem("Authorization")!
          }
        })
        if (res.status != 200) {
          thunkApi.rejectWithValue("Can't login, please try again");
        }
        const body = await res.json() as IUser;
        return thunkApi.fulfillWithValue(body)
      } catch (err) {
        thunkApi.rejectWithValue((err as Error).message);
      }
    }
  );
  
  
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
      },
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.status = DataStatus.LOADING;
          state.error = null;
          state.user = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.status = DataStatus.SUCCESS;
          state.error = null;
          state.user = action.payload as unknown as IUser;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.status = DataStatus.FAILED;
          state.error = action.error as string;
          state.user = null;
        })
    },
  });
  
  export default userSlice;