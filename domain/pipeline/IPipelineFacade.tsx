import { Either } from "fp-ts/lib/Either";
import { Unit } from "../core/unit";
import { PipelineFailure } from "./PipelineFailure";
import { Pipeline } from "./Pipeline";

export abstract class IPipelineFacade {
  abstract getPipelines(): Promise<Either<PipelineFailure<Error>, Pipeline[]>>;
}
