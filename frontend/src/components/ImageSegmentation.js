import { Box, Center, Image, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const ImageSegmentation = () => {
  const segmentedImage = useSelector(
    (state) => state.segmentation.segmentedImage
  );
  const segmentationStatus = useSelector((state) => state.segmentation.status);
  const loadingUi = () => {
    return (
      <Stack padding={4} spacing={1}>
        <Skeleton
          height="200px"
          // isLoaded={false}
          bg="green.500"
          color="white"
          fadeDuration={1}
        ></Skeleton>
      </Stack>
    );
  };

  return (
    <div className="">
      {/* {segmentedImage && (
        <>
          {segmentationStatus === "idel" ? (
            <> {loadingUi()}</>
          ) : (
            <Center height="100vh">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Image
                  src={`data:image/png;base64,${segmentedImage}`}
                  alt="Image Segmentation"
                  boxSize="sm"
                />
              </Box>
            </Center>
          )}
        </>
      )} */}

      <Center height="100vh">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Image
            src={"https://bit.ly/dan-abramov"}
            alt="Image Segmentation"
            boxSize="sm"
          />
        </Box>
      </Center>
    </div>
  );
};

export default ImageSegmentation;
