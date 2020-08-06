import {
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  theme,
  Skeleton,
  Box,
} from "@chakra-ui/core";
import { useEffect, useState, useContext } from "react";
import {
  PipelineState,
  PipelineAction,
} from "../../application/pipeline/PipelineStateAction";
import { PipelineStateContext, PipelineReducerContext } from "../../pages";
import { Tokens } from "../../domain/training_data/TrainingData";
import { TrainingDataFailure } from "../../domain/training_data/TrainingDataFailure";
import {
  GetTokenListFromPipelineState,
  UpdateTokenLinguisticFeature,
  RemoveTokenLinguisticFeature,
  GetTokenFeatureFromPipeline,
} from "./SentenceHelper";

interface IWordsListProps {
  words: string[];
}

export const Sentence = () => {
  const state: PipelineState = useContext(PipelineStateContext);
  const dispatch: React.Dispatch<PipelineAction> = useContext(
    PipelineReducerContext
  );

  const updateTrainingData = () => {
    if (state.trainingData) {
      dispatch({ type: "UpdateTrainingData", result: state.trainingData });
    }
  };

  const handleFocus = (index: number) => {
    UpdateTokenLinguisticFeature(index, state);
    updateTrainingData();
    let selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  };

  const wordsList = GetTokenListFromPipelineState(state).map(
    (item: Tokens, index: number) => {
      return (
        <Flex
          bg={
            GetTokenFeatureFromPipeline(item, state).length > 1
              ? "rgba(255,225,132,1.0)"
              : "white"
          }
          p={1}
          key={index}
          fontSize="lg"
          align="center"
          justify="center"
          direction={"row"}
          wrap={"wrap"}
          onMouseUp={() => handleFocus(index)}
        >
          {item.orth}
          {GetTokenFeatureFromPipeline(item, state).length > 1 && (
            <Tag
              fontWeight={"bold"}
              size={"md"}
              key={"sm"}
              color="secondry.purple"
              bg={"rgba(255,225,132,1.0)"}
            >
              <TagLabel>{GetTokenFeatureFromPipeline(item, state)}</TagLabel>
              <TagCloseButton
                _focus={{
                  outline: 0,
                }}
                outline={0}
                onClick={() => {
                  console.log("close text");
                  RemoveTokenLinguisticFeature(index, state);
                  updateTrainingData();
                }}
              />
            </Tag>
          )}
        </Flex>
      );
    }
  );

  return (
    <Box>
      {/* <Skeleton isLoaded={state.trainingData !== undefined}></Skeleton> */}
      <Flex
        align="center"
        direction={"row"}
        wrap={"wrap"}
        bg="white"
        color="black"
        p={4}
      >
        {wordsList}
      </Flex>
    </Box>
  );
};
