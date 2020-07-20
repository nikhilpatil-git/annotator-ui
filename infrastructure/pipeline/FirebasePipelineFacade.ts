import { IPipelineFacade } from "../../domain/pipeline/IPipelineFacade";
import { Either, right, left } from "fp-ts/lib/Either";
import {
  PipelineFailure,
  PipelinesNotFound,
} from "../../domain/pipeline/PipelineFailure";
import { Pipeline } from "../../domain/pipeline/Pipeline";
import { FirebaseDocHandler } from "../core/FirebaseDocHandler";
import { firestore } from "firebase";
import { DocumentDataToPipeline } from "./PipelineMapper";

export class FirebasePipelineFacade implements IPipelineFacade {
  private firebaseDocHandler: FirebaseDocHandler;

  constructor() {
    this.firebaseDocHandler = new FirebaseDocHandler();
  }

  async getPipelines(): Promise<Either<PipelineFailure<Error>, Pipeline[]>> {
    try {
      return await this.firebaseDocHandler
        .getCollection("pipeline")
        .then((result: firestore.DocumentData[]) =>
          right(result.map((doc) => DocumentDataToPipeline(doc)))
        );
    } catch (error) {
      return left(PipelinesNotFound.instance(error));
    }
  }
}
