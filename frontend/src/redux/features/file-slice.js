// redux/imageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageFile: null,
  imageSrc: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageFile(state, action) {
      state.imageFile = action.payload;
    },
    setImageSrc(state, action) {
      state.imageSrc = action.payload;
    },
    resetImage(state) {
      state.imageFile = null;
      state.imageSrc = null;
    },
  },
});

export const { setImageFile, setImageSrc, resetImage } = imageSlice.actions;

export default imageSlice.reducer;
