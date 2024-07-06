import React from "react";
import {
  Image,
  Box,
  Center,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { Container } from "postcss";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { segmentImage } from "@/redux/features/segmentation-slice";

const MyImage = () => {
  const dispatch = useDispatch();
  const { imageFile } = useSelector((state) => state.file);

  const imageSrc = useSelector((state) => state.prediction.imageSrc);

  const handleSegmentation = () => {
    if (imageFile) {
      dispatch(segmentImage(imageFile));
    }
  };

  return (
    <div>
      <Card maxW="lg">
        <CardBody>
          <Image
            src={imageSrc}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Image Classification
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={handleSegmentation}
            >
              Image Segmentation
            </Button>
          </ButtonGroup>
        </CardFooter>
        <Button variant="solid" colorScheme="red">
          Delete Image
        </Button>
      </Card>
    </div>
  );
};

export default MyImage;
