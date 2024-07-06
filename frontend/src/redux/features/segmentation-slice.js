import axiosInstance from "@/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  segmentedImage: null,
  status: "idle",
  error: null,
};

// Async thunk to handle image segmentation
export const segmentImage = createAsyncThunk(
  "segmentation/segmentImage",
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/segmentation/", formData);
      return response.data.segmented_image; // Assuming backend returns segmented_image
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create slice for segmentation state management
const segmentationSlice = createSlice({
  name: "segmentation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(segmentImage.pending, (state) => {
        state.status = "loading"; // Set status to loading during async operation
      })
      .addCase(segmentImage.fulfilled, (state, action) => {
        state.status = "succeeded"; // Async operation succeeded
        state.segmentedImage = action.payload; // Store segmented image data in state
      })
      .addCase(segmentImage.rejected, (state, action) => {
        state.status = "failed"; // Async operation failed
        state.error = action.payload; // Store error message in state
      });
  },
});

export default segmentationSlice.reducer;
