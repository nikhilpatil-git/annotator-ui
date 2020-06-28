import { Option, Some, none } from "fp-ts/lib/Option";
import { Either } from "fp-ts/lib/Either";
import { AuthFailure } from "../../domain/auth/authFailure";
import { User } from "../../domain/auth/user";
import { FailureOrUnit, FailureOrUser } from "../../domain/core/types";

export type AuthState = {
  isAuthenticated?: boolean;
  currentUser?: User;
  authFailureOrSuccessOption?: AuthFailure<Error>;
};

export const InitialAuthState: AuthState = {};

export type AuthAction =
  | {
      type: "SignInWithGoogle";
      result: FailureOrUnit;
    }
  | { type: "SignInWithGithub" }
  | { type: "SignInWithFacebook" }
  | {
      type: "FetchSignedInUser";
      user: FailureOrUser;
    }
  | { type: "ClearFailureMessage" }
  | { type: "SignOutUser"; result: FailureOrUnit };
