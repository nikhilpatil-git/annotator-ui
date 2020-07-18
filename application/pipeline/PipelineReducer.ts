import { PipelineAction, PipelineState } from "./PipelineStateAction";
import { fold } from "fp-ts/lib/Either";
import { Reducer } from "react";
import { pipe } from "fp-ts/lib/function";
import { PipelineFailure } from "../../domain/pipeline/PipelineFailure";
import { Pipeline } from "../../domain/pipeline/Pipeline";

export const PipelineReducer: Reducer<PipelineState, PipelineAction> = (
  pipelineState: PipelineState,
  pipelineAction: PipelineAction
) => {
  let newState: PipelineState = { ...pipelineState };
  switch (pipelineAction.type) {
    case "GetPipeline":
      pipe(
        pipelineAction.result,
        fold(
          (error: PipelineFailure<Error>) => {
            newState.pipelineFailureOrSuccessOption = error;
          },
          (pipeline: Pipeline) => {
            newState.pipeline = pipeline;
          }
        )
      );
      return newState;
    default:
      throw new Error("Pipeline Action not found");
  }
};
