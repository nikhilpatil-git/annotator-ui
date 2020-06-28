import { User } from "../../domain/auth/user";

export const FirebaseUserToDomain = (firebaseUser: firebase.User): User => {
  return new User(
    firebaseUser.uid,
    firebaseUser.displayName,
    firebaseUser.email
  );
};
