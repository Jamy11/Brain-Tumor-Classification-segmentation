import React from "react";
import { Image, Box, Center } from "@chakra-ui/react";

const MyImage = () => {
  return (
    <div>
      <Center height="100vh">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Image
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            boxSize="sm"
          />
        </Box>
      </Center>
    </div>
  );
};

export default MyImage;
