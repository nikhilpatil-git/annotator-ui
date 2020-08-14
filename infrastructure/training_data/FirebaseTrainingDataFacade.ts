import { ITrainingDataFacade } from "../../domain/training_data/ITrainingDataFacade";
import {
  TrainingDataPromise,
  TrainingDataOrFailure,
  TrainingDataFailureOrUnit,
} from "../../domain/core/types";
import { FirebaseDocHandler } from "../core/FirebaseDocHandler";
import { firestore } from "firebase";
import { DocumentDataToTrainingData } from "./TrainingDataMapper";
import { right, left } from "fp-ts/lib/Either";
import {
  ULabelledDataNotFound,
  ULabelledDataFromCatcheNotFound,
  ULabelledDataSaveFailed,
} from "../../domain/training_data/TrainingDataFailure";
import { TrainingData } from "../../domain/training_data/TrainingData";
import { unit } from "../../domain/core/unit";

export class FirebaseTrainingDataFacade implements ITrainingDataFacade {
  private firebaseDocHandler: FirebaseDocHandler;
  constructor() {
    this.firebaseDocHandler = new FirebaseDocHandler();
  }

  async changeTrainingDataState(trainingData: TrainingData[]) {}

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
          .set(
            {
              state: "updated",
              text: trainingData.text,
              category: trainingData.category,
              sentiment: trainingData.sentiment,
            },
            { merge: true }
          )
          .then(() => resolve(right(unit)))
          .catch((error) =>
            reject(left(ULabelledDataSaveFailed.instance(error)))
          );
      });
    });
  }
  async getULabelledDataFromCache(): TrainingDataPromise {
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

  async getULabelledDataFromServer(): Promise<TrainingData[]> {
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
        return result.map((doc) => DocumentDataToTrainingData(doc));
      });
  }

  saveDataInCatch(trainingData: TrainingData[]) {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("data", JSON.stringify(trainingData));
      localStorage.setItem("dataPointer", "0");
    } else {
      throw new Error("Data could not be saved in the catch");
    }
  }

  async getULabelledData(): TrainingDataPromise {
    try {
      const dataFromServer: TrainingData[] = await this.getULabelledDataFromServer();
      this.saveDataInCatch(dataFromServer);

      return await this.firebaseDocHandler
        .getCollectionWithQueryLimit(
          "data/twitter/tweets",
          JSON.stringify({
            key: "state",
            operater: "==",
            value: "not-updated",
          }),
          3
        )
        .then((result: firestore.DocumentData[]) => {
          if (typeof Storage !== "undefined") {
            const trainingData = result.map((doc) =>
              DocumentDataToTrainingData(doc)
            );
            localStorage.setItem("data", JSON.stringify(trainingData));
            localStorage.setItem("dataPointer", "0");
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
