import { FailureOrPipeline } from "../../domain/core/types";
import { PipelineFailure } from "../../domain/pipeline/PipelineFailure";
import { Pipeline } from "../../domain/pipeline/Pipeline";

export type PipelineState = {
  pipelines?: Pipeline[];
  pipelineFailureOrSuccessOption?: PipelineFailure<Error>;
};

export const InitialPipelineState: PipelineState = {};

export type PipelineAction = {
  type: "GetPipeline";
  result: FailureOrPipeline;
};
