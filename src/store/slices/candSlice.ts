import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { candidatesState, DataStatus } from "../../types/reduxTypes";
import { ICandidate } from "../../types/resModeks/ICand";

const baseURL = "http://localhost:8200/";

const initialState: candidatesState = {
  error: null,
  status: DataStatus.IDLE,
  candidates: [],
};

export const fetchCandidates = createAsyncThunk(
  "candidates/getList",
  async (_, thunkApi) => {
    try {
      const candidates = (await fetch(baseURL + "election").then((d) =>
        d.json()
      )) as ICandidate[];
      return thunkApi.fulfillWithValue(candidates);
    } catch (err) {
      const error = err as Error;
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<candidatesState>) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.candidates = [];
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.candidates = action.payload as unknown as ICandidate[];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.candidates = [];
      });
  },
});

export default candidatesSlice