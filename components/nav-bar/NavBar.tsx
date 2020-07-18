import { SimpleGrid, Flex, Button, Grid, Text } from "@chakra-ui/core";
import { LogoBox } from "./LogoBox";
import { LoginModal } from "./LoginModal";
import { AccountManger } from "./AccountManager";
import { NavDrawer } from "./NavDrawer";
import { LoginStateManger } from "./LoginStateManger";
import { NavItemsInline } from "./NavItemInline";

export const NavBar = () => {
  return (
    <Flex as="header" height="5rem" bg="#303a4e" m={2}>
      <Grid
        alignItems="center"
        w="100%"
        templateColumns="1fr auto 1fr"
        gridGap={20}
      >
        <SimpleGrid
          display={["block", "block", "none", "none"]}
          justifyContent="start"
        >
          <NavDrawer />
        </SimpleGrid>
        <SimpleGrid justifyContent="start">
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize={["sm", "sm", "2xl", "4xl"]}
            p={2}
          >
            DATA ANNOTATOR
          </Text>
        </SimpleGrid>
        <SimpleGrid
          display={["none", "none", "block", "block"]}
          justifyItems="start"
        >
          <NavItemsInline />
        </SimpleGrid>
        <SimpleGrid pr={4} justifyContent="center">
          <LoginStateManger />
        </SimpleGrid>
      </Grid>
    </Flex>
  );
};
