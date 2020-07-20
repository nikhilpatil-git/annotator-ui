import { PipelineAction, PipelineState } from "./PipelineStateAction";
import { fold } from "fp-ts/lib/Either";
import { Reducer } from "react";
import { PipelineFailure } from "../../domain/pipeline/PipelineFailure";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { pipe } from "fp-ts/lib/function";

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
            }
          )
        );
      }
      return newState;
    default:
      throw new Error("Pipeline Action not found");
  }
};
