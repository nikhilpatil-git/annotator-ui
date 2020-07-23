import { SimpleGrid, Tooltip } from "@chakra-ui/core";
import { CustomButton } from "../../util/CustomButton";
import {
  PipelineState,
  PipelineAction,
} from "../../application/pipeline/PipelineStateAction";
import { useContext } from "react";
import { PipelineStateContext, PipelineReducerContext } from "../../pages";
import { stat } from "fs/promises";
import { Pipeline } from "../../domain/pipeline/Pipeline";

export const PipelineValues = () => {
  const state: PipelineState = useContext(PipelineStateContext);
  const dispatch: React.Dispatch<PipelineAction> = useContext(
    PipelineReducerContext
  );

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
              isSolid={state.selectedPipelineValue == item ? false : true}
              title={titleValue}
              onClickCallback={() =>
                dispatch({ type: "SelectPipelineValue", result: item })
              }
            >
              {item}
            </CustomButton>
          );
        });
    }
  });

  return (
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
  );
};
