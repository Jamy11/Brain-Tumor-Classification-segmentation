import { configureStore } from "@reduxjs/toolkit";
import predictionSlice from "./features/prediction-slice";
import segmentationSlice from "./features/segmentation-slice";

export const store = configureStore({
  reducer: {
    prediction: predictionSlice,
    segmentation: segmentationSlice,
  },
});
