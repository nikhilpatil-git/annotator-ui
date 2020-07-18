import { FunctionComponent } from "react";
import { Flex, SimpleGrid } from "@chakra-ui/core";
import { NavBar } from "./nav-bar/NavBar";
import { Footer } from "./Footer";

export const Layout: FunctionComponent = ({ children }) => {
  return (
    <SimpleGrid columns={1}>
      <NavBar />
      {children}
    </SimpleGrid>
  );
};
