import { SimpleGrid, Box, Skeleton } from "@chakra-ui/core";
import { CustomButton } from "../../util/CustomButton";
import {
  PipelineState,
  PipelineAction,
} from "../../application/pipeline/PipelineStateAction";
import { useContext, useEffect, useState } from "react";
import { PipelineStateContext, PipelineReducerContext } from "../../pages";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import {
  StoreSelectedPipelineValue,
  GetDefaultPipelineValue,
} from "./PipelineValuesHelper";
import {
  GetFirstNerPosPipelineValue,
  DoesPipelineValueMatchPipeline,
} from "./HomeHelper";

export const PipelineValues = () => {
  const state: PipelineState = useContext(PipelineStateContext);
  const dispatch: React.Dispatch<PipelineAction> = useContext(
    PipelineReducerContext
  );

  const [defaultValue, setDefaultValue] = useState<string>();

  useEffect(() => {
    let result = DoesPipelineValueMatchPipeline(state);
    if (result) {
      setDefaultValue(() => state?.selectedPipelineValue);
    } else {
      let value = GetDefaultPipelineValue(state);
      if (value) {
        setDefaultValue(() => value);
      }
    }
  }, []);

  useEffect(() => {
    if (defaultValue) {
      console.log(defaultValue);
    }
  }, [defaultValue]);

  const pipelineValuesList = state.pipelines?.map((item: Pipeline) => {
    if (item.name === state.selectedPipeline) {
      const mapValues = item.values;
      return Array.from(mapValues)
        .map(([key]) => key)
        .map((item: string, index: number) => {
          let titleValue = mapValues.get(item);
          return (
            <CustomButton
              key={index}
              colorLight="secondry.purpleLight"
              color="secondry.purple"
              isSolid={defaultValue == item ? false : true}
              title={titleValue}
              onClickCallback={() =>
                StoreSelectedPipelineValue(item, state, dispatch)
              }
            >
              {item}
            </CustomButton>
          );
        });
    }
  });

  return (
    <Box>
      {/* <Skeleton isLoaded={state.pipelines !== undefined}> */}
      <SimpleGrid
        gridColumnGap={2}
        gridRowGap={1}
        gridTemplateColumns={"repeat(auto-fit, 100px)"}
        gridTemplateRows={"40px"}
        bg="secondry.purple"
        p={3}
      >
        {pipelineValuesList}
      </SimpleGrid>
      {/* </Skeleton> */}
    </Box>
  );
};
