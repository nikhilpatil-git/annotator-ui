import { Context } from "react";
import { AccountManger } from "./AccountManager";
import { LoginModal } from "./LoginModal";
import { useToast } from "@chakra-ui/core";

import { createContext, useContext } from "react";
import {
  InitialAuthState,
  AuthState,
  AuthAction,
} from "../../application/auth/AuthStateAction";

import { useReducer, useEffect, Reducer } from "react";
import { AuthReducer } from "../../application/auth/AuthReducer";
import { FirebaseClient } from "../../infrastructure/core/FirebaseClient";
import { FirebaseAuthFacade } from "../../infrastructure/auth/firebaseAuthFacade";
import { title } from "process";

export const AuthStateContext: Context<AuthState> = createContext(
  InitialAuthState
);
export const AuthReducerContext = createContext(
  (() => 0) as React.Dispatch<AuthAction>
);

export const LoginStateManger = () => {
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    AuthReducer,
    InitialAuthState
  );

  // Fetch the current user
  useEffect(() => {
    (async () => {
      const firebaseClient = new FirebaseClient();
      const firebaseAuthFacade = new FirebaseAuthFacade(firebaseClient);
      const failureOrSuccess = await firebaseAuthFacade.getSignInUser();
      dispatch({ type: "FetchSignedInUser", user: failureOrSuccess });
    })();
  }, []);

  useEffect(() => {}, [state.isAuthenticated]);
  useEffect(() => {
    // if (state.authFailureOrSuccessOption) {
    //   const errorMessage: string =
    //     state.authFailureOrSuccessOption.failedValue.message;
    //   const toast = useToast();
    //   toast({
    //     title: `Unable to login`,
    //     description: errorMessage,
    //     status: "error",
    //     duration: 9000,
    //     isClosable: true,
    //   });
    //   dispatch({ type: "ClearFailureMessage" });
    // }
  }, [state.authFailureOrSuccessOption]);

  const CheckStatus = () => {
    if (state.isAuthenticated !== undefined) {
      if (state.isAuthenticated) {
        return <AccountManger />;
      }
      return <LoginModal />;
    }
    return null;
  };

  const CheckLoginError = () => {
    if (state.authFailureOrSuccessOption !== undefined) {
    }
    return null;
  };

  return (
    <AuthReducerContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        <CheckStatus />
      </AuthStateContext.Provider>
    </AuthReducerContext.Provider>
  );
};
