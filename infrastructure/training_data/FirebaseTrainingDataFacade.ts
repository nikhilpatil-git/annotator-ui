import { ITrainingDataFacade } from "../../domain/training_data/ITrainingDataFacade";
import {
  TrainingDataPromise,
  TrainingDataOrFailure,
  TrainingDataFailureOrUnit,
} from "../../domain/core/types";
import { FirebaseDocHandler } from "../core/FirebaseDocHandler";
import { firestore } from "firebase";
import { DocumentDataToTrainingData } from "./TrainingDataMapper";
import { right, left, Either } from "fp-ts/lib/Either";
import {
  ULabelledDataNotFound,
  TrainingDataFailure,
  ULabelledDataFromCatcheNotFound,
  TrainingDataError,
  ULabelledDataSaveFailed,
} from "../../domain/training_data/TrainingDataFailure";
import { TrainingData } from "../../domain/training_data/TrainingData";
import { rejects } from "assert";
import { Unit, unit } from "../../domain/core/unit";

export class FirebaseTrainingDataFacade implements ITrainingDataFacade {
  private firebaseDocHandler: FirebaseDocHandler;
  constructor() {
    this.firebaseDocHandler = new FirebaseDocHandler();
  }
  async saveTrainingData(
    trainingData: TrainingData[]
  ): Promise<TrainingDataFailureOrUnit> {
    return new Promise<TrainingDataFailureOrUnit>((resolve, reject) => {
      const collectionRef: firestore.CollectionReference = this.firebaseDocHandler.getCollectionReference(
        "data/twitter/tweets"
      );

      trainingData.forEach(async (trainingData: TrainingData) => {
        await collectionRef
          .doc(trainingData.id.toString())
          .set(trainingData, { merge: true })
          .then(() => resolve(right(unit)))
          .catch((error) =>
            reject(left(ULabelledDataSaveFailed.instance(error)))
          );
      });
    });
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
          2
        )
        .then((result: firestore.DocumentData[]) => {
          console.log(result);
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
