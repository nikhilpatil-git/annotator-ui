import { Either } from "fp-ts/lib/Either";
import { AuthFailure } from "../auth/authFailure";
import { Unit } from "./unit";
import { Option } from "fp-ts/lib/Option";
import { User } from "../auth/user";

export type OptionFailureOrUnit = Option<Either<AuthFailure<Error>, Unit>>;
export type FailureOrUnit = Either<AuthFailure<Error>, Unit>;
export type FailureOrUser = Either<AuthFailure<Error>, User>;
