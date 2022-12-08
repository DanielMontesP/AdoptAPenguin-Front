import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProcess } from "../../types/system/systemInterfaces";

interface SliceIniState {
  allProcess: IProcess[];
  server: { connected: boolean; path: string; status: string };
}

const initialState: SliceIniState = {
  allProcess: [],
  server: { connected: false, path: "", status: "" },
};

const systemSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    loading: (system, action: PayloadAction<IProcess[]>) => ({
      ...system,
      allProcess: [...action.payload],
      loading: true,
    }),

    finishedLoading: (system, action: PayloadAction<IProcess[]>) => ({
      ...system,
      allProcess: [...action.payload],
      loading: false,
    }),

    server: (
      system,
      action: PayloadAction<{
        connected: boolean;
        path: string;
        status: string;
      }>
    ) => ({
      ...system,
      server: {
        connected: action.payload.connected,
        path: action.payload.path,
        status: action.payload.status,
      },
    }),
  },
});

export const {
  loading: serverLoadingActionCreator,
  finishedLoading: serverFinishedLoadActionCreator,
  server: serverInfoActionCreator,
} = systemSlice.actions;

export default systemSlice.reducer;
