import React from "react";
import MyImage from "./MyImage";
import ImageSegmentation from "../ImageSegmentation";
import ImageClassifier from "../ImageClassifier";
import { Center, Flex } from "@chakra-ui/react";

const ImageContainer = () => {
  return (
    <>
      <MyImage />

      <ImageClassifier />

      <ImageSegmentation />
    </>
  );
};

export default ImageContainer;
