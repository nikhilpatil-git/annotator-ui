import { FirebaseClient } from "./FirebaseClient";
import { firestore } from "firebase";
import { resolve } from "path";
import { rejects } from "assert";

export class FirebaseDocHandler {
  private firebaseClient: FirebaseClient;

  constructor() {
    this.firebaseClient = new FirebaseClient();
  }

  getCollectionReference(
    pathToCollection: string
  ): firestore.CollectionReference {
    return this.firebaseClient.firestore.collection(pathToCollection);
  }

  async getCollection(
    pathToCollection: string
  ): Promise<firestore.DocumentData[]> {
    return await this.firebaseClient.firestore
      .collection(pathToCollection)
      .get()
      .then((dataSnapshot: firestore.QuerySnapshot) => {
        const data = dataSnapshot.docs.map((doc: firestore.DocumentData) =>
          doc.data()
        );
        if (data.length > 0) {
          return data;
        }
        throw new Error("Data not found");
      });
  }

  async getCollectionWithQueryLimit(
    pathToCollection: string,
    query: string,
    limit: number
  ): Promise<firestore.DocumentData[]> {
    const jsonQuery = JSON.parse(query);
    return await this.firebaseClient.firestore
      .collection(pathToCollection)
      .where(jsonQuery["key"], jsonQuery["operater"], jsonQuery["value"])
      .limit(limit)
      .get()
      .then((dataSnapshot: firestore.QuerySnapshot) => {
        const data = dataSnapshot.docs.map((doc: firestore.DocumentData) =>
          doc.data()
        );
        if (data.length > 0) {
          return data;
        }
        throw new Error("Data not found");
      });
  }
}
