import {
  SimpleGrid,
  Text,
  Flex,
  Tag,
  TagIcon,
  TagLabel,
  TagCloseButton,
  theme,
} from "@chakra-ui/core";
import { useEffect, useState, useContext } from "react";
import {
  PipelineState,
  PipelineAction,
} from "../../application/pipeline/PipelineStateAction";
import { PipelineStateContext, PipelineReducerContext } from "../../pages";
import {
  TrainingData,
  Sentences,
  Tokens,
} from "../../domain/training_data/TrainingData";
import { TrainingDataFailure } from "../../domain/training_data/TrainingDataFailure";

interface IWordsListProps {
  words: string[];
}

export const Sentence = () => {
  const state: PipelineState = useContext(PipelineStateContext);
  const dispatch: React.Dispatch<PipelineAction> = useContext(
    PipelineReducerContext
  );
  const [tokenList, setTokenList] = useState<Tokens[]>([]);

  const [selectedIndex, setSelectedIndex] = useState([-1]);

  const handleFocus = (index: number) => {
    if (!selectedIndex.includes(index)) {
      if (state.selectedPipelineValue) {
        let tokens: Tokens[] = tokenList;
        tokens[index].ner = state.selectedPipelineValue;
        setTokenList(tokens);
      }
      setSelectedIndex([...selectedIndex, index]);
    }
  };

  useEffect(() => {
    var s = window.getSelection();
    if (s) {
      s.removeAllRanges();
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (state.trainingData && state.trainingDataPointer != undefined) {
      let tokensList: Tokens[] = [];
      state.trainingData[state.trainingDataPointer].text.sentences.map(
        (sentences: Sentences) => {
          sentences.tokens.forEach((token: Tokens) => tokensList.push(token));
        }
      );
      setTokenList(() => tokensList);
    }
  }, [state.trainingData]);

  const changeNerState = (index: number) => {
    let tokens: Tokens[] = tokenList;
    tokens[index].ner = "";
    setTokenList(tokens);
    setSelectedIndex([...selectedIndex, index]);
    console.log(tokenList);
  };

  const wordsList = tokenList.map((item: Tokens, index: number) => {
    return (
      <Flex
        bg={item.ner.length > 1 ? "rgba(255,225,132,1.0)" : "white"}
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
        {item.ner.length > 1 && (
          <Tag
            fontWeight={"bold"}
            size={"md"}
            key={"sm"}
            color="secondry.purple"
            bg={"rgba(255,225,132,1.0)"}
          >
            <TagLabel>{item.ner}</TagLabel>
            <TagCloseButton
              _focus={{
                outline: 0,
              }}
              outline={0}
              onClick={() => {
                console.log("close text");
                changeNerState(index);
              }}
            />
          </Tag>
        )}
      </Flex>
    );
  });

  return (
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
  );
};
