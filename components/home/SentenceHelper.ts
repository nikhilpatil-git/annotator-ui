import {
  TrainingData,
  Tokens,
  Sentences,
} from "../../domain/training_data/TrainingData";
import { Sentence } from "./Sentence";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { PipelineState } from "../../application/pipeline/PipelineStateAction";

export const GetTokenListFromPipelineState = (
  state: PipelineState
): Tokens[] => {
  let tokensList: Tokens[] = [];
  if (state.trainingData && state.trainingDataPointer != undefined) {
    state.trainingData[state.trainingDataPointer].text.sentences
      .map((sentence: Sentences) => sentence.tokens)
      .map((tokens: Tokens[]) => tokens)
      .forEach((innerTokens: Tokens[]) =>
        innerTokens.forEach((token: Tokens) => tokensList.push(token))
      );
  }
  return tokensList;
};

export const UpdateLangaugeCategory = (state: PipelineState) => {
  if (
    state.trainingData &&
    state.trainingDataPointer != undefined &&
    state.selectedPipelineValue
  ) {
    state.trainingData[state.trainingDataPointer].category =
      state.selectedPipelineValue;
    state.selectedPipelineValue = undefined;
  }
};

export const UpdateSentiment = (state: PipelineState) => {
  if (
    state.trainingData &&
    state.trainingDataPointer != undefined &&
    state.selectedPipelineValue
  ) {
    state.trainingData[state.trainingDataPointer].sentiment =
      state.selectedPipelineValue;
    state.selectedPipelineValue = undefined;
  }
};

export const UpdateTokenLinguisticFeature = (
  tokenId: number,
  state: PipelineState
) => {
  if (state.trainingData && state.trainingDataPointer != undefined) {
    state.trainingData[state.trainingDataPointer].category = "";
    state.trainingData[state.trainingDataPointer].text.sentences
      .map((sentence: Sentences) => sentence.tokens)
      .map((tokens: Tokens[]) => tokens)
      .forEach((innerTokens: Tokens[]) =>
        innerTokens.forEach((token: Tokens) => {
          if (token.id === tokenId && state.selectedPipelineValue) {
            if (state.selectedPipeline === "NER") {
              token.ner = state.selectedPipelineValue;
            } else if (state.selectedPipeline === "POS") {
              token.tag = state.selectedPipelineValue;
            }
          }
        })
      );
  }
};

export const RemoveTokenLinguisticFeature = (
  tokenId: number,
  state: PipelineState
) => {
  if (state.trainingData && state.trainingDataPointer != undefined) {
    state.trainingData[state.trainingDataPointer].text.sentences
      .map((sentence: Sentences) => sentence.tokens)
      .map((tokens: Tokens[]) => tokens)
      .forEach((innerTokens: Tokens[]) =>
        innerTokens.forEach((token: Tokens) => {
          if (token.id === tokenId && state.selectedPipelineValue) {
            if (state.selectedPipeline === "NER") {
              token.ner = "";
            } else if (state.selectedPipeline === "POS") {
              token.tag = "";
            }
          }
        })
      );
  }
};

export const GetTokenFeatureFromPipeline = (
  token: Tokens,
  state: PipelineState
): string => {
  let tokenValue = "";
  if (state.selectedPipeline === "NER") {
    tokenValue = token.ner;
  } else if (state.selectedPipeline === "POS") {
    tokenValue = token.tag;
  }
  return tokenValue;
};
