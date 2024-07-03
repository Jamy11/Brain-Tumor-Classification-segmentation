import axiosInstance from "@/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  result: "",
  status: "idle",
  error: null,
};

export const predictTumor = createAsyncThunk(
  "predictTumor/predict",
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axiosInstance.post("/api/predict/", formData);
      return response.data.prediction;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for making the API call

const predictionSlice = createSlice({
  name: "prediction",
  initialState: initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(predictTumor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(predictTumor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(predictTumor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFile } = predictionSlice.actions;

export default predictionSlice.reducer;
