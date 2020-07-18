import { Pipeline } from "../../domain/pipeline/Pipeline";
import { firestore } from "firebase";

export const DocumentDataToPipeline = (
  documentData: firestore.DocumentData
): Pipeline => {
  let mapValues = new Map();
  let documentValues = documentData["values"];
  Object.keys(documentValues).forEach((key) =>
    mapValues.set(key, documentValues[key])
  );

  return new Pipeline(
    documentData["name"],
    documentData["description"],
    mapValues
  );
};
