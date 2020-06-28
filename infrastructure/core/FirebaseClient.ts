import * as firebase from "firebase/app";
import "firebase/auth";
import AuthType from "../../util/Constants";

export class FirebaseClient {
  private firebaseAuth: firebase.auth.Auth;
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAMWO0X0xlpbTSSI4OgZpfyKMAO8k8B6n8",
        authDomain: "ml-study-254810.firebaseapp.com",
        databaseURL: "https://ml-study-254810.firebaseio.com",
        projectId: "ml-study-254810",
        storageBucket: "ml-study-254810.appspot.com",
        messagingSenderId: "344727602806",
        appId: "1:344727602806:web:d3b46b0b3fe9ea10664157",
        measurementId: "G-SKF5LXZXBM",
      });
    }
    this.firebaseAuth = firebase.auth();
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
