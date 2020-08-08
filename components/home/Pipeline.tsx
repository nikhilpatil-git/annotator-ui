import { Button, Icon, SimpleGrid, Skeleton, Box } from "@chakra-ui/core";
import {
  PipelineState,
  PipelineAction,
} from "../../application/pipeline/PipelineStateAction";
import { useContext, useEffect, useState } from "react";
import { PipelineStateContext, PipelineReducerContext } from "../../pages";
import { FirebasePipelineFacade } from "../../infrastructure/pipeline/FirebasePipelineFacade";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { stat } from "fs/promises";
import { CustomButton } from "../../util/CustomButton";
import { SelectDefaultPipelineValue } from "./PipelineValuesHelper";

interface IPipelineItemProps {
  pipeline: Pipeline;
  showIcon: boolean;
}
const PipelineItem: React.FC<IPipelineItemProps> = ({ ...props }) => {
  const state: PipelineState = useContext(PipelineStateContext);
  const dispatch: React.Dispatch<PipelineAction> = useContext(
    PipelineReducerContext
  );

  return (
    <SimpleGrid
      gridTemplateColumns="100px 48px"
      alignItems="center"
      justifyItems="center"
    >
      <CustomButton
        colorLight="secondry.grayLight"
        color="secondry.gray"
        isSolid={state.selectedPipeline == props.pipeline.name ? false : true}
        onClickCallback={() => {
          dispatch({ type: "SelectPipeline", result: props.pipeline.name });
        }}
      >
        {props.pipeline.name}
      </CustomButton>

      <Icon hidden={!props.showIcon} name="chevron-right" size="48px" />
    </SimpleGrid>
  );
};

export const Pipelines = () => {
  const state: PipelineState = useContext(PipelineStateContext);
  const dispatch: React.Dispatch<PipelineAction> = useContext(
    PipelineReducerContext
  );

  useEffect(() => {
    if (state.pipelines == undefined) {
      (async () => {
        const firebasePipelineFacade = new FirebasePipelineFacade();
        const failureOrSuccess = await firebasePipelineFacade.getPipelines();
        dispatch({ type: "GetPipeline", result: failureOrSuccess });
      })();
    }
  }, []);

  const pipelinesList = state.pipelines?.map(
    (item: Pipeline, index: number) => {
      let pipelineSize = 0;
      if (state.pipelines) {
        pipelineSize = state.pipelines.length - 1;
      }
      return (
        <PipelineItem
          key={index}
          pipeline={item}
          showIcon={index == pipelineSize ? false : true}
        />
      );
    }
  );

  return (
    <Box>
      <Skeleton isLoaded={state.pipelines !== undefined}>
        <SimpleGrid
          gridTemplateColumns={"repeat(auto-fit, 140px)"}
          gridTemplateRows={"50px"}
          bg="#343c4b"
          boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
          borderRadius={4}
          mb={2}
          p={1}
          justifyContent="center"
          alignItems="center"
        >
          {pipelinesList}
        </SimpleGrid>
      </Skeleton>
    </Box>
  );
};
