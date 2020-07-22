import {
  FailureOrPipeline,
  TrainingDataOrFailure,
} from "../../domain/core/types";
import { PipelineFailure } from "../../domain/pipeline/PipelineFailure";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { TrainingData } from "../../domain/training_data/TrainingData";
import { TrainingDataFailure } from "../../domain/training_data/TrainingDataFailure";

export type PipelineState = {
  pipelines?: Pipeline[];
  trainingData?: TrainingData[];
  trainingDataPointer?: number;
  selectedPipeline?: string;
  pipelineFailureOrSuccessOption?: PipelineFailure<Error>;
  trainingDataFaiureOrSuccessOption?: TrainingDataFailure<Error>;
};

export const InitialPipelineState: PipelineState = {};

export type PipelineAction =
  | {
      type: "GetPipeline";
      result: FailureOrPipeline;
    }
  | {
      type: "SelectPipeline";
      result: string;
    }
  | {
      type: "UpdateTrainingDataFromCache";
      result: TrainingDataOrFailure;
    }
  | {
      type: "TrainingDataPointer";
      result: number;
    };
