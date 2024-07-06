import { configureStore } from "@reduxjs/toolkit";
import predictionSlice from "./features/prediction-slice";
import segmentationSlice from "./features/segmentation-slice";
import fileSlice from "./features/file-slice";

export const store = configureStore({
  reducer: {
    prediction: predictionSlice,
    segmentation: segmentationSlice,
    file: fileSlice,
  },
});
