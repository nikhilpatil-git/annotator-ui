import {
  PipelineState,
  PipelineAction,
} from "../../application/pipeline/PipelineStateAction";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { assert } from "console";
import {
  GetSelectedPipeline,
  GetCurrentTrainingData,
  GetFirstNerPosPipelineValue,
} from "./HomeHelper";
import { TrainingDataError } from "../../domain/training_data/TrainingDataFailure";
import { TrainingData } from "../../domain/training_data/TrainingData";
import { AssertIsDefined } from "../core/Assertions";

export const StoreSelectedPipelineValue = (
  selectedValue: string,
  state: PipelineState,
  dispatch: React.Dispatch<PipelineAction>
) => {
  let trainingData = GetCurrentTrainingData(state);
  switch (GetSelectedPipeline(state)) {
    case "LANG":
      if (trainingData !== null) {
        trainingData.category = selectedValue;
      }
      dispatch({
        type: "CategoryPipelineValue",
        result: selectedValue,
      });
      break;
    case "SENT":
      if (trainingData !== null) {
        trainingData.sentiment = selectedValue;
      }
      dispatch({
        type: "SentimentPipelineValue",
        result: selectedValue,
      });
      break;
    case "NER":
    case "POS":
      dispatch({
        type: "SelectPipelineValue",
        result: selectedValue,
      });
      break;
    default:
      break;
  }
};

export const GetDefaultPipelineValue = (
  state: PipelineState
): string | undefined => {
  let value;
  switch (state?.selectedPipeline) {
    case "LANG":
      return state?.categoryPipelineValue;
    case "SENT":
      return state?.sentimentPipelineValue;
    case "NER":
      state?.pipelines?.map((item: Pipeline) => {
        if (item.name == "NER") {
          value = Array.from(item.values).map(([key]) => key)[0];
        }
      });
      return value;
    case "POS":
      state?.pipelines?.map((item: Pipeline) => {
        if (item.name == "POS") {
          value = Array.from(item.values).map(([key]) => key)[0];
        }
      });
      return value;
    default:
      break;
  }
};
