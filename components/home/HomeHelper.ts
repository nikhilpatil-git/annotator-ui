import {
  PipelineState,
  PipelineAction,
} from "../../application/pipeline/PipelineStateAction";
import { AssertionError } from "assert";
import { assert } from "console";
// import { AssertionError } from "assert";
import { AssertIsDefined, AssertArrayIsNotEmpty } from "../core/Assertions";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { TrainingDataError } from "../../domain/training_data/TrainingDataFailure";
import { FirebaseTrainingDataFacade } from "../../infrastructure/training_data/FirebaseTrainingDataFacade";
import { TrainingDataOrFailure } from "../../domain/core/types";

export const GetSelectedPipeline = (state: PipelineState) => {
  let selectedPipeline = AssertIsDefined(state?.selectedPipeline, "Pipeline");
  return selectedPipeline;
};

export const GetSelectedPipelineValue = (state: PipelineState) => {
  let selectedPipelineValue = AssertIsDefined(
    state?.selectedPipelineValue,
    "Pipeline Value"
  );
  return selectedPipelineValue;
};

export const GetCurrentTrainingData = (state: PipelineState) => {
  let currentTrainingData = null;
  let trainingData = AssertIsDefined(state?.trainingData, "Training Data");
  let trainingDataPointer = AssertIsDefined(
    state?.trainingDataPointer,
    "Training Data Pointer"
  );

  if (trainingData !== undefined && trainingDataPointer !== undefined) {
    currentTrainingData = trainingData[trainingDataPointer];
  }

  return currentTrainingData;
};

export const GetCurrentSentenceText = (state: PipelineState) => {
  let trainingData = AssertIsDefined(
    GetCurrentTrainingData(state),
    "Training Data"
  );
  let text = AssertIsDefined(trainingData?.text, "Current Sentence Text");
  return text;
};

export const GetFirstNerPosPipelineValue = (
  state: PipelineState
): string | null => {
  let pipelines = AssertIsDefined(state?.pipelines, "Pipelines");
  let value = null;
  pipelines?.map((item: Pipeline) => {
    if (item.name == "NER" || item.name == "POS") {
      value = Array.from(item.values).map(([key]) => key)[0];
    }
  });
  return value;
};

export const DoesPipelineValueMatchPipeline = (
  state: PipelineState
): boolean => {
  let result = false;
  if (state?.selectedPipeline && state?.selectedPipelineValue) {
    let pipelines = state?.pipelines;
    pipelines?.map((item: Pipeline) => {
      if (item.name == state?.selectedPipeline) {
        Array.from(item.values)
          .map(([key]) => key)
          .map((key) => {
            if (key == state?.selectedPipelineValue) {
              result = true;
            }
          });
      }
    });
  }
  return result;
};

export const GetNextTrainingDataPointer = (state: PipelineState): number => {
  let currentPointer: number = state?.trainingDataPointer
    ? state?.trainingDataPointer
    : 0;
  return currentPointer + 1;
};

const SaveTrainingData = async (state: PipelineState) => {
  const firebaseTrainingDataFacade = new FirebaseTrainingDataFacade();
  if (state?.trainingData) {
    await firebaseTrainingDataFacade.saveTrainingData(state?.trainingData);
  }
};

export const CheckTrainingDataValidity = (
  state: PipelineState
): string | undefined => {
  if (!state?.categoryPipelineValue) {
    return "Please update the LANG";
  } else if (!state?.sentimentPipelineValue) {
    return "Please update the SENT";
  }
};

export const SaveMoveToNextTrainingData = async (
  state: PipelineState,
  dispatch: React.Dispatch<PipelineAction>
) => {
  let nextPointer = GetNextTrainingDataPointer(state);
  if (nextPointer) {
    if (!IsTrainingDataPointerLast(nextPointer, state)) {
      dispatch({
        type: "TrainingDataPointer",
        result: nextPointer,
      });
    } else {
      await SaveTrainingData(state);
      if (typeof Storage !== "undefined") {
        localStorage.removeItem("data");
        localStorage.removeItem("dataPointer");
      }
      await FetchDataFromServer(dispatch);
    }
  }
};

export const IsTrainingDataPointerLast = (
  currentPointer: number,
  state: PipelineState
): boolean => {
  let trainingDataLength: number = state?.trainingData?.length
    ? state?.trainingData?.length
    : 0;
  if (currentPointer < trainingDataLength) {
    return false;
  }
  return true;
};

export const FetchDataFromServer = async (
  dispatch: React.Dispatch<PipelineAction>
) => {
  const firebaseTrainingDataFacade = new FirebaseTrainingDataFacade();
  await firebaseTrainingDataFacade
    .getULabelledDataFromCache()
    .then((trainingData: TrainingDataOrFailure) => {
      dispatch({
        type: "UpdateTrainingDataFromCache",
        result: trainingData,
      });
    })
    .catch((error: TrainingDataOrFailure) =>
      dispatch({ type: "UpdateTrainingDataFromCache", result: error })
    );
};
