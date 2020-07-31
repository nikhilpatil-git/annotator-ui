import { Grid, Text, Box, Image, Icon, Link } from "@chakra-ui/core";
import { AccountMangerPopup } from "./AccountMangerPopup";
import React, { useContext, useEffect } from "react";
import { AuthState, AuthAction } from "../../application/auth/AuthStateAction";
import { FirebaseClient } from "../../infrastructure/core/FirebaseClient";
import { FirebaseAuthFacade } from "../../infrastructure/auth/firebaseAuthFacade";
import { AuthStateContext, AuthReducerContext } from "../Layout";

export const AccountManger = () => {
  const state: AuthState = useContext(AuthStateContext);
  const dispatch: React.Dispatch<AuthAction> = useContext(AuthReducerContext);

  const formatUserName = (): string => {
    let name: string = "Guest";
    if (state.currentUser && state.currentUser.name) {
      let tempName = state.currentUser.name.trim();
      if (tempName.includes(" ")) {
        tempName = tempName.split(" ")[0];
      }
      name = tempName.substring(0, Math.min(tempName.length, 6)).concat("..");
    }
    return name;
  };

  const formatProfilePic = (): string => {
    let profilePic: string = "/images/default_icon.png";
    if (state.currentUser && state.currentUser.photoUrl) {
      profilePic = state.currentUser.photoUrl;
    }
    return profilePic;
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const handleSignOut = async () => {
    const firebaseClient = new FirebaseClient();
    const firebaseAuthFacade = new FirebaseAuthFacade(firebaseClient);
    const failureOrSuccess = await firebaseAuthFacade.signOut();
    dispatch({ type: "SignOutUser", result: failureOrSuccess });
  };

  return (
    <AccountMangerPopup togglePopup={isOpen} handleSignOut={handleSignOut}>
      <Grid
        justifyItems="center"
        alignItems="center"
        w={["100px", "100px", "180px", "180px"]}
        h="50px"
        templateColumns={[
          "repeat(2, 40px)",
          "repeat(2, 40px)",
          "40px fit-content(100px) 40px",
          "40px fit-content(100px) 40px",
        ]}
        gap={2}
      >
        <Box as={Link} onClick={open} p={1} size="40px">
          <Image rounded="full" src={formatProfilePic()} />
        </Box>
        <Text
          as={Link}
          onClick={open}
          style={{ textDecoration: "none" }}
          textAlign="center"
          fontWeight="bold"
          fontSize="lg"
          display={["none", "none", "block", "block"]}
        >
          {formatUserName()}
        </Text>
        <Link onClick={open}>
          <Icon name="chevron-down" size="40px" />
        </Link>
      </Grid>
    </AccountMangerPopup>
  );
};
