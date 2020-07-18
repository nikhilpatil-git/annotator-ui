import { Either } from "fp-ts/lib/Either";
import { AuthFailure } from "../auth/authFailure";
import { Unit } from "./unit";
import { Option } from "fp-ts/lib/Option";
import { User } from "../auth/user";
import { Pipeline } from "../pipeline/Pipeline";
import { TrainingDataFailure } from "../training_data/TrainingDataFailure";
import { TrainingData } from "../training_data/TrainingData";

export type OptionFailureOrUnit = Option<Either<AuthFailure<Error>, Unit>>;
export type FailureOrUnit = Either<AuthFailure<Error>, Unit>;
export type FailureOrUser = Either<AuthFailure<Error>, User>;
export type FailureOrPipeline = Either<AuthFailure<Error>, Pipeline>;

export type TrainingDataPromise = Promise<
  Either<TrainingDataFailure<Error>, TrainingData[]>
>;
