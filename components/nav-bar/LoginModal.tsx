import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Grid,
  Text,
  Link,
} from "@chakra-ui/core";

import {
  LoginWithGoogle,
  LoginWithFacebook,
  LoginWithGithub,
} from "./SocialButtons";
import { useReducer, useEffect, Reducer, useContext } from "react";
import { AuthReducer } from "../../application/auth/AuthReducer";
import {
  AuthState,
  AuthAction,
  InitialAuthState,
} from "../../application/auth/AuthStateAction";
import React from "react";
import { FirebaseClient } from "../../infrastructure/core/FirebaseClient";
import { FirebaseAuthFacade } from "../../infrastructure/auth/firebaseAuthFacade";
import { AuthStateContext, AuthReducerContext } from "./LoginStateManger";
import { AuthFailure } from "../../domain/auth/authFailure";

export const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const primaryColor = "primary.green";
  const primaryLightColor = "primary.lightGreen";

  const state: AuthState = useContext(AuthStateContext);
  const dispatch: React.Dispatch<AuthAction> = useContext(AuthReducerContext);

  const handleSignIn = async () => {
    const firebaseClient = new FirebaseClient();
    const firebaseAuthFacade = new FirebaseAuthFacade(firebaseClient);
    const failureOrSuccess = await firebaseAuthFacade.signInWithGoogle();
    dispatch({ type: "SignInWithGoogle", result: failureOrSuccess });
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        fontSize={["xs", "lg", "lg", "lg"]}
        size="xs"
        p={[2, 4, 4, 5]}
        _hover={{ bg: primaryLightColor }}
        backgroundColor={primaryColor}
        _active={{
          bg: primaryLightColor,
          transform: "scale(0.98)",
          borderColor: "#bec3c9",
        }}
        _focus={{
          outline: 0,
        }}
        outline={0}
        variant="solid"
      >
        Login
      </Button>
      <Modal
        blockScrollOnMount={true}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="300px"
      >
        <ModalOverlay />
        <ModalContent
          bg="white"
          borderRadius={8}
          borderTopWidth={5}
          borderTopColor="primary.green"
          pb={5}
        >
          <ModalHeader>
            <Box>
              <Text color="black">Welcome,</Text>
              <Text color="grey">Sign in to continue!</Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <Grid gap={2}>
              <Link
                onClick={() => {
                  handleSignIn();
                }}
              >
                <LoginWithGoogle />
              </Link>
              <LoginWithFacebook />
              <LoginWithGithub />
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
