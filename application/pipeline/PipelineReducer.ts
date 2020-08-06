import { PipelineAction, PipelineState } from "./PipelineStateAction";
import { fold } from "fp-ts/lib/Either";
import { Reducer } from "react";
import { PipelineFailure } from "../../domain/pipeline/PipelineFailure";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { pipe } from "fp-ts/lib/function";
import {
  TrainingDataFailure,
  TrainingDataError,
} from "../../domain/training_data/TrainingDataFailure";
import { TrainingData } from "../../domain/training_data/TrainingData";
import { Unit } from "../../domain/core/unit";

export const PipelineReducer: Reducer<PipelineState, PipelineAction> = (
  pipelineState: PipelineState,
  pipelineAction: PipelineAction
) => {
  let newState: PipelineState = { ...pipelineState };
  switch (pipelineAction.type) {
    case "GetPipeline":
      if (pipelineAction.result) {
        pipe(
          pipelineAction.result,
          fold(
            (error: PipelineFailure<Error>) => {
              newState.pipelineFailureOrSuccessOption = error;
            },
            (pipelines: Pipeline[]) => {
              newState.pipelines = pipelines;
              newState.selectedPipeline = "LANG";
              newState.pipelineFailureOrSuccessOption = undefined;
            }
          )
        );
      }
      return newState;
    case "UpdateTrainingDataFromCache":
      if (pipelineAction.result) {
        pipe(
          pipelineAction.result,
          fold(
            (error: TrainingDataFailure<Error>) => {
              newState.trainingDataFailureOrSuccessOption = error;
            },
            (trainingData: TrainingData[]) => {
              newState.trainingData = trainingData;
              const pointer = localStorage.getItem("dataPointer");
              if (pointer) {
                newState.trainingDataPointer = parseInt(pointer);
              }
              newState.trainingDataFailureOrSuccessOption = undefined;
            }
          )
        );
      }
      return newState;
    case "UpdateTrainingData":
      if (pipelineAction.result) {
        newState.trainingData = pipelineAction.result;
        localStorage.setItem("data", JSON.stringify(pipelineAction.result));
      }
      return newState;
    case "SavingTrainingDataFailed":
      pipe(
        pipelineAction.result,
        fold(
          (error: TrainingDataFailure<TrainingDataError>) => {
            newState.savingTrainingDataFailureOrSuccessOption = error;
          },
          (_unit: Unit) => {}
        )
      );
      return newState;
    case "TrainingDataPointer":
      newState.trainingDataPointer = pipelineAction.result;
      return newState;
    case "SelectPipeline":
      return {
        ...pipelineState,
        selectedPipeline: pipelineAction.result,
        selectedPipelineValue: "",
      };
    case "SelectPipelineValue":
      return {
        ...pipelineState,
        selectedPipelineValue: pipelineAction.result,
      };
    default:
      throw new Error("Pipeline Action not found");
  }
};
