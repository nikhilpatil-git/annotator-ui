import { AuthState, AuthAction } from "./AuthStateAction";
import { FirebaseClient } from "../../infrastructure/core/FirebaseClient";
import { FirebaseAuthFacade } from "../../infrastructure/auth/firebaseAuthFacade";
import {
  Either,
  left,
  getOrElse,
  isRight,
  isLeft,
  fold,
} from "fp-ts/lib/Either";
import { AuthFailure } from "../../domain/auth/authFailure";
import { Unit, unit } from "../../domain/core/unit";
import { Option, some, getLeft } from "fp-ts/lib/Option";
import { Reducer } from "react";
import { pipe } from "fp-ts/lib/function";
import { User } from "../../domain/auth/user";

export const AuthReducer: Reducer<AuthState, AuthAction> = (
  authState: AuthState,
  authAction: AuthAction
) => {
  let newState: AuthState = { ...authState };
  switch (authAction.type) {
    case "SignInWithGoogle":
      pipe(
        authAction.result,
        fold(
          (error: AuthFailure<Error>) => {
            newState.authFailureOrSuccessOption = error;
          },
          () => {
            newState.isAuthenticated = true;
          }
        )
      );
      return newState;
    case "FetchSignedInUser":
      pipe(
        authAction.user,
        fold(
          (error: AuthFailure<Error>) => {
            newState.isAuthenticated = false;
            newState.authFailureOrSuccessOption = error;
          },
          (user: User) => {
            newState.isAuthenticated = true;
            newState.currentUser = user;
          }
        )
      );
      return newState;
    case "SignOutUser":
      pipe(
        authAction.result,
        fold(
          (error: AuthFailure<Error>) => {
            newState.isAuthenticated = false;
            newState.authFailureOrSuccessOption = error;
          },
          () => {
            newState.isAuthenticated = false;
          }
        )
      );
      console.log(newState);
      return newState;
    case "ClearFailureMessage":
      newState.authFailureOrSuccessOption = undefined;
      return newState;
    default:
      throw new Error("Action not found");
  }
};

function executeCode() {}
