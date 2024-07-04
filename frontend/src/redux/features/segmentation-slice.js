import axiosInstance from "@/axios/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  segmentedImage: null,
  status: "idle",
  error: null,
};

export const segmentImage = createAsyncThunk(
  "segmentation/segmentImage",
  async (file, thunkAPI) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/segment/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.segmented_image;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const segmentationSlice = createSlice({
  name: "segmentation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(segmentImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(segmentImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.segmentedImage = action.payload;
      })
      .addCase(segmentImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default segmentationSlice.reducer;
