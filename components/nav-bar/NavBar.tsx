import { SimpleGrid, Flex, Button, Grid } from "@chakra-ui/core";
import { LogoBox } from "./LogoBox";
import { LoginModal } from "./LoginModal";
import { AccountManger } from "./AccountManager";
import { NavDrawer } from "./NavDrawer";
import { LoginStateManger } from "./LoginStateManger";
import { NavItemsInline } from "./NavItemInline";

export const NavBar = () => {
  return (
    <Flex w="full" as="header" height="5rem">
      <Grid
        alignItems="center"
        w="100%"
        templateColumns="repeat(3, 1fr)"
        gridGap={20}
      >
        <SimpleGrid
          display={["block", "block", "none", "none"]}
          justifyContent="start"
        >
          <NavDrawer />
        </SimpleGrid>
        <SimpleGrid justifyContent="end">
          <LogoBox />
        </SimpleGrid>
        <SimpleGrid
          display={["none", "none", "block", "block"]}
          justifyItems="start"
        >
          <NavItemsInline />
        </SimpleGrid>
        <SimpleGrid justifyContent="center">
          <LoginStateManger />
        </SimpleGrid>
      </Grid>
    </Flex>
  );
};
