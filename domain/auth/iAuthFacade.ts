import { Either } from "fp-ts/lib/Either";
import { AuthFailure } from "./authFailure";
import { Unit } from "../core/unit";
import { User } from "./user";

export abstract class IAuthFacade {
  abstract getSignInUser(): Promise<Either<AuthFailure<Error>, User>>;
  abstract signInWithGoogle(): Promise<Either<AuthFailure<Error>, Unit>>;
  abstract signInWithFacebook(): Promise<Either<AuthFailure<Error>, Unit>>;
  abstract signInWithGithub(): Promise<Either<AuthFailure<Error>, Unit>>;
  abstract signOut(): Promise<Either<AuthFailure<Error>, Unit>>;
}
