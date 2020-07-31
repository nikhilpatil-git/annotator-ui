import { TrainingData } from "../../domain/training_data/TrainingData";
import { firestore } from "firebase";

export const DocumentDataToTrainingData = (
  documentData: firestore.DocumentData
): TrainingData => {
  return new TrainingData(
    documentData["id"],
    documentData["state"],
    documentData["category"],
    documentData["sentiment"],
    documentData["text"]
  );
};
