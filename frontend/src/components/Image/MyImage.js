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
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
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
