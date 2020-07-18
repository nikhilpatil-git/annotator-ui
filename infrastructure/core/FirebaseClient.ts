import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import AuthType from "../../util/Constants";

export class FirebaseClient {
  private firebaseAuth: firebase.auth.Auth;
  public firestore: firebase.firestore.Firestore;
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyADVr4DcwbHRI2_K2sdS4jwJxlVJ75-26g",
        authDomain: "hind-e405e.firebaseapp.com",
        databaseURL: "https://hind-e405e.firebaseio.com",
        projectId: "hind-e405e",
        storageBucket: "hind-e405e.appspot.com",
        messagingSenderId: "947957687836",
        appId: "1:947957687836:web:cf1247f810a3febf3461d9",
        measurementId: "G-LNS4Q0KYLV",
      });
    }
    this.firebaseAuth = firebase.auth();
    this.firestore = firebase.firestore();
  }

  getAuthHandler(authType: AuthType): Promise<firebase.auth.UserCredential> {
    this.firebaseAuth.currentUser;
    let provider: firebase.auth.AuthProvider;
    switch (authType) {
      case AuthType.GOOGLE:
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case AuthType.FACEBOOK:
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case AuthType.GITHUB:
        provider = new firebase.auth.GithubAuthProvider();
        break;
      default:
        throw new Error(`Provider ${authType} not found`);
    }

    return this.firebaseAuth.signInWithPopup(provider);
  }

  getCurrentUser(): Promise<firebase.User> {
    return new Promise<firebase.User>((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        }
        reject(new Error("user is not signed in"));
      });
    });
  }

  signOutUser(): Promise<void> {
    return this.firebaseAuth.signOut();
  }
}
