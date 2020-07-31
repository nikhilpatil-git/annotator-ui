import { useContext } from "react";
import { AccountManger } from "./AccountManager";
import { LoginModal } from "./LoginModal";

import { AuthState, AuthAction } from "../../application/auth/AuthStateAction";

import { useEffect } from "react";
import { FirebaseClient } from "../../infrastructure/core/FirebaseClient";
import { FirebaseAuthFacade } from "../../infrastructure/auth/firebaseAuthFacade";
import { AuthStateContext, AuthReducerContext } from "../Layout";

// export const AuthStateContext: Context<AuthState> = createContext(
//   InitialAuthState
// );
// export const AuthReducerContext = createContext(
//   (() => 0) as React.Dispatch<AuthAction>
// );

export const LoginStateManger = () => {
  // const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
  //   AuthReducer,
  //   InitialAuthState
  // );

  const state: AuthState = useContext(AuthStateContext);
  const dispatch: React.Dispatch<AuthAction> = useContext(AuthReducerContext);

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

  return <CheckStatus />;
};
