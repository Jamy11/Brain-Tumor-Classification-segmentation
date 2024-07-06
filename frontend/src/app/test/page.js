"use client";
import { Link } from "@chakra-ui/next-js";
import { CloseButton } from "@chakra-ui/react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
const page = () => {
  return (
    // <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
    //   About
    // </Link>

    <>
      saas
      <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
        About
      </Link>
      <CloseButton />
      asdasdsad
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </>
  );
};

export default page;
