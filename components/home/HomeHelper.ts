import { PipelineState } from "../../application/pipeline/PipelineStateAction";
import { AssertionError } from "assert";
import { assert } from "console";
// import { AssertionError } from "assert";
import { AssertIsDefined, AssertArrayIsNotEmpty } from "../core/Assertions";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { TrainingDataError } from "../../domain/training_data/TrainingDataFailure";

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
