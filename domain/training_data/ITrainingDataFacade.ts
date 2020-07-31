import { Either } from "fp-ts/lib/Either";
import { TrainingData } from "./TrainingData";
import { TrainingDataPromise, TrainingDataFailureOrUnit } from "../core/types";

export abstract class ITrainingDataFacade {
  abstract getULabelledData(): TrainingDataPromise;
  abstract getULabelledDataFromCache(): TrainingDataPromise;
  abstract saveTrainingData(
    trainingData: TrainingData[]
  ): Promise<TrainingDataFailureOrUnit>;
}
