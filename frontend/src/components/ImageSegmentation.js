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

      <div className="p-8 max-w-screen-md mx-auto">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-4">
          Image Segmentation
        </h1>

        {/* Image with Effects */}
        <div className="relative rounded-lg overflow-hidden mb-8">
          <img
            src={"https://bit.ly/dan-abramov"}
            alt="Segmented Image"
            className="w-full h-auto transition-transform duration-500 transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition-opacity duration-500"></div>
        </div>

        {/* Description or Additional Information */}
        <div className="text-center text-gray-600">
          <p>This is the segmented image.</p>
        </div>
      </div>
    </div>
  );
};

export default ImageSegmentation;
