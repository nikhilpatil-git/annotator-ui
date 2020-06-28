import Head from "next/head";
import { Box, SimpleGrid, Flex } from "@chakra-ui/core";
import { LargeScreen, SmallScreen } from "../util/Devices";
import { NavBar } from "../components/nav-bar/NavBar";

export default function Home() {
  return (
    <Box w="full" h="100vh" p={2}>
      <Flex w="full" as="header" height="5rem">
        <NavBar />
      </Flex>
    </Box>
  );
}

// <SmallScreen>
//   <NavBarSmall />
// </SmallScreen>
// <LargeScreen>
//   <NavBarLarge />
// </LargeScreen>
