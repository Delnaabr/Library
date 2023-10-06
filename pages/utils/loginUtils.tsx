import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { database } from "@/app/Firebase/loginFirebase.config";

export const LoginRegister = (
  email: string,
  password: string,
  type: string
) => {
  if (type === "register") {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          resolve(data);
        })

        .catch((error) => {
          console.error(error);

          reject(error);
        });
    });
  } else if (type === "login") {
    console.log(email, password, "here");

    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "auth data");

          resolve(data);
        })

        .catch((error) => {
          alert(error);

          reject(error);
        });
    });
  }
};
