import { ITrainingDataFacade } from "../../domain/training_data/ITrainingDataFacade";
import { TrainingDataPromise } from "../../domain/core/types";
import { FirebaseDocHandler } from "../core/FirebaseDocHandler";
import { firestore } from "firebase";
import { DocumentDataToTrainingData } from "./TrainingDataMapper";
import { right, left } from "fp-ts/lib/Either";
import { ULabelledDataNotFound } from "../../domain/training_data/TrainingDataFailure";

export class FirebaseTrainingDataFacade implements ITrainingDataFacade {
  private firebaseDocHandler: FirebaseDocHandler;
  constructor() {
    this.firebaseDocHandler = new FirebaseDocHandler();
  }

  async getULabelledData(): TrainingDataPromise {
    try {
      return await this.firebaseDocHandler
        .getCollectionWithQueryLimit(
          "data/twitter/tweets",
          JSON.stringify({
            key: "state",
            operater: "==",
            value: "not-updated",
          }),
          10
        )
        .then((result: firestore.DocumentData[]) =>
          right(result.map((doc) => DocumentDataToTrainingData(doc)))
        );
    } catch (error) {
      return left(ULabelledDataNotFound.instance(error));
    }
  }
}
