import { IAuthFacade } from "../../domain/auth/iAuthFacade";
import {
  AuthFailure,
  ServerError,
  NoUserError,
} from "../../domain/auth/authFailure";
import { Either, right, left } from "fp-ts/lib/Either";
import { FirebaseClient } from "../core/FirebaseClient";
import AuthTypes from "../../util/Constants";
import { Unit, unit } from "../../domain/core/unit";
import { User } from "../../domain/auth/user";
import { FirebaseUserToDomain } from "./firebaseMapper";

export class FirebaseAuthFacade implements IAuthFacade {
  private firebaseClient: FirebaseClient;

  constructor(firebaseClient: FirebaseClient) {
    this.firebaseClient = firebaseClient;
  }
  async signInWithFacebook(): Promise<Either<AuthFailure<Error>, Unit>> {
    try {
      return await this.firebaseClient
        .getAuthHandler(AuthTypes.FACEBOOK)
        .then(() => right(unit));
    } catch (error) {
      return left(ServerError.instance(error));
    }
  }

  async signInWithGoogle(): Promise<Either<AuthFailure<Error>, Unit>> {
    try {
      return await this.firebaseClient
        .getAuthHandler(AuthTypes.GOOGLE)
        .then(() => right(unit));
    } catch (error) {
      return left(ServerError.instance(error));
    }
  }
  async signInWithGithub(): Promise<Either<AuthFailure<Error>, Unit>> {
    try {
      return await this.firebaseClient
        .getAuthHandler(AuthTypes.GITHUB)
        .then(() => right(unit));
    } catch (error) {
      return left(ServerError.instance(error));
    }
  }
  async getSignInUser(): Promise<Either<AuthFailure<Error>, User>> {
    try {
      return await this.firebaseClient
        .getCurrentUser()
        .then((firebaseUser) => right(FirebaseUserToDomain(firebaseUser)));
    } catch (error) {
      return left(NoUserError.instance(error));
    }
  }
  async signOut(): Promise<Either<AuthFailure<Error>, Unit>> {
    try {
      return await this.firebaseClient.signOutUser().then(() => right(unit));
    } catch (error) {
      return left(ServerError.instance(error));
    }
  }
}
