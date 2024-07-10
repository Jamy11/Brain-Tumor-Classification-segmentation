import axiosInstance from "@/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  mainResult: "",
  percentages: "",
  status: "idle",
  error: null,
};

export const predictTumor = createAsyncThunk(
  "predictTumor/predict",
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axiosInstance.post("/predict/", formData);
      return response.data;
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
    resetPrediction(state) {
      (state.mainResult = ""),
        (state.percentages = ""),
        (state.status = "idle"),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(predictTumor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(predictTumor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mainResult = action.payload.prediction;
        state.percentages = action.payload.percentages;
      })
      .addCase(predictTumor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetPrediction } = predictionSlice.actions;

export default predictionSlice.reducer;
