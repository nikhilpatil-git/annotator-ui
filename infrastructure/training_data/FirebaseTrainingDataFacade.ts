import { ITrainingDataFacade } from "../../domain/training_data/ITrainingDataFacade";
import {
  TrainingDataPromise,
  TrainingDataOrFailure,
} from "../../domain/core/types";
import { FirebaseDocHandler } from "../core/FirebaseDocHandler";
import { firestore } from "firebase";
import { DocumentDataToTrainingData } from "./TrainingDataMapper";
import { right, left, Either } from "fp-ts/lib/Either";
import {
  ULabelledDataNotFound,
  TrainingDataFailure,
  ULabelledDataFromCatcheNotFound,
} from "../../domain/training_data/TrainingDataFailure";
import { TrainingData } from "../../domain/training_data/TrainingData";
import { rejects } from "assert";

export class FirebaseTrainingDataFacade implements ITrainingDataFacade {
  private firebaseDocHandler: FirebaseDocHandler;
  constructor() {
    this.firebaseDocHandler = new FirebaseDocHandler();
  }
  getULabelledDataFromCache(): TrainingDataPromise {
    return new Promise<TrainingDataOrFailure>((resolve, reject) => {
      if (typeof Storage !== "undefined") {
        const cacheData = localStorage.getItem("data");
        if (cacheData !== null) {
          const trainingDataPipeline: TrainingData[] = [];
          Object.assign(trainingDataPipeline, JSON.parse(cacheData));
          resolve(right(trainingDataPipeline));
        }
        reject(left(ULabelledDataFromCatcheNotFound.instance()));
      }
    });
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
        .then((result: firestore.DocumentData[]) => {
          if (typeof Storage !== "undefined") {
            const trainingData = result.map((doc) =>
              DocumentDataToTrainingData(doc)
            );
            localStorage.setItem("data", JSON.stringify(trainingData));
            localStorage.setItem("dataPointer", "0");
            const cacheData = localStorage.getItem("data");
            if (cacheData !== null) {
              const trainingDataPipeline: TrainingData[] = [];
              Object.assign(trainingDataPipeline, JSON.parse(cacheData));
              console.log(trainingDataPipeline);
            }
          }
          return result;
        })
        .then((result: firestore.DocumentData[]) =>
          right(result.map((doc) => DocumentDataToTrainingData(doc)))
        );
    } catch (error) {
      return left(ULabelledDataNotFound.instance(error));
    }
  }
}
