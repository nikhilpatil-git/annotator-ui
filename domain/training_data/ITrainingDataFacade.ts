import { Either } from "fp-ts/lib/Either";
import { Unit } from "../core/unit";
import { TrainingDataFailure } from "./TrainingDataFailure";
import { TrainingData } from "./TrainingData";
import { TrainingDataPromise } from "../core/types";

export abstract class ITrainingDataFacade {
  abstract getULabelledData(): TrainingDataPromise;
}
