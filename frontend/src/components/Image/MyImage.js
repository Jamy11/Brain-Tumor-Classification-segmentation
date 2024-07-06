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
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { Container } from "postcss";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
const MyImage = () => {
  const imageSrc = useSelector((state) => state.prediction.imageSrc);

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
            <Button variant="solid" colorScheme="green">
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
